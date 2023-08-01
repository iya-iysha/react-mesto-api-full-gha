import PopupWithForm from "./PopupWithForm";
import React from 'react';

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const inputRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(inputRef.current.value);
  }

  return(
    <PopupWithForm name="edit-avatar" title="Обновить аватар" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <div className="popup__section">
        <input type="url" className="popup__input popup__input_type_link" ref={inputRef} id="avatar-link" placeholder="Ссылка на картинку" name="avatarLink" required />
        <span className="popup__input-error avatar-link-error"></span>
      </div>
    </PopupWithForm>
  )
}