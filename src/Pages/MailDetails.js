import MailDetail from "../component/MailDetail/MailDetail"
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const MailDetails = () => {
    const mailState = useSelector(state => state.inbox.inboxMail)
    const sendState = useSelector(state => state.send.sendMail)
    const paras = useParams()
   console.log(paras.id)
    const findMail = sendState.concat(mailState)?.find((e) => e.id === paras.id)
    return (
        <MailDetail item = {findMail} />
    )
}
export default MailDetails