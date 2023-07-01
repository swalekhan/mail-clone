import './Sidebar.css'
import SidebarOption from './SidebarOption'
import InboxIcon from '@material-ui/icons/Inbox';
import SendIcon from '@material-ui/icons/Send';
import ExpandMoreTwoToneIcon from '@material-ui/icons/ExpandMoreTwoTone';
import { useDispatch, useSelector } from 'react-redux';
import { composeActions } from '../../../Store/composeSlice';

const Sidebar = () => {
    const mail = useSelector(state => state.inbox.inboxMail);
    const isLogin = useSelector(state => state.token.email);
    const unreadMail = mail.filter((e) => e.isRead === true);
    const dispatch = useDispatch();


    const sidebarcloseHandler = () => {
        const size = document.body.offsetWidth
        // ....................on small screen this onclick func will work..
        if (size <= 650) {
            const sidebar = document.getElementById("sidebar");
            const page = document.getElementById("pages")
            page.style.display = "flex"
            sidebar.style.display = "none"
        }
    }



    return (
        <>

            {isLogin &&
                <div className="sidebar" id='sidebar'>
                    <div className='sidebar_top'>
                        <button className='compose-btn' onClick={() => dispatch(composeActions.showCompose())}><span>+</span>Compose</button>
                        <div onClick={sidebarcloseHandler}>X</div>
                    </div>
                    <SidebarOption sidebarcloseHandler={sidebarcloseHandler} Icon={InboxIcon} title="Inbox" number={unreadMail.length} btnUrl={'/inbox'} />
                    <SidebarOption sidebarcloseHandler={sidebarcloseHandler} Icon={SendIcon} title="Send" btnUrl={'/send'} />
                    <SidebarOption sidebarcloseHandler={sidebarcloseHandler} Icon={ExpandMoreTwoToneIcon} title="More"  />
                </div>}
        </>
    )
}
export default Sidebar