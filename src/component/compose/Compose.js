import './Compose.css'
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useRef, useState } from 'react';
import { useDispatch} from 'react-redux';
import { composeActions } from '../../Store/composeSlice';
import { mailActions } from '../../Store/mailSlice';

const Compose = () => {
    const dispatch = useDispatch()
 
    const [editor, setEditor] = useState("")
    const subjectRef = useRef();
    const receiverRef = useRef()

    const onEditorStateChange = (e) => {
        setEditor(e.blocks[0].text)
    }

    const submitHandler =  (e) => {
        e.preventDefault()
        dispatch(mailActions.addMail({
            to: receiverRef.current.value,
            subject: subjectRef.current.value,
            text: editor,
            isRead: false,
            id: Math.random()+10,
        }))
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