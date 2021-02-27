import React from "react";

function Popup (props) {
  const [isOpen, onClose] = [props.isOpen, props.onClose];
  React.useEffect(() => {
    if (!isOpen) return;
    const handleEscapeClose = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscapeClose);
    return () => {
      document.removeEventListener("keydown", handleEscapeClose);
    };
  }, [isOpen, onClose]);

  return (
    <section
      className={`popup popup_${props.name} ${isOpen && 'popup_show'}`}
      onMouseDown={e => e.target.classList.contains('popup') && onClose()}
    >
      <div className="popup__wrapper">
      {props.children}
        <button
          className={`popup__close popup__close_${props.name}`}
          onClick={onClose}
          type="button"
          aria-label="Закрыть форму">
        </button>
      </div>
    </section>
  )
}

export default Popup