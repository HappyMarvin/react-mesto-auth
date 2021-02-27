import React from 'react';
import Popup from './Popup';


function PopupWithForm(props) {
  const [isOpen, onClose] = [props.isOpen, props.onClose];

  return (
    <Popup
      isOpen={isOpen}
      onClose={onClose}
      name={props.name}
    >
      <form
        action="#"
        className={`popup__form popup__form_${props.name}`}
        name={`${props.name}-form`}
        noValidate
        onSubmit={props.onSubmit}
      >
        <h2 className="popup__title">{props.title}</h2>
        {props.children}

      </form>
    </Popup>
  )
}

export default PopupWithForm