import { Link } from 'react-router-dom';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { IconButton } from '@material-ui/core';
import './emailBody.css'

const EmailBody = ({ item, deleteHandler, isReadHandler }) => {

  // ...........................isReadHandler.........................
  const updateHandler = () => {
    if (item?.isRead) {
      isReadHandler(item?.id)
    }
  }

  return (
    //  ............onClick on div...............when we click on it then red dot remove.
    <div className='email-body' onClick={updateHandler}>
      {/* ............ link ........... */}
      <Link className='link' to={`mailDetails${item?.id}`}>

        <div className='email-body-left'>
          {/* only when will be visible when user does not read mail..(span red dot) */}
          {item?.isRead && <span></span>}
          <h4>{item?.subject}</h4>
        </div>
        <div className='email-body-midle'>
          <p>{item?.editor}</p>
        </div>
      </Link>
      <div className='email-body-right'>
        <IconButton onClick={(e) => deleteHandler(e, item?.id)}><DeleteForeverIcon /></IconButton>
        <p>{item?.date}</p>
      </div>
    </div>
  )
}

export default EmailBody;