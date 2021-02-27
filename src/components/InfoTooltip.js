import Popup from './Popup';
import imageOk from '../images/popup-ok.jpg'
import imageFail from '../images/popup-fail.jpg'

function InfoToolTip (props) {
  return (
    <Popup
      isOpen={props.isOpen}
      onClose={props.onClose}
      name={props.name}
    >
      <img src={props.status ? imageOk : imageFail} alt="" className="popup__info-image"/>
      <p className="popup__info-message">{props.children}</p>
    </Popup>
  )
}

export default InfoToolTip