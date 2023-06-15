import { useDispatch, useSelector } from "react-redux";
import EmailBody from "../mail/emailBody/Emailbody";
import EmailSetting from "../mail/mailSetting/EmailSetting";
import { deleteSendMailAsync } from "./SendMailSlice";
import Spiner from "../Auth/spiner/Spiner";

const SendMail = () => {
    const sendMails = useSelector(state => state.send);
    const email = useSelector(state => state.token.email);
    const dispatch = useDispatch()

    const deleteHandler = (e, id) => {
        e.stopPropagation()
        dispatch(deleteSendMailAsync({ email, id }))
    }


    if (sendMails.status === "loading") {
        return <Spiner />
    }

    if (sendMails.sendMail.length < 1) {
        return (<div className="no_mail_availble"><h2 >No mail available</h2> </div>)
    }

    return (
        <div className='email-list'>
            <EmailSetting />
            {sendMails?.sendMail?.map((item) => (<EmailBody item={item} deleteHandler={deleteHandler} key={item.id} />))}
        </div>
    )
}
export default SendMail;