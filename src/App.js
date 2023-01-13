
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Compose from './component/compose/Compose';
import { fetchMail } from './Store/mailSlice';
import { Switch, Route } from 'react-router-dom';
import { fetchSendMail } from './Store/SendMailSlice';
import Signup from './component/Auth/signup/Signup';
import Home from './component/layout/Home';

function App() {
  const dispatch = useDispatch()
  const compose = useSelector(state => state.compose.compose);
  const email = useSelector(state => state.token.email);
  // ...........................fetch...................
  useEffect(()=>{
    dispatch(fetchSendMail(email+"send"))
    },[dispatch, email])

    // ............................inbox mail...............
  useEffect(()=>{
    // const intervalId = setInterval(()=>{
      dispatch(fetchMail(email))
      console.log("fectch app")
    // },2000)
  
    // return () => clearInterval(intervalId)

  },[dispatch, email])

  return (
    <>
    
   <Switch>
    <Route path='/' exact>
      <Signup/>
    </Route>
    <Route path='/Home'>
      <Home/>
    </Route>
   </Switch>
   
    {compose &&<Compose/>}
     </>
  );
}

export default App;
