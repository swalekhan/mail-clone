
import './SidebarOption.css'

const SidebarOption = ({Icon,title,number,isActive}) => {

    return (
        <div className={`sidebar-option ${isActive&& "sidebar-option-active"}`}>
            <Icon/>
            <h4>{title}</h4>
            <p>{number}</p>
        </div>
    )
}
export default SidebarOption;