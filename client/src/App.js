import { Component } from 'react';
import {BrowserRouter as Router,  Route} from 'react-router-dom';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import axios from 'axios';

class App extends Component {
  state ={
    kitchens:[],
    preferredKitchen:[]
  };

  componentDidMount () {
    axios.get(`http://localhost:8080/kitchens`).then((response)=>{
      console.log(response);
      this.setState({
        kitchens: response.data,
      })
    });

  }

  render(){
  //   if (this.state.kitchens === null) {
  //     return <div>Kitchens are loading... 🔨</div>;
  // }
  console.log(this.state.kitchens);
    return (
      <Router>
        <div className="App">
          {/* <Login/> */}
          <Home kitchens={this.state.kitchens}/>
        {/* <Route exact path="/" render ={() =><Home kitchens={this.state.kitchen}/>}/> */}
        {/* <Route path="/login" component={Login}/> */}
        </div>
      </Router>
    );
  }
}

export default App;
