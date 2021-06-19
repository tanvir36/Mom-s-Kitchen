
import {BrowserRouter as Router,  Route , Switch} from 'react-router-dom';
import Home from './Pages/Home/Home';
// import Login from './Pages/Login/Login';
import Offers from './Pages/Offers/Offers';
import Subscribe from './Pages/Subscribe/Subscribe';
import SubscriptionInfo from './Pages/SubscriptionInfo/SubscriptionInfo';
import Login from './Components/Login/Login';



function App () {
    return (
      <Router>
        <div className="App">
          
          <Switch>
             <Route path="/" exact component ={Home}/>
             <Route path="/SubscriptionInfo" component={SubscriptionInfo}/>             
             <Route path="/:id/:name/login" component={Login}/>
             <Route path="/:id/:name/subscribe" component={Subscribe}/>
             <Route path="/:id" component ={Offers}/>
          </Switch>
        </div>
      </Router>
    );
  
}

export default App;

