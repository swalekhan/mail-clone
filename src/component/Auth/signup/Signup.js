import React, {useRef, useState} from 'react'
import { useDispatch} from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import Input from '../../UI/Input/Input'
import './Signup.css'
import { tokenActions } from '../../../Store/tokenSlice'

const Signup = () => {
    const [signIn, setSignIn] = useState(false)
    const dispatch = useDispatch()

    const emailRef = useRef()
    const passworRef = useRef()
    const confirmPassRef = useRef()
    const history = useHistory()
   

    const submitHandler = async(e)=>{
        e.preventDefault();

         let confirmPss = signIn?passworRef.current.value:confirmPassRef.current.value;
        if(passworRef.current.value !== confirmPss){
            alert("pass should be same")
            return null;
        }

        let url;
        if(signIn){
         url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDZDBnoYIsQENtLozpfIyn-81Z8_zwjHRc'
        }else{
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDZDBnoYIsQENtLozpfIyn-81Z8_zwjHRc';
        }

        try{
      const response = await fetch(url,{
            method:'POST',
            body: JSON.stringify({
                email:emailRef.current.value,
                password:passworRef.current.value,
                returnSecureToken:true
            }),
            headers:{
                'Content-Type' : "application/json"
            }
        })
        const data = await response.json()
        if(!data.ok && data.error && data.error.message){
            alert(data.error.message)
            return;
        }
 
       dispatch((tokenActions.addToken(data.idToken)));//store token
       dispatch(tokenActions.storeEmail(data.email))
    //    console.log(data)
        history.replace('/inbox')
    } catch(err){
        console.log(err)
    }
    }

    // ....................turn login state true........................
    const loginHnadler = () => {
       setSignIn(true)
    }

    return (
        <>
            <div className='form-outer-div'>
                <div className='form-inner-div'>
                    <form onSubmit={submitHandler}>
                        <div className='form-header'>
                            <h2>{!signIn?"Signup":"Login"}</h2>
                        </div>
                        <div className='form-main'>
                        <div className='form-group'>
                            <Input label="Email" ref = {emailRef} input={{
                                type: "email",
                                id: "email",
                                required: "required"
                            }} />
                        </div>
                        <div className='form-group'>
                            <Input label="Password" ref = {passworRef} input={{
                                type: "new-password",
                                id: "password",
                                required: "required"
                            }} />
                        </div>
                        {!signIn&&<div className='form-group'>
                            <Input label="Confirm Password" ref = {confirmPassRef}  input={{
                                type: "new-password",
                                id: "confirm",
                                required: "required"
                            }} />
                        </div>}

                              <button type='submit'> {!signIn? "sign Up":"Login"}</button>
                        </div>
                        <div >
                        </div>
                        <div className='form-footer'>
                         {signIn && <Link to='/Auth/ForgetPassword'>Forget Password</Link>}
                        </div>
                    </form>
                  {!signIn ? <div>Have an account? <button className='login_signup' onClick={loginHnadler}>Login</button></div>:
                 <div style={{marginTop:"15px",}}>don't have account? <button className='login_signup' onClick={()=>dispatch(setSignIn(false))}>Signup</button></div>}
                </div>
            </div>
        </>
    )
}

export default Signup