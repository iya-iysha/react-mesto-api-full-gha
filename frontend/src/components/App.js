import logo from '../images/logo.svg';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import React from 'react';
import api from '../utils/Api';
import * as auth from '../utils/Auth';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import { Route, Routes, useNavigate } from 'react-router-dom';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = React.useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [email, setEmail] = React.useState('');

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id))
    })
    .catch((err) => console.log(err));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.find(like => like._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => console.log(err));
  }

  function handleUpdateUser(name, about) {
    api.editUserInfo(name, about)
    .then((user) => {
      setCurrentUser(user);
      closeAllPopups();
    })
    .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(avatar) {
    api.editAvatar(avatar)
    .then((user) => {
      setCurrentUser(user);
      closeAllPopups();
    })
    .catch((err) => console.log(err));
  }

  function handleAddPlace(name, link) {
    api.addNewCard(name, link)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => console.log(err));
  }

  function handleRegister({password, email}) {
    auth.register({ password, email })
    .then(() => {
      setIsSuccess(true);
      navigate("/sign-in", { replace: true })
    })
    .catch((err) => {
      setIsSuccess(false);
      console.log(err);
    })
    .finally(() => {
      setIsInfoTooltipOpen(true);
    })
  }

  function handleLogin({password, email}) {
    auth.login({ password, email })
    .then((data) => {
      if (data.token) {
        localStorage.setItem('jwt', data.token);
        return data;
      }
    })
    .then(() => {
      handleSuccessLogin(email);
    })
    .catch((err) => {
      setIsSuccess(false);
      setIsInfoTooltipOpen(true);
      console.log(err);
    })
  }

  function handleTokenCheck() {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      auth.checkToken(jwt)
      .then((data) => {
        if (data) {
          handleSuccessLogin(data.data.email);
        }
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }

  function handleSuccessLogin(email) {
    setLoggedIn(true);
    setEmail(email);
    navigate("/", { replace: true });
  }

  function handleSignOut() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    setEmail('');
  }

  React.useEffect(() => {
    handleTokenCheck();
  }, [])

  React.useEffect(() => {
    api.getUserInfo()
    .then((user) => {
      setCurrentUser(user);
    })
    .catch((err) => console.log(err));
  }, [])

  React.useEffect(() => {
    api.getCardsInfo()
    .then((items) => {
      setCards(items);
    })
    .catch((err) => console.log(err));
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="root">
          <Header email={email} logo={logo} onSignOut={handleSignOut} />
          <Routes>
            <Route path="/" element={
              <ProtectedRoute loggedIn={loggedIn}>
                <>
                  <Main cards={cards} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} onCardDelete={handleCardDelete} onCardLike={handleCardLike} />
                  <Footer />
                </> 
              </ProtectedRoute>
            } />
            <Route path="/sign-up" element={<Register onSubmit={handleRegister} />} />
            <Route path="/sign-in" element={<Login onSubmit={handleLogin} />} />
          </Routes>
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlace} />
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
          <InfoTooltip name="tooltip" isOpen={isInfoTooltipOpen} onClose={closeAllPopups} isSuccess={isSuccess} />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
