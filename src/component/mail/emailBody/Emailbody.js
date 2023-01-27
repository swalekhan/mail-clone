
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useHttps from '../../../hooks/use-http';
import { mailActions } from '../../../Store/mailSlice';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { IconButton } from '@material-ui/core';
import './emailBody.css'
import { sendMailAction } from '../../../Store/SendMailSlice';

const EmailBody = ({to, subject, isRead, text,_id , date, sendMail}) => {
  const dispatch = useDispatch()
  const email = useSelector(state => state.token.email)
  // costum hook return object therefor we extracing like this.....
 const {deleteRequest,putRequest} = useHttps()
 
  // console.log(date)

  // ................delete inbox email..........................
  const deleteInboxMail = async () => {
       const obj = {   // this is a object which will be sent as a argument; when we will call deleteRequest function which is present in costum hook;
        url:`https://email-box-a1f52-default-rtdb.firebaseio.com/${email}/${_id}.json`,
        method:"DELETE",
       }
      deleteRequest(obj)
//  ........along with from state......
    dispatch(mailActions.deleteMail(_id))
  }


  const deleteSendMail =  () => {
    const obj = {   // this is a object which will we sent as a argument;
     url:`https://email-box-a1f52-default-rtdb.firebaseio.com/${email}send/${_id}.json`, //from sendMail url;
     method:"DELETE",
    }
   deleteRequest(obj)
 dispatch(sendMailAction.deleteSendMail(_id))
}


// ......................updatedEmail.. ureadEmailHandler............................
  const clickHandler = async() => {
    // ..........................only when isRead === false.............................
    if(isRead=== false){ // we send this put Request when isRead === false.
      const putObj = {
        url:`https://email-box-a1f52-default-rtdb.firebaseio.com/${email}/${_id}.json`,
        body:{to,subject,isRead:true,_id,text,date}
      } 
      putRequest(putObj)    
    
    dispatch(mailActions.isReadHandler(_id))
  }
  }


  return (
    //  ............onClick on div...............when we click on it then red dot remove.
    <div className='email-body' onClick={clickHandler}>  
      {/* ............ link ........... */}
      <Link className='link' to={`Home/${_id}`}>   

        <div className='email-body-left'>
          {/* only when will be visible when user does not read mail..(span red dot) */}
          {!isRead && <span></span>}
          <h4>{subject}</h4>
        </div>
        <div className='email-body-midle'>
          <p>{text}</p>
        </div>
      </Link>
      <div className='email-body-right'>
       {!sendMail &&<IconButton onClick={deleteInboxMail}><DeleteForeverIcon/></IconButton>}
       {sendMail &&<IconButton onClick={deleteSendMail}><DeleteForeverIcon/></IconButton>}
        <p>{date}</p>
      </div>
    </div>
  )
}

export default EmailBody;