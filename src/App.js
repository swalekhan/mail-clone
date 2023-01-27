
import { useSelector } from 'react-redux';
import './App.css';
import Compose from './component/compose/Compose';
import { Switch, Route } from 'react-router-dom';
import Signup from './component/Auth/signup/Signup';
import Home from './component/layout/Home';
import ForgetPass from './component/Auth/forgetPass/ForgetPass';

function App() {
  const compose = useSelector(state => state.compose.compose);   

  return (
    <>  
   <Switch>
    <Route path='/' exact>
      <Signup/>
    </Route>
    <Route path="/ForgetPass">
    <ForgetPass/>
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
