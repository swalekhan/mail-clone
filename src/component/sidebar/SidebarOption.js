
import { useDispatch } from 'react-redux'
import { SIBtnActions } from '../../Store/send-inbox-btnSlice'
import './SidebarOption.css'

const SidebarOption = ({ Icon, title, number, isActive }) => {

      const dispatch = useDispatch()
     

       const sendMailHandler = () => {    
        if (title === "Inbox") {
            dispatch(SIBtnActions.inboxItems())
            console.log("clicked")
            return;
        }
        if (title === "Send") {
            dispatch(SIBtnActions.sendItems())
            return;
        }
    }


    return (
        <div className={`sidebar-option ${isActive && "sidebar-option-active"}`} onClick={sendMailHandler}>
            <Icon />
            <h4>{title}</h4>
            <p>{number}</p>
        </div>
    )
}
export default SidebarOption;