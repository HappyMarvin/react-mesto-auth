import {useState} from 'react';
import {Link, Route} from "react-router-dom";

function Header(props) {
  const [isMenu, setIsMenu] = useState(false);

  function burgerClick () {
    setIsMenu(!isMenu);
  }
  return (
    <header className={`header ${isMenu && 'header_menu-show'}`}>
      <a href="https://happymarvin.github.io/mesto/" className="header__logo"> </a>
      <Route exact path='/'>
        <div className="header__right-block">
        {props.email && <p className="header__email">{props.email}</p>}
        {props.email && <Link className="header__sign-out" to="/sign-up" onClick={props.onSignout} >Выйти</Link>}
        </div>
        <div className="header__burger-wrapper" onClick={burgerClick}>
          <div className={`header__burger ${isMenu && 'header__burger_active'}`}></div>
        </div>
      </Route>
      <Route exact path='/sign-in'>
        <Link className="header__link" to="/sign-up">Регистрация</Link>
      </Route>
      <Route exact path='/sign-up'>
        <Link className="header__link" to="/sign-in">Войти</Link>
      </Route>
    </header>
  )
}

export default Header