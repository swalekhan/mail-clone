import './Compose.css'
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { composeActions } from '../../Store/composeSlice';
import { sendMailAction } from '../../Store/SendMailSlice';
import useHttps from '../../hooks/use-http';

const Compose = () => {
    const dispatch = useDispatch()
    const email = useSelector(state => state.token.email) // email when we loged in store in localstorege
    const [editor, setEditor] = useState("")
    const subjectRef = useRef();
    const receiverRef = useRef()

    const { sendRequest: postdata } = useHttps()

    const onEditorStateChange = (e) => {
        setEditor(e.blocks[0].text)
    }

   
    const time = new Date().getDate()
    const time2 = time+"/"+new Date().getMonth()+1
    const time3 = time2+"/"+new Date().getFullYear()


    // .............................sendemail.......................
    const submitHandler = async (e) => {
        e.preventDefault()

        const inputData = {
            to: receiverRef.current.value,
            subject: subjectRef.current.value,
            text: editor,
            isRead: false,
            date: time3,
        }

        const obj = {
            url: `https://email-box-a1f52-default-rtdb.firebaseio.com/${email}send.json`,  //sending requst on ${email}send(email and some string)url in send component we will fetch from this url
            method: "POST",
            body: inputData,
            Headers: { "Content-Type": "application/json" },
        }

        // .......this function is calling from costom hook with arugment which is id provided by firebase when resquest goes success
        const returnData = (data) => {
            // .............along with state change
            dispatch(sendMailAction.addSendMail({
                to: receiverRef.current.value,
                subject: subjectRef.current.value,
                text: editor,
                isRead: false,
                _id: data.name, // this value come from firebase 
                date: time3,
            }))
        }
        // ... ......this function extarct custom hook which send post request.....
        postdata(obj, returnData)



        // .................................inbox................................
        const emailTo = receiverRef.current.value.replace(/[^a-z0-9]/gi, "")
        //    this is body part for post request
        const inputDataForInbox = {
            to: receiverRef.current.value,
            subject: subjectRef.current.value,
            text: editor,
            isRead: false,
            date: time3,
        }

        const objForInbox = {
            url: `https://email-box-a1f52-default-rtdb.firebaseio.com/${emailTo}.json`,  //pushing data on user email use get data from fire base and get this in inbox coponent or when hit inbox keyword find this data
            method: "POST",
            body: inputDataForInbox,
            Headers: { "Content-Type": "application/json" },
        }

        const inboxReturnData = (data) => {
            console.log(data, " return data") //noneed of this data because we are sending data other inbox
        }
        postdata(objForInbox, inboxReturnData) //whenevr we can call it by passing diffrent data give diffrent like normal func
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
                            <input ref={receiverRef} placeholder='receiver' />
                        </div>
                        <div className="compose-group">
                            <input ref={subjectRef} placeholder='subject' />
                        </div>
                        <div className="compose-group editor">
                            <Editor
                                // editorState={editor}
                                toolbarClassName="toolbarClassName"
                                wrapperClassName="wrapperClassName"
                                editorClassName="editorClassName"
                                // onEditorStateChange={}
                                onChange={onEditorStateChange}
                            />
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