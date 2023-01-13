
import ReorderIcon from '@material-ui/icons/Reorder';
import SearchIcon from '@material-ui/icons/Search';
import { IconButton } from '@material-ui/core';

import './Header.css'
import { useDispatch } from 'react-redux';
import { tokenActions } from '../../Store/tokenSlice';
import { useHistory } from 'react-router-dom';

const Header = () => {
     const history = useHistory()
    const dispatch = useDispatch()

    const logoutHandler =() =>{
          dispatch(tokenActions.removeToken())
          history.push("/")
    }
    return (
        <div className="header">
            <div className="header-left">
                <IconButton>
                    <ReorderIcon />
                </IconButton>
               <span>Mail Box</span>
            </div>
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

        </div>
    )
}

export default Header;