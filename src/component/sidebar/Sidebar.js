import './Sidebar.css'
import SidebarOption from './SidebarOption'
import InboxIcon from '@material-ui/icons/Inbox';
import SendIcon from '@material-ui/icons/Send';
import LabelIcon from '@material-ui/icons/Label';
// import ArticleTwoToneIcon from '@material-ui/icons/ArticleTwoTone';
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
        <SidebarOption Icon ={InboxIcon} title ="Inbox" number={unreadMail.length} isActive ={true}/>
        <SidebarOption Icon ={LabelIcon} title ="Category" />
        <SidebarOption Icon ={SendIcon} title ="Send" />
        <SidebarOption Icon ={ExpandMoreTwoToneIcon} title ="More" />
        </div>
    )
}
export default Sidebar