import { useDispatch, useSelector } from "react-redux";
import EmailBody from "../mail/emailBody/Emailbody";
import EmailSetting from "../mail/mailSetting/EmailSetting";
import { useEffect } from "react";
import { fetchSendMailAsync, deleteSendMailAsync } from "./SendMailSlice";
import Spiner from "../Auth/spiner/Spiner";

const SendMail = () => {
    const sendMails = useSelector(state => state.send);
    const dispatch = useDispatch()
    const email = useSelector(state => state.token.email);
    // const searchState = useSelector(state => state.search.searchState)
    // const data = !searchState ? sendState : sendState.filter(e => e.text.includes(searchState) || e.subject.includes(searchState))
    const deleteHandler = (e,id) => {
        e.stopPropagation()
         dispatch(deleteSendMailAsync({email,id}))
    }

    useEffect(() => {
        dispatch(fetchSendMailAsync(email + "send"))
    }, [dispatch, email])


    if(sendMails.status === "loading"){
        return <Spiner/>
    }

    return (
        <div className='email-list'>
            <EmailSetting />
            {sendMails?.sendMail?.map((item) => (<EmailBody item ={item} deleteHandler={deleteHandler} key={item.id} />))}
        </div>
    )
}
export default SendMail;