import './SidebarOption.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const SidebarOption = ({ Icon, title, number, btnUrl, sidebarcloseHandler }) => {
    const history = useHistory()

    const clickHandler = () => {
        if (btnUrl) {
            history.push(btnUrl)
        }
        sidebarcloseHandler()
    }

    return (
        <div className={`sidebar-option ${btnUrl && "Valid"}`} onClick={clickHandler} >
            <Icon />
            <h4>{title}</h4>
            <p>{number}</p>
        </div>
    )
}
export default SidebarOption;