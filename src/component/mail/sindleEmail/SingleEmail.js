
import EmailSetting from "../mailSetting/EmailSetting"
import { IconButton, Avatar } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import './SingleEmail.css'
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";



const SingleEmail = () => {
  const SIBtn = useSelector(state => state.SIBtn.SIBtnState)
  const mailState = useSelector(state=> state.mail.mailState)
  const sendState = useSelector(state => state.send.sendState)
  const paras = useParams()
 
  const mails = SIBtn?sendState:mailState;
  const findMail = mails.find((e)=> e.id === +paras.id)
   console.log(paras)
  return (
    <div className="single-email">
      <EmailSetting />
      <div className="sinle-email-header">
        <div className="single-email-left">
          <IconButton>
            <Avatar />
          </IconButton>
          <h4>{findMail&&findMail.to}</h4>
        </div>
        <div className="single-email-right">
          <p>02/05/06</p>
          <IconButton>
            <StarIcon />
          </IconButton>
        </div>
      </div>
      <div className="single-email-text">
           <p>{findMail&&findMail.text}</p>
      </div>
    </div>
  )
}
export default SingleEmail