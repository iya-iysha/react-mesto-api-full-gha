import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import React from 'react';

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(name, description);
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm name="edit-profile" title="Редактировать профиль" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
        <div className="popup__section">
          <input type="text"  className="popup__input popup__input_type_name" value={name || ''} onChange={handleNameChange} id="name-input" placeholder="Имя" name="title" required minLength="2" maxLength="40" />
          <span className="popup__input-error name-input-error"></span>
        </div>
        <div className="popup__section">
          <input type="text" className="popup__input popup__input_type_job" value={description || ''} id="job-input" placeholder="О себе" name="subtitle" onChange={handleDescriptionChange} required minLength="2" maxLength="200" />
          <span className="popup__input-error job-input-error"></span>
        </div>
    </PopupWithForm>
  )
}