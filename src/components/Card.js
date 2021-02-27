import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card (props) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = currentUser._id === props.card.owner._id || '';
  const isLiked = props.card.likes.some(like => like._id === currentUser._id) || '';
  function handleClick() {
    props.onCardClick(props.card);
  }
  function onCardLike() {
    props.onCardLike(props.card, isLiked)
  }
  function onDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <li className="card">
      <div className="card__image-wrapper">
        <img src={props.card.link} alt={props.card.name} className="card__image" onClick={handleClick}/>
      </div>
      <div className="card__inner-wrapper">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__like-wrapper">
          <button
            className={`card__like ${isLiked && 'card__like_active'}`}
            onClick={onCardLike}
            type="button"
            aria-label="Лайк"
          ></button>
          <span className="card__like-count">{props.card.likes.length}</span>
        </div>
      </div>
      <button 
        className={`card__delete ${isOwn && 'card__delete_show'}`}
        type="button"
        onClick={onDeleteClick}
        aria-label="Удалить карточку">
      </button>
    </li>
  )
}
export default Card