import PopupWithForm from './PopupWithForm';

function DeleteCardPopup({ card, onClose, onDeleteCard }) {
  return (
    <PopupWithForm
      name="delete"
      title="Вы уверены?"
      isOpen={card}
      onClose={onClose}
      onSubmit={onDeleteCard.bind(null, card)}
    >
      <button className="popup__submit" type="submit" name="popup-submit">Да</button>
    </PopupWithForm>
  )
}
export default DeleteCardPopup