
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Compose from './component/compose/Compose';
import Header from './component/layout/Hedaer';
import EmailList from './component/mail/EmailList';
import SingleEmail from './component/mail/sindleEmail/SingleEmail';
import Sidebar from './component/sidebar/Sidebar';
import { putMail } from './Store/mailSlice';
import { fetchMail } from './Store/mailSlice';
import { Switch, Route } from 'react-router-dom';

let preventPut = true;
function App() {
  const dispatch = useDispatch()
  const compose = useSelector(state => state.compose.compose);
  const mailState = useSelector(state=> state.mail.mailState)

  // .................putMail data.................
  useEffect(()=>{
    if(preventPut){
      preventPut = false;
      return;
    }
     dispatch(putMail("email",mailState))
  },[mailState, dispatch])

  // ...........................fetch...................
  useEffect(()=>{
  dispatch(fetchMail("email"))
  console.log("fectch app")
  },[dispatch])

  return (
    <>
    <Header/>
    <div className='app-side-body'>
    <Sidebar/>
    <Switch>
      <Route path='/' exact>
        <EmailList/>
      </Route>
      <Route path='/SingleMail/:id'>
      <SingleEmail/>
      </Route>
    </Switch>
    
    
    </div>
    {compose &&<Compose/>}
     </>
  );
}

export default App;
