
import {BrowserRouter as Router,  Route , Switch} from 'react-router-dom';
import Home from './Pages/Home/Home';
// import Login from './Pages/Login/Login';
import Offers from './Pages/Offers/Offers';
import Subscribe from './Pages/Subscribe/Subscribe';
import SubscriptionInfo from './Pages/SubscriptionInfo/SubscriptionInfo';
import Login from './Components/Login/Login';
import postSubscribe from './Pages/postSubscribe/postSubscribe';
import Navbar from './Components/Navbar/Navbar';
import JustLogin from './Pages/JustLogin/JustLogin';
import Comments from './Components/Comments/Comments';




function App () {
    return (
      <Router>
        <div className="App">
          
          <Switch>
             <Route path="/" exact component ={Home}/>
             <Route path="/SubscriptionInfo" component={SubscriptionInfo}/>             
             <Route path="/:id/:name/login" component={Login}/>
             <Route path="/:id/:name/subscribe" component={Subscribe}/>
             <Route path="/:id/:name/log" component={postSubscribe}/>
             <Route path="/login" component={JustLogin}/>
             <Route path="/:id" component ={Offers}/>
            

          </Switch>
        </div>
      </Router>
    );
  
}

export default App;

