import './Sidebar.css'
import SidebarOption from './SidebarOption'
import InboxIcon from '@material-ui/icons/Inbox';
import SendIcon from '@material-ui/icons/Send';
import LabelIcon from '@material-ui/icons/Label';
import ExpandMoreTwoToneIcon from '@material-ui/icons/ExpandMoreTwoTone';
import { useDispatch, useSelector } from 'react-redux';
import { composeActions } from '../../Store/composeSlice';
const Sidebar = () =>{
      const dispatch = useDispatch()
      const mail = useSelector(state=> state.mail.mailState)
      const unreadMail = mail.filter((e)=> e.isRead === false);

    return (
        <div className="sidebar">
         <button className='compose-btn' onClick={()=>dispatch(composeActions.showCompose())}><span>+</span>Compose</button>
        <SidebarOption Icon ={InboxIcon} title ="Inbox" number={unreadMail.length} btnUrl ={'/Home/Inbox'} />
        <SidebarOption Icon ={LabelIcon} title ="Category" btnUrl ={'/Home'}/>
        <SidebarOption Icon ={SendIcon} title ="Send" btnUrl ={'/Home/Send'} />
        <SidebarOption Icon ={ExpandMoreTwoToneIcon} title ="More" btnUrl ={'/Home'} />
        </div>
    )
}
export default Sidebar