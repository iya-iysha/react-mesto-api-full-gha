import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const nameRef = React.useRef();
  const linkRef = React.useRef();
  
  React.useEffect(() => {
    nameRef.current.value = '';
    linkRef.current.value = '';
  }, [isOpen]);

  function handleAddPlaceSubmit(e) {
    e.preventDefault();
    onAddPlace(nameRef.current.value, linkRef.current.value);

  }

  return (
    <PopupWithForm name="add-card" title="Новое место" isOpen={isOpen} onClose={onClose} onSubmit={handleAddPlaceSubmit}>
      <div className="popup__section">
        <input type="text" className="popup__input popup__input_type_title" ref={nameRef} id="card-title" placeholder="Название" name="cardTitle" required minLength="2" maxLength="30" />
        <span className="popup__input-error card-title-error"></span>
      </div>
      <div className="popup__section">
        <input type="url" className="popup__input popup__input_type_link" ref={linkRef} id="card-link" placeholder="Ссылка на картинку" name="cardLink" required />
        <span className="popup__input-error card-link-error"></span>
      </div>
    </PopupWithForm>
  )
}