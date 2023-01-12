
import EmailSetting from "../mailSetting/EmailSetting"
import { IconButton, Avatar } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import './SingleEmail.css'
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const SingleEmail = () => {
  const mailState = useSelector(state=> state.mail.mailState)
  const paras = useParams()
 
  const findMail = mailState.find((e)=> e.id === +paras.id)
  console.log(findMail)
  return (
    <div className="single-email">
      <EmailSetting />
      <div className="sinle-email-header">
        <div className="single-email-left">
          <IconButton>
            <Avatar />
          </IconButton>
          <h4>{findMail.to}</h4>
        </div>
        <div className="single-email-right">
          <p>02/05/06</p>
          <IconButton>
            <StarIcon />
          </IconButton>
        </div>
      </div>
      <div className="single-email-text">
           <p>{findMail.text}</p>
      </div>
    </div>
  )
}
export default SingleEmail