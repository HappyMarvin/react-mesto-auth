import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card'

function Main ({ cards, onCardLike, onCardDelete, onCardClick, onEditAvatar, onAddPlace, onEditProfile }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="main">
          <section className="profile">
            <button className="profile__edit-avatar" onClick={onEditAvatar} >
              <img src={currentUser.avatar} alt="аватар пользопателя" className="profile__avatar" />
            </button>
            <div className="profile__info">
              <div className="profile__name-wrapper">
                <h1 className="profile__name">{currentUser.name}</h1>
                <button className="profile__edit" type="button" aria-label="Редактировать профайл" onClick={onEditProfile} />
              </div>
              <p className="profile__description">{currentUser.about}</p>
            </div>
            <button className="profile__add" type="button" aria-label="Добавить карточку" onClick={onAddPlace} />
          </section>

          <section className="gallery">
            
            <ul className="gallery__list">
              {cards.map(card => {
                return (
                  <Card
                    card={card}
                    onCardClick={onCardClick}
                    onCardLike={onCardLike}
                    onCardDelete={onCardDelete}
                    key={card._id}
                  />
                )
              })}
            </ul>
          </section>
        </div>
  )
}

export default Main