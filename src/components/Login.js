import {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import InfoToolTip from "./InfoTooltip";

function Login (props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const [isLoginPopup, setIsLoginPopup] = useState(false);
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
    setIsLoginPopup(false);
    if (submitStatus) {
      props.checkToken();
    }
  }

  function onSubmit (e) {
    e.preventDefault();
    props.onLogin(email, password)
      .then(()=> {
        setSubmitStatus(true);
        setPopupMessage("Вы успешно вошли!")
      })
      .catch(e => {
        console.error(e.message)
        switch (e.message) {
          case "Incorrect email address or password":
            setPopupMessage("Некорректный email или пароль");
            break;
          case "Поле \"password\" должно быть заполнено":
            setPopupMessage("Поле \"Пароль\" должны быть заполенено");
            break;
          default:
            setPopupMessage("Что-то пошло не так! Попробуйте ещё раз.");
        }
      })
      .finally(()=>{
        setIsLoginPopup(true);
      })
  }

  return (
    <>
    <form className="register" onSubmit={onSubmit}>
      <h1 className="register__title">Вход</h1>
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
      <button className="register__submit">Войти</button>
    </form>
    <InfoToolTip
      isOpen={isLoginPopup}
      onClose={onClose}
      name="login"
      status={submitStatus}
    >
      {popupMessage}
    </InfoToolTip>
    </>
  )
}

export default Login