
import EmailSetting from './mailSetting/EmailSetting';
import './emailList.css'
import EmailBody from './emailBody/Emailbody';
import { useSelector } from 'react-redux';

const EmailList = () => {
  const mailState = useSelector(state=> state.mail.mailState)
  return (
    <div className='email-list'>
    <EmailSetting/>
    {mailState.map((e)=>(<EmailBody to={e.to} text ={e.text} subject ={e.subject} id ={e.id} isRead ={e.isRead} key ={Math.random()} />))}
    </div>
  )
}

export default EmailList;