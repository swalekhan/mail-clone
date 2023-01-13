
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useHttps from '../../../hooks/use-http';
import { mailActions } from '../../../Store/mailSlice';
import './emailBody.css'

const EmailBody = ({ to, subject, isRead, id, text,_id , date}) => {
  const dispatch = useDispatch()
  const SIBtn = useSelector((state=> state.SIBtn.SIBtnState))
  const email = useSelector(state => state.token.email)

  const {deleteRequest} = useHttps()

   const time = new Date(date).getDay()
   const time2 = time+"/"+new Date(date).getMonth()
   const time3 = time2+"/"+new Date(date).getFullYear()
  //  const time4 =new Date(date).getMinutes()
  // console.log(,"date",id)


  // ................delete inbox email..........................
  const deleteMail = async () => {
 
       const obj = {
        url:`https://email-box-a1f52-default-rtdb.firebaseio.com/${email}/${_id}.json`,
        method:"DELETE",
       }
      deleteRequest(obj)
//  ........along with from state......
    dispatch(mailActions.deleteMail(id))
  }


// ......................updatedEmail.. ureadEmailHandler............................
  const clickHandler = async() => {
    // ..........................only when isRead === false.............................
    if(isRead=== false){     
    const response = await fetch(`https://email-box-a1f52-default-rtdb.firebaseio.com/${email}/${_id}.json`,{
      method:"PUT",
      body:JSON.stringify({
        to,
        subject,
        isRead:true,
        id,
        text,
        date,
      })
    })
    const data = await response.json()
    console.log("putdata bodyemali",data);
    dispatch(mailActions.isReadHandler(id))
  }
  }


  return (
    //  ............onClick on div...............when we click on it then red dot remove.
    <div className='email-body' onClick={clickHandler}>  
      {/* ............ link ........... */}
      <Link className='link' to={`Home/${id}`}>   

        <div className='email-body-left'>
          {!isRead && <span></span>}
          <h4>{subject}</h4>
        </div>
        <div className='email-body-midle'>
          <p>{text}</p>
        </div>
      </Link>
      <div className='email-body-right'>
       {!SIBtn && <button onClick={deleteMail} >delete</button>}
        <p>{time3}</p>
      </div>
    </div>
  )
}

export default EmailBody;