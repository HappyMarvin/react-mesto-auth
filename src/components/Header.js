import {useState} from 'react';
import {Link, Route, Switch} from "react-router-dom";

function Header(props) {
  const [isMenu, setIsMenu] = useState(false);

  function burgerClick () {
    setIsMenu(!isMenu);
  }
  return (
    <header className={`header ${isMenu && 'header_menu-show'}`}>
      <a href="https://github.com/HappyMarvin/react-mesto-auth" className="header__logo"> </a>
      <Switch>
      <Route exact path='/sign-in'>
        <Link className="header__link" to="/sign-up">Регистрация</Link>
      </Route>
      <Route exact path='/sign-up'>
        <Link className="header__link" to="/sign-in">Войти</Link>
      </Route>
      <Route path='/'>
        <div className="header__right-block">
          {props.loggedIn && <p className="header__email">{props.email}</p>}
          {props.email && <Link className="header__sign-out" to="/sign-up" onClick={props.onSignout} >Выйти</Link>}
        </div>
        <div className="header__burger-wrapper" onClick={burgerClick}>
          <div className={`header__burger ${isMenu && 'header__burger_active'}`}></div>
        </div>
      </Route>
      </Switch>
    </header>
  )
}

export default Header