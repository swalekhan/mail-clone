import './Compose.css'
import { DefaultEditor } from 'react-simple-wysiwyg';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { composeActions } from '../../Store/composeSlice';
import useHttps from '../../hooks/use-http';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { postSendMailAsync } from '../SendMail/SendMailSlice';

const Compose = () => {
    const email = useSelector(state => state.token.email) // email when we loged in store in localstorege
    const [input, setInput] = useState({ to: "", editor: "", subject: "", isRead: true, date: "" })
    const router = useHistory()
    const dispatch = useDispatch()

    const { sendRequest: postdata } = useHttps()  // custom hook

    const onChangeHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
    }

    // .............................submitHandler.......................
    const submitHandler = (e) => {
        e.preventDefault()
        const time = new Date().getDate()
        const time2 = time + "/" + new Date().getMonth() + 1
        const time3 = time2 + "/" + new Date().getFullYear()

        // ................................send......................................
        dispatch(postSendMailAsync({email, data:{ ...input, isRead: false, date: time3, }}))
        
        // .................................inbox................................
        const emailTo = input.to.replace(/[^a-z0-9]/gi, "")
        postdata({
            url: `https://email-box-a1f52-default-rtdb.firebaseio.com/${emailTo}.json`,  //pushing data on user email use get data from fire base and get this in inbox coponent or when hit inbox keyword find this data
            body: { ...input, date: time3 },
        })

        // ..............after sending mail turn of
        dispatch(composeActions.hideCompose())
        router.push("/inbox")
    }

    return (
        <div className="compose-outer-div">
            <div className="compose-inner-div">
                <form onSubmit={submitHandler}>
                    <div className="compose-header">
                        <div className='compose-top'>
                            <h3>New message</h3>
                            <button onClick={() => dispatch(composeActions.hideCompose())} >X</button>
                        </div>
                    </div>
                    <div className="compose-main">
                        <div className="compose-group">
                            <input type="email" placeholder='To' name='to' onChange={onChangeHandler} value={input.to} />
                        </div>
                        <div className="compose-group">
                            <input placeholder='subject' name='subject' onChange={onChangeHandler} value={input.subject} />
                        </div>
                        <div className="compose-group editor">
                            <DefaultEditor value={input.editor} onChange={onChangeHandler} name='editor' />
                        </div>
                    </div>
                    <div className='compose-footer'>
                        <button type='submit' className='btn btn-primary' >send</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Compose;