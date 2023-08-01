import React from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

export default function Main ({cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardDelete, onCardLike}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__edit-avatar" onClick={onEditAvatar}>
          <img className="profile__avatar" alt="Аватарка" src={currentUser.avatar} />
        </div>
        <div className="profile__heading">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button className="profile__edit-btn" type="button" aria-label="Редактировать профиль" onClick={onEditProfile}></button>
        </div>
        <p className="profile__subtitle">{currentUser.about}</p>
        <button className="profile__add-btn" type="button" aria-label="Добавить место" onClick={onAddPlace}></button>
      </section>
      <section className="cards">
        {cards.map((card) => (
          <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete}/>
        ))
        }
      </section>
    </main>
  )
}