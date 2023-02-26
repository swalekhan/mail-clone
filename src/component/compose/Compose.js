import './Compose.css'
// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { DefaultEditor } from 'react-simple-wysiwyg';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { composeActions } from '../../Store/composeSlice';
import { sendMailAction } from '../../Store/SendMailSlice';
import useHttps from '../../hooks/use-http';

const Compose = () => {
    const dispatch = useDispatch()
    const email = useSelector(state => state.token.email) // email when we loged in store in localstorege
    const [editor, setEditor] = useState("")
    const [to, setTo] = useState("");
    const [subject, setSubject] = useState("")

    const { sendRequest: postdata } = useHttps()  // custom hook

    // const onEditorStateChange = (e) => {
    //     setEditor(e.blocks[0].text)
    // }
    const onChange = (e) => {
        setEditor(e.target.value)
    }

    // .............................sendemail.......................
    const submitHandler = (e) => {
        e.preventDefault()
        const time = new Date().getDate()
        const time2 = time + "/" + new Date().getMonth() + 1
        const time3 = time2 + "/" + new Date().getFullYear()


        // .......alert....
        if(to.trim().length === 0){
            alert("fill input field");
            return
        }
        const inputData = { // 
            to: to,
            subject: subject,
            text: editor,
            isRead: false,
            date: time3,
        }

        const obj = {
            url: `https://email-box-a1f52-default-rtdb.firebaseio.com/${email}send.json`,  //sending requst on ${email}send(email and some string)url in send component we will fetch from this url
            body: inputData,
        }

        // .......this function is being called from costom hook with arugment which is id provided by firebase when resquest goes success
        const returnData = (data) => {
            // .............along with state change
            dispatch(sendMailAction.addSendMail({
                ...inputData,
                _id: data.name, // this value come from firebase 
            }))
        }
        // ... ......this function extarct custom hook which send post request.....
        postdata(obj, returnData)//this is a function which is present in costum hook, we are calling it from here;


        // .................................inbox................................
        const emailTo = to.replace(/[^a-z0-9]/gi, "")
        //    this is body part for post request
        const objForInbox = {
            url: `https://email-box-a1f52-default-rtdb.firebaseio.com/${emailTo}.json`,  //pushing data on user email use get data from fire base and get this in inbox coponent or when hit inbox keyword find this data
            body: inputData,
        }

        const inboxReturnData = (data) => {
            // console.log(data, " return data") //noneed of this data because we are sending data other inbox
        }
        postdata(objForInbox, inboxReturnData) //whenever we call it by passing diffrent data {argument}it gives diffrent data like normal func. this is a function which is present in costum hook

        // ..............after sending mail turn of
        setTo("");
        setSubject("");
        setEditor("")
        dispatch(composeActions.hideCompose())
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
                            <input type="email" placeholder='To' onChange={(e) => setTo(e.target.value)} value = {to} />
                        </div>
                        <div className="compose-group">
                            <input placeholder='subject' onChange={(e) => setSubject(e.target.value)} value ={subject} />
                        </div>
                        <div className="compose-group editor">
                           
                            <DefaultEditor value={editor} onChange={onChange} />
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