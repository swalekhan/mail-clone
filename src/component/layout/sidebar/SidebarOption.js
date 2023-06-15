
import { Link } from 'react-router-dom'
import './SidebarOption.css'

const SidebarOption = ({ Icon, title, number, btnUrl, sidebarcloseHandler }) => {

    return (
       <Link to={btnUrl}><div className={`sidebar-option`} onClick={()=> sidebarcloseHandler()} > 
            <Icon />
            <h4>{title}</h4>
            <p>{number}</p>
        </div>
        </Link> 
    )
}
export default SidebarOption;