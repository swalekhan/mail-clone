import React, {useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import Input from '../../UI/Input/Input'
import './Signup.css'
import { authActions } from '../../../Store/AuthSlice'
import { tokenActions } from '../../../Store/tokenSlice'

const Signup = () => {
    const authState = useSelector(state => state.auth.authState)
    const dispatch = useDispatch()

    const emailRef = useRef()
    const passworRef = useRef()
    const confirmPassRef = useRef()
    const history = useHistory()
   

    const submitHandler = async(e)=>{
        e.preventDefault();

         let confirmPss = authState?passworRef.current.value:confirmPassRef.current.value;
        if(passworRef.current.value !== confirmPss){
            alert("pass should be same")
            return null;
        }

        let url;
        if(authState){
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
       console.log(data)
        history.replace('/Home')
    } catch(err){
        console.log(err)
    }
    }

    // ....................turn login state true........................
    const loginHnadler = () => {
       dispatch(authActions.login())
    }

    return (
        <>
            <div className='form-outer-div'>
                <div className='form-inner-div'>
                    <form onSubmit={submitHandler}>
                        <div className='form-header'>
                            <h2>{!authState?"Signup":"Login"}</h2>
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
                                type: "password",
                                id: "password",
                                required: "required"
                            }} />
                        </div>
                        {!authState&&<div className='form-group'>
                            <Input label="Confirm Password" ref = {confirmPassRef}  input={{
                                type: "password",
                                id: "confirm",
                                required: "required"
                            }} />
                        </div>}

                              <button type='submit'> {!authState? "sign Up":"Login"}</button>
                        </div>
                        <div >
                        </div>
                        <div className='form-footer'>
                         {authState && <Link to='/ForgetPass'>Forget Password</Link>}
                        </div>
                    </form>
                  {!authState ? <div>Have an account? <button onClick={loginHnadler}>Login</button></div>:
                 <div style={{marginTop:"15px",}}>don't have account? <button onClick={()=>dispatch(authActions.logout())}>Signup</button></div>}
                </div>
            </div>
        </>
    )
}

export default Signup