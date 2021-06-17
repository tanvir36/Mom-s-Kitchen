import { Component } from 'react';
import {BrowserRouter as Router,  Route , Switch} from 'react-router-dom';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Offers from './Pages/Offers/Offers';
import axios from 'axios';

function App () {
    return (
      <Router>
        <div className="App">
          
          <Switch>
             <Route path="/" exact component ={Home}/>
             
             <Route path="/login" component={Login}/>
             <Route path="/:id" component ={Offers}/>
          </Switch>
        </div>
      </Router>
    );
  
}

export default App;

{/* <Route path = "/" exact  render ={(props)=>(<Home kitchens={this.state.kitchens}/>)}/>
<Route path ="/:id" render ={(props)=>(<Offers kitchen={this.state.preferredKitchen}/>)}/> */}