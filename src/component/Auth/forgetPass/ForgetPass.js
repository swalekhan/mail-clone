import { useRef, useState } from "react";
import Input from "../../UI/Input/Input";
import './ForgetPass.css'
import { Link } from "react-router-dom";
import Spiner from "../spiner/Spiner";


const ForgetPass = () => {
    const emailRef = useRef()
    const [spiner, setSpiner] = useState(false);

    const passForgetSubmit = async (e) => {
       e.preventDefault();
        setSpiner(true);
       try{
       const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDZDBnoYIsQENtLozpfIyn-81Z8_zwjHRc",{
        method:"POST",
        body:JSON.stringify({
            requestType:"PASSWORD_RESET",
            email:emailRef.current.value,
        }),
        headers:{
            'Content-Type' : "application/json"
        }
       })
       const data = await response.json;
       if(!response.ok){
        throw new Error("somethin went wrong")
       }
       if (data && data.error && data.error.message) {
        alert(data.error.message)
      }else{
        alert("A link sent your registered email. change password")
      }
      
    } catch(err){
        console.log(err.message);
    }
    setSpiner(false)
    }

    
    return (
        <>
        <div className="spiner">{spiner && <Spiner/>}</div>
        <div className='form-outer-div'>
            <div className='forget-form-inner-div'>
                <form onSubmit={passForgetSubmit}>
                    <div className='form-header'>
                        <h2>Forget Password</h2>
                    </div>
                    <div className='form-main'>
                        <div className='form-group'>
                            <Input label="Enter registered email " ref={emailRef} input={{
                                type: "email",
                                id: "email",
                                required: "required"
                            }} />
                        </div>
                        <button type='submit'> Send Link</button>
                    </div>
                    <div className='form-footer'>
                    <p> Already a user?<Link to='/'>Login</Link></p>
                    </div>
                </form>
            </div>
        </div>
        </>
    )

}

export default ForgetPass;