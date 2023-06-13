
import { Link } from 'react-router-dom'
import './SidebarOption.css'

const SidebarOption = ({ Icon, title, number, btnUrl }) => {

    return (
       <Link to={btnUrl}><div className={`sidebar-option`} > 
            <Icon />
            <h4>{title}</h4>
            <p>{number}</p>
        </div>
        </Link> 
    )
}
export default SidebarOption;