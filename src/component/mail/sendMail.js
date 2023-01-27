import { useDispatch, useSelector } from "react-redux";
import EmailBody from "./emailBody/Emailbody";
import EmailSetting from "./mailSetting/EmailSetting";
import { useEffect } from "react";
import { fetchSendMail } from "../../Store/SendMailSlice";

const Sendemail = () => {
    const sendState = useSelector(state => state.send.sendState);
    const dispatch = useDispatch()
    const email = useSelector(state => state.token.email);

    useEffect(()=>{
        dispatch(fetchSendMail(email+"send"))
        },[dispatch, email])
    
    return ( 
        <div className='email-list'>
            <EmailSetting/>
        {sendState.map((e) => (<EmailBody to={e.to} text={e.text} subject={e.subject} isRead={true} key={e._id} date={e.date} _id={e._id} sendMail/>))}
        </div>
    )
}
export default Sendemail;