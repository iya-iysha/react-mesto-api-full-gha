import success from '../images/success.svg';
import unsuccess from '../images/unsuccess.svg';

export default function InfoTooltip ({ name, isOpen, onClose, isSuccess }) {
  return(
    <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
      <div className={`popup__container popup__container_type_${name}`}>
        <button className="popup__close-btn" type="button" aria-label="Закрыть попап" onClick={onClose}></button>
        {isSuccess ? (
          <>
            <img className="popup__tooltip-img" src={`${success}`} />
            <p className="popup__tooltip-title">Вы успешно зарегистрировались!</p>
          </>
        ) : (
          <>
            <img className="popup__tooltip-img" src={`${unsuccess}`} />
            <p className="popup__tooltip-title">Что-то пошло не так! Попробуйте ещё раз.</p>
          </>
        )}
        
      </div>
    </div>
  )
}