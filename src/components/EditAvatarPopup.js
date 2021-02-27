import PopupWithForm from './PopupWithForm';
import { useState, useEffect } from "react";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar}) {
  const [valid, setValid] = useState(false);
  const [validMessage, setValidMessage] = useState('');
  const [link, setLink] = useState('')

  useEffect(()=>{
    setValid(false);
    setLink('');
    setValidMessage('');
  }, [isOpen])

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(link);
  }

  function onChange(e) {
    setLink(e.target.value)
    setValid(e.target.validity.valid);
    setValidMessage(e.target.validationMessage);
  }

  return (
    <PopupWithForm
          name="add-avatar"
          title="Обновить аватар"
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
        >
          <input type="url"
            required
            name="avatar-link"
            className="popup__text-input popup__text-input_place-link"
            placeholder="Ссылка на аватар"
            id="avatar-link"
            value={link}
            onChange={onChange} />
          <span className="popup__error" id="avatar-link-error">{validMessage}</span>
          <button
            className={`popup__submit ${valid ? '' : 'popup__submit_disabled'}`}
            type="submit"
            name="popup-submit"
            disabled={!valid}
          >Сохранить</button>
        </PopupWithForm>
  )
}

export default EditAvatarPopup