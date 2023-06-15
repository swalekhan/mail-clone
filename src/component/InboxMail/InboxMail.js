import { useDispatch, useSelector } from "react-redux";
import EmailBody from "../mail/emailBody/Emailbody";
import EmailSetting from "../mail/mailSetting/EmailSetting";
import '../mail/emailList.css'
import { deleteInboxMailAsync, updateInboxMailAsync } from "./InboxMailSlice";

const InboxMail = () => {
    const inboxMails = useSelector(state => state.inbox);
    const dispatch = useDispatch()
    const email = useSelector(state => state.token.email);

    const deleteHandler = (e, id) => {
        e.stopPropagation()
        dispatch(deleteInboxMailAsync({ email, id }))
    }

    const isReadHandler = (id) => {
        dispatch(updateInboxMailAsync({ email, id }))
    }

    // ...............fecth inbox_mail.............................

    if (inboxMails.inboxMail.length < 1) {
        return (<div className="no_mail_availble"><h2 >No mail available</h2> </div>)
    }

    return (
        <div className='email-list'>
            <EmailSetting />
            {inboxMails?.inboxMail?.map((item) => (<EmailBody item={item} deleteHandler={deleteHandler} isReadHandler={isReadHandler} key={item.id} />))}
        </div>
    )
}
export default InboxMail;