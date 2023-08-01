export default function PopupWithForm ({name, title, buttonContent, isOpen, onClose, titleExtraStyleClass, onSubmit, children}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button className="popup__close-btn" type="button" aria-label="Закрыть попап" onClick={onClose}></button>
        <h2 className={`popup__title ${titleExtraStyleClass}`}>{title}</h2>
        <form className="popup__form" name={`${name}`} onSubmit={onSubmit}>
          {children}
          <button type="submit" className="popup__submit-btn">{buttonContent || 'Сохранить'}</button>
        </form>
      </div>
    </div>
  )
}