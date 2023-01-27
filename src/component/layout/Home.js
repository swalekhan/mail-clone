import Header from "./Hedaer";
import Sidebar from "../sidebar/Sidebar";
import EmailList from "../mail/InboxEmailList";
import SingleEmail from "../mail/sindleEmail/SingleEmail";
import { Route, Switch } from "react-router-dom";
import Sendemail from "../mail/sendMail";

const Home = () => {
    return (
        <>
            <Header />
            <div className='app-side-body'>
                <Sidebar />
                <Switch>
                    <Route path='/Home' exact>
                        <EmailList />
                    </Route>
                    <Route path='/Home/Inbox' exact>
                        <EmailList />  {/*Inbox mail */}
                    </Route>
                    <Route path="/Home/Send" exact>
                        <Sendemail />
                    </Route>

                    <Route path='/Home/Home/:id'>
                        <SingleEmail />
                    </Route>
                </Switch>
            </div>
        </>
    )
}
export default Home;