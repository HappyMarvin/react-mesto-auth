import PopupWithForm from './PopupWithForm';
import { useState, useEffect } from "react";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState('')
  const [link, setLink] = useState('')
  const [validLink, setValidLink] = useState(false);
  const [validName, setValidName] = useState(false);
  const [valid, setValid] = useState(false);
  const [validMessageName, setValidMessageName] = useState('');
  const [validMessageLink, setValidMessageLink] = useState('');
  
  useEffect(() => {
    setName('')
    setLink('')
    setValidName(false);
    setValidLink(false);
    setValidMessageName('');
    setValidMessageLink('');
  }, [isOpen])

  useEffect(() => {
    setValid(validName && validLink)
  }, [validName, validLink])

  function onChangeName(e) {
    setName(e.target.value)
    setValidName(e.target.validity.valid)
    setValidMessageName(e.target.validationMessage)
  }
  function onChangeLink(e) {
    setLink(e.target.value)
    setValidLink(e.target.validity.valid);
    setValidMessageLink(e.target.validationMessage)
  }

  function onSubmit (e) {
    e.preventDefault();
    onAddPlace({
      name,
      link
    })
  }

  return (
    <PopupWithForm
          name="new-place"
          title="Новое место"
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={onSubmit}
        >
          <input type="text"
            name="popup-name"
            className="popup__text-input popup__text-input_place-name"
            maxLength="30"
            minLength="2"
            required
            placeholder="Название"
            id="place-name"
            value={name}
            onChange={onChangeName} />
          <span className="popup__error popup__error_show" id="place-name-error">{validMessageName}</span>
          <input type="url"
            required
            name="popup-Link"
            className="popup__text-input popup__text-input_place-link"
            placeholder="Ссылка на картинку"
            id="place-Link"
            value={link}
            onChange={onChangeLink} />
          <span className="popup__error" id="place-Link-error">{validMessageLink}</span>
          <button
            className={`popup__submit ${valid ? '' : 'popup__submit_disabled'}`}
            type="submit"
            name="popup-submit"
            disabled={!valid}
          >Создать</button>
        </PopupWithForm>
  )
}

export default AddPlacePopup