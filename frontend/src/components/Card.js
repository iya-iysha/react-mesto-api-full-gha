import CurrentUserContext from "../contexts/CurrentUserContext";
import React from 'react';

export default function Card ({card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.find(like => like._id === currentUser._id);
  const cardLikeButtonClassName = (
    `card__heart-btn ${isLiked && 'card__heart-btn_active'}`
  );

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }
  
  return (
    <div className="card">
      <img className="card__image" src={card.link} alt={card.name} onClick={handleClick} />
      <div className="card__caption">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__heart-area">
          <button className={cardLikeButtonClassName} type="button" aria-label="Оценить" onClick={handleLikeClick}></button>
          <p className="card__heart-count">{card.likes.length}</p>
        </div>
      </div>
      {isOwn && <button className="card__trash-btn" type="button" aria-label="Удалить" onClick={handleDeleteClick} />}
    </div>
  )
}