import React from 'react';

function ImagePopup (props) {
  const [card, onClose] = [props.card, props.onClose];

  React.useEffect(() => {
    if (!card) return;
    const handleEscapeClose = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscapeClose);
    return () => {
      document.removeEventListener("keydown", handleEscapeClose);
    };
  }, [card, onClose]);

  return (
    <section 
      className={`popup popup_image ${card ? 'popup_show' : ''}`}
      onClick={e => e.target.classList.contains('popup') && onClose()}
    >
        <div className="popup__container">
          <img src={card ? card.link : '#'} alt="Фото места" className="popup__image" />
          <h2 className="popup__image-title">{card ? card.name : ''}</h2>
          <button 
            className="popup__close popup__close_image" 
            type="button" 
            aria-label="Закрыть фото"
            onClick={onClose}
          ></button>
        </div>
      </section>
  )
}

export default ImagePopup