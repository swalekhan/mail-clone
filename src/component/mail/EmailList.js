
import EmailSetting from './mailSetting/EmailSetting';
import './emailList.css'
import EmailBody from './emailBody/Emailbody';
import { useSelector } from 'react-redux';

const EmailList = () => {
        const SIBtn = useSelector(state => state.SIBtn.SIBtnState) // SIBtn state change when we hit send keyword which exist in sidebar, get true if that is true then send mail statr showing
      const sendSate = useSelector(state => state.send.sendState);
      const mailState = useSelector(state=> state.mail.mailState)
     console.log(sendSate)

  return (
    <div className='email-list'>
    <EmailSetting/>
    {!SIBtn && mailState.map((e)=>(<EmailBody to={e.to} text ={e.text} subject ={e.subject} id ={e.id} isRead ={e.isRead} key ={Math.random()}_id = {e._id} date ={e.date}/>))}
    {SIBtn&&sendSate.map((e)=>(<EmailBody to={e.to} text ={e.text} subject ={e.subject} id ={e.id} isRead ={true} key ={Math.random()} date ={e.date}/>))}
    </div>
  )
}

export default EmailList;