export default function ImagePopup({card, onClose}) {
  return (
    <div className={`popup popup_type_image ${card?.link && 'popup_opened'}`}>
      <div className="popup__image-holder">
        <button className = "popup__close-btn" type="button" aria-label="Закрыть попап" onClick={onClose}></button>
        <img className="popup__image" src={card?.link || '#'} alt={card?.name || ''} />
        <p className="popup__image-name">{card?.name || ''}</p>
      </div>
    </div>
  )
}