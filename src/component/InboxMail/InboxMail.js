import { useDispatch, useSelector } from "react-redux";
import EmailBody from "../mail/emailBody/Emailbody";
import EmailSetting from "../mail/mailSetting/EmailSetting";
import { useEffect } from "react";
import '../mail/emailList.css'
import { fetchInboxMailAsync, deleteInboxMailAsync, updateInboxMailAsync } from "./InboxMailSlice";

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
    useEffect(() => {
        const id = setInterval(() => {
            dispatch(fetchInboxMailAsync(email))
        }, 1000)

        return () => {
            clearInterval(id)
        }
    }, [dispatch, email])

    return (
        <div className='email-list'>
            <EmailSetting />
            {inboxMails?.inboxMail?.map((item) => (<EmailBody item={item} deleteHandler={deleteHandler} isReadHandler={isReadHandler} key={item.id} />))}
        </div>
    )
}
export default InboxMail;