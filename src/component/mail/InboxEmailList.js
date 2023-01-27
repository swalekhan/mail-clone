
import EmailSetting from './mailSetting/EmailSetting';
import './emailList.css'
import EmailBody from './emailBody/Emailbody';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMail } from '../../Store/mailSlice';
import { useEffect } from 'react';

const EmailList = () => {
  const mailState = useSelector(state => state.mail.mailState)
  const dispatch = useDispatch()
  const email = useSelector(state => state.token.email);

   // ............................inbox mail...............
  useEffect(()=>{
    // const intervalId = setInterval(()=>{
      dispatch(fetchMail(email))
    // },2000)
  
    // return () => clearInterval(intervalId)  // this only run when component is going to dead;

  },[dispatch, email])

  return (
    <div className='email-list'>
      <EmailSetting />
      {mailState.map((e) => (<EmailBody to={e.to} text={e.text} subject={e.subject} isRead={e.isRead} key={e._id} _id={e._id} date={e.date} />))}
    </div>
  )
}

export default EmailList;