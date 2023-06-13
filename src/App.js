
import { useSelector } from 'react-redux';
import './App.css';
import Compose from './component/compose/Compose';
import { Switch, Route } from 'react-router-dom';
// import Signup from './component/Auth/signup/Signup';
// import Home from './component/layout/Home';
import ForgetPass from './component/Auth/forgetPass/ForgetPass';
import SignUpIn from './Pages/Auth/Signup&SingIn';
import Send from './Pages/Send';
import Inbox from './Pages/Inbox';
import Sidebar from './component/layout/sidebar/Sidebar';
import Header from './component/layout/Hedaer';
import MailDetails from './Pages/MailDetails';

function App() {
  const compose = useSelector(state => state.compose.compose);

  return (
    <>
      <Header />
      <div className='app-side-body'>
        <Sidebar />
        <Switch>
          <Route path='/' exact>
            <SignUpIn />
          </Route>
          <Route path="Auth/ForgetPassword" exact>
            <ForgetPass />
          </Route>
          <Route path='/inbox' exact>
            <Inbox />
          </Route>
          <Route path='/send' exact>
            <Send />
          </Route>
          <Route path='/mailDetails:id'>
            <MailDetails/>
          </Route>
        </Switch>
      </div>

      {compose && <Compose />}
    </>
  );
}

export default App;
