
import ReorderIcon from '@material-ui/icons/Reorder';
import SearchIcon from '@material-ui/icons/Search';
import { IconButton } from '@material-ui/core';
import './Header.css'
import { useDispatch, useSelector } from 'react-redux';
import { tokenActions } from '../../Store/tokenSlice';
import { useHistory } from 'react-router-dom';
import { useCallback, useEffect} from 'react';

const Header = () => {
    const isLogin = useSelector(state => state.token.email)
    const history = useHistory()
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(tokenActions.removeToken())
        history.push("/")
    }

    // ..........................open sidebar....................
    const sidebarHandler = () => {
        const sidebar = document.getElementById("sidebar");
        const page = document.getElementById("pages")
        page.style.display = "none"
        sidebar.style.display = "flex"
    }


    // // .........................when screen width trun more than 650px both sidebar and pages will visible

    const changeSizeHandler = useCallback(() => {
        const width = document.body.offsetWidth
        if (width > 650) {
            const sidebar = document.getElementById("sidebar");
            const page = document.getElementById("pages")
            if(sidebar && page){
            page.style.display = "block"
            sidebar.style.display = "flex"
            }
        }
    }, [])

    useEffect(() => {
        window.addEventListener("resize", changeSizeHandler)

        return () => {
            window.removeEventListener("resize", changeSizeHandler)
        }
    }, [changeSizeHandler])

    return (
        <div className="header">
            <div className="header-left">
                <IconButton onClick={sidebarHandler}>
                    <ReorderIcon />
                </IconButton>
                <span>Mail Box</span>
            </div>

            {isLogin &&
                <>
                    <div className='header-midle'>
                        <div className='search-mail'>
                            <IconButton>
                                <SearchIcon />
                            </IconButton>
                            <input type="text" placeholder='search' />
                        </div>
                    </div>

                    <div className='header-logout'>
                        <button onClick={logoutHandler}>Logout</button>
                    </div>
                </>
            }

        </div>
    )
}

export default Header;