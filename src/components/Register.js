import {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import InfoToolTip from "./InfoTooltip";

function Register(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const [isRegisterPopup, setIsRegisterPopup] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (props.loggedIn) history.push('/')
  },[props.loggedIn, history]);

  function onChangeEmail (e) {
    setEmail(e.target.value)
  }

  function onChangePassword (e) {
    setPassword(e.target.value)
  }

  function onClose () {
    setIsRegisterPopup(false);
    if (submitStatus) {
      history.push("/sign-in");
    }
  }

  function onSubmit (e) {
    e.preventDefault();
    props.onRegister(email, password)
      .then(()=> {
        setSubmitStatus(true);
        setPopupMessage("Вы успешно зарегистрировались!")
      })
      .catch(e => {
        switch (e.message) {
          case "The \"email\" field is required":
            setPopupMessage("Поле \"Email\" должны быть заполенено");
            break;
          case "Поле \"password\" должно быть заполнено":
            setPopupMessage("Поле \"Пароль\" должны быть заполенено");
            break;
          case "The \"email\" field must be a valid email address":
            setPopupMessage("Необходимо ввести валидный Email");
            break;
          case "Пользователь с таким email уже зарегистрирован":
            setPopupMessage("Пользователь с таким email уже зарегистрирован");
            break;
          default:
            setPopupMessage("Что-то пошло не так! Попробуйте ещё раз.");
        }
      })
      .finally(()=>{
        setIsRegisterPopup(true);
      })
  }

  return (
    <>
      <form className="register" onSubmit={onSubmit}>
        <h1 className="register__title">Регистрация</h1>
        <input
          type="email"
          className="register__email"
          placeholder="Email"
          value={email}
          onChange={onChangeEmail}
        />
        <input
          type="password"
          className="register__password"
          placeholder="Пароль"
          value={password}
          onChange={onChangePassword}
        />
        <button className="register__submit">Зарегистрироваться</button>
        <p className="register__login">Уже зарегистрированы?&nbsp;
          <Link className="register__link" to="/sign-in">Войти</Link>
        </p>
      </form>
      <InfoToolTip
        isOpen={isRegisterPopup}
        onClose={onClose}
        name="register"
        status={submitStatus}
      >
        {popupMessage}
      </InfoToolTip>
    </>
  )
}

export default Register