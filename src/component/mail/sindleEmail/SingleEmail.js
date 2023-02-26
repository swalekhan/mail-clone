
import EmailSetting from "../mailSetting/EmailSetting"
import { IconButton, Avatar } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import './SingleEmail.css'
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";



const SingleEmail = () => {
  const mailState = useSelector(state=> state.mail.mailState)
  const sendState = useSelector(state => state.send.sendState)
  const paras = useParams()
 
  const findMail = sendState.concat(mailState).find((e)=> e._id === paras.id)
  return (
    <div className="single-email">
      <EmailSetting />
      <div className="sinle-email-header">
        <div className="single-email-left">
          <IconButton>
            <Avatar />
          </IconButton>
          <h4>{findMail&&findMail.subject}</h4>
        </div>
        <div className="single-email-right">
          <p>{findMail && findMail.date}</p>
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