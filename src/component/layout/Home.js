import Header from "./Hedaer";
import Sidebar from "../sidebar/Sidebar";
import EmailList from "../mail/EmailList";
import SingleEmail from "../mail/sindleEmail/SingleEmail";
import { Route } from "react-router-dom";

const Home = () => {
    return (
        <>
            <Header />
            <div className='app-side-body'>
                <Sidebar />
                    <Route path='/Home' exact>
                        <EmailList />
                    </Route>
                    <Route path='/Home/:id'>
                        <SingleEmail />
                    </Route>
            </div>
        </>
    )
}
export default Home;