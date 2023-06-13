
import ReorderIcon from '@material-ui/icons/Reorder';
import SearchIcon from '@material-ui/icons/Search';
import { IconButton } from '@material-ui/core';

import './Header.css'
import { useDispatch } from 'react-redux';
import { tokenActions } from '../../Store/tokenSlice';
import { useHistory } from 'react-router-dom';
import { searchActions } from '../../Store/searchSlice';
import { useEffect, useState } from 'react';

const Header = () => {
    const [search, setSearch] = useState("")
    const history = useHistory()
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(tokenActions.removeToken())
        history.push("/")
    }

    const searchHandler = (e) => {
        setSearch(e.target.value)
    }

    useEffect(() => {
        const id = setTimeout(() => {
            dispatch(searchActions.isSearch(search))
        }, 700)

        return () => {
            clearTimeout(id)
        }

    }, [search, dispatch])

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
                    <input type="text" placeholder='search' onChange={searchHandler} />
                </div>
            </div>
            <div className='header-logout'>
                <button onClick={logoutHandler}>Logout</button>
            </div>

        </div>
    )
}

export default Header;