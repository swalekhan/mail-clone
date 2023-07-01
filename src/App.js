
import { useSelector, useDispatch } from 'react-redux';
import './App.css';
import Compose from './component/compose/Compose';
import { Switch, Route } from 'react-router-dom';
import ForgetPass from './component/Auth/forgetPass/ForgetPass';
import SignUpIn from './Pages/Auth/Signup&SingIn';
import Send from './Pages/Send';
import Inbox from './Pages/Inbox';
import Sidebar from './component/layout/sidebar/Sidebar';
import Header from './component/layout/Hedaer';
import MailDetails from './Pages/MailDetails';
import { useEffect } from 'react';
import { fetchSendMailAsync } from './component/SendMail/SendMailSlice';
import { fetchInboxMailAsync } from './component/InboxMail/InboxMailSlice';


function App() {
  const compose = useSelector(state => state.compose.compose);
  const email = useSelector(state => state.token.email);
  const dispatch = useDispatch()

  // .............................fetch-inbox-mail......................................./
  useEffect(() => {
    if (email) {
      dispatch(fetchInboxMailAsync(email))
    }
    const id = setInterval(() => {
      if (email) {
        dispatch(fetchInboxMailAsync(email))
      }
    }, 5000)
    return () => {
      clearInterval(id)
    }
  }, [dispatch, email])

  // .............................fetch-send-mail......................................./
  useEffect(() => {
    if (email) {
      dispatch(fetchSendMailAsync(email + "send"))
    }
  }, [dispatch, email])

  return (
    <>
      <Header />
      <div className='app-side-body'>
        <Sidebar />
        <div className='route_pages' id='pages'>
          <Switch>
            <Route path='/' exact>
             {!email?<SignUpIn />:<Inbox />}
            </Route>
            <Route path="/Auth/ForgetPassword" exact>
              <ForgetPass />
            </Route>
            <Route path='/inbox' exact>
              <Inbox />
            </Route>
            <Route path='/send' exact>
              <Send />
            </Route>
            <Route path='/mailDetails:id'>
              <MailDetails />
            </Route>
          </Switch>
        </div>
      </div>

      {compose && <Compose />}
    </>
  );
}

export default App;
