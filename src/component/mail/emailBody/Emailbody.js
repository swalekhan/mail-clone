
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { mailActions } from '../../../Store/mailSlice';
import './emailBody.css'

const EmailBody = ({ to, subject, isRead, id, text }) => {
  const dispatch = useDispatch()

  const deleteMail = () => {
    dispatch(mailActions.deleteMail(id))
  }

  const clickHandler = () => {
    dispatch(mailActions.isReadHandler(id))
  }
  return (
    <div className='email-body' onClick={clickHandler}>
      <Link className='link' to={`SingleMail/${id}`}>

        <div className='email-body-left'>
          {!isRead && <span></span>}
          <h4>{to}</h4>
        </div>
        <div className='email-body-midle'>
          <p>{text}</p>
        </div>
      </Link>
      <div className='email-body-right'>
        <button onClick={deleteMail} >delete</button>
        <p>02:39PM</p>
      </div>
    </div>
  )
}

export default EmailBody;