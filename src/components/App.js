import { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import DeleteCardPopup from './DeleteCardPopup'
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from './ImagePopup';
import Register from './Register';
import Login from './Login';
import MainRoute from './MainRoute';
import ProtectedRoute from './ProtectedRoute';
import api from '../utils/api';
import auth from '../utils/auth';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopup, setIsDeleteCardPopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({})
  const [isChecked, setIsChecked] = useState(false);

  function checkToken () {
    const jwt = localStorage.getItem('jwt');
    if(jwt) {
      auth.getUserData(jwt)
        .then(res=>{
          setLoggedIn(true);
          setUser({
            email: res.data.email,
            id: res.data._id
          })
        })
        .catch(e => console.error(e.message))
        .finally(()=>{
          setIsChecked(true);
        })
    }
    else {
      setIsChecked(true);
    }
  }
  
  useEffect(() => {
    checkToken();
    api.getUserData()
      .then(setCurrentUser)
      .catch(e => console.error(e.message))
    api.getInitialCards()
      .then(setCards)
      .catch(e => console.error(e.message))
  },[]);


  //handle карточек
  function handleCardLike (card, isLiked) {
    const method = isLiked ? 'DELETE' : 'PUT';
    api.switchLike(card, method)
    .then((newCard) => {
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      setCards(newCards);
    })
    .catch(e => console.error(e.message))
  }

  //Открываем/закрываем попапы
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function handleCardDelete(card) {
    setIsDeleteCardPopup(card)
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(false);
    setIsDeleteCardPopup(false);
  }

  //Обработка событий в попапах
  function handleUpdateUser(data) {
    api.setUserData(data)
      .then(userData => {
        setCurrentUser(userData);
        setIsEditProfilePopupOpen(false);
      })
      .catch(e => console.error(e.message))
  }

  function handleUpdateAvatar(url) {
    api.addAvatar(url)
      .then(userData => {
        setCurrentUser(userData);
        setIsEditAvatarPopupOpen(false);
      })
      .catch(e => console.error(e.message))
  }

  function handleAddPlace (data) {
    api.addCard(data)
      .then(newCard => {
        setCards([newCard, ...cards]);
        setIsAddPlacePopupOpen(false);
      })
      .catch(e => console.error(e.message))
  }

  function handleCardDeleteSubmit (card, evt) {
    evt.preventDefault();
    api.deleteCard(card)
    .then(() => {
      const newCards = cards.filter((c) => c._id !== card._id);
      setCards(newCards);
      setIsDeleteCardPopup(false);
    })
    .catch(e => console.error(e.message))
  }

  function handleRegister (email, password) {
    return auth.register(email, password)
  }

  function handleLogin (email, password) {
    return auth.login(email, password)
      .then(res => {
        localStorage.setItem('jwt', res.token);
      })
  }

  function handleSignout () {
    localStorage.clear()
    setLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="container">
          <Header
            loggedIn={loggedIn}
            email={user.email}
            onSignout={handleSignout}
          />
          <MainRoute isChecked={isChecked}>
          <Switch>
            <Route path="/sign-up" >
              <Register
                onRegister={handleRegister}
                loggedIn={loggedIn}
              />
            </Route>
            <Route path="/sign-in" >
              <Login onLogin={handleLogin} loggedIn={loggedIn} checkToken={checkToken} />
            </Route>
            <ProtectedRoute
              loggedIn={loggedIn}
              path="/"
              component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          </Switch>
          </MainRoute>
          <Footer />
        </div>

        <ImagePopup
          onClose={closeAllPopups}
          card={selectedCard}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />

        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups} 
          onUpdateAvatar={handleUpdateAvatar}
        />

        <DeleteCardPopup
          card={isDeleteCardPopup} 
          onClose={closeAllPopups}
          onDeleteCard={handleCardDeleteSubmit}
        />
        
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;