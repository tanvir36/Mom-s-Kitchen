import './Login.scss';
import axios from 'axios';
import {Component} from 'react';
import {Redirect} from 'react-router-dom';
class Login extends Component{
    state ={
        login: "",
        status: false,
    };
   
    loginHandler =(event)=>{
        event.preventDefault();
        const username=event.target.name.value;
        const password= event.target.password.value;
        axios.defaults.withCredentials= true;
        axios.post("http://localhost:8080/login",{username, password}).then((response)=>{
            // console.log(response);
            
                if(response.data.Message){
                    // console.log(response.data.Message);
                        this.setState({
                        login: response.data.Message
                     });
                } else {
                    localStorage.setItem("token",response.data.token)
                        this.setState({
                            status: true
                        });
                 }              
        })
        event.target.reset();
    }

    signupHandler= (event)=>{
        event.preventDefault();
        const username=event.target.name.value;
        const password= event.target.password.value;
        const address = event.target.address.value;
        const postal = event.target.postal.value;
        axios.post("http://localhost:8080/register", {username , password , address, postal}).then((response)=>{
            //console.log(response);
        });
        event.target.reset();
    }
    // authHandler= (event)=>{
    //     event.preventDefault();
    //     axios.get("http://localhost:8080/userAuthenticated",{
    //         headers: {
    //             "x-access-token" :localStorage.getItem("token"),
    //         },
    //     }).then((response)=>{
    //         console.log(response);
    //     })   
    // }
    // componentDidMount () {
    //     axios.defaults.withCredentials= true;
    //     axios.get("http://localhost:8080/login").then((response)=>{
    //         console.log(response);
    //         if(response.data.loggedIn){
    //             this.setState({
    //                 login: "Welcome "+response.data.user[0].userName
    //             })       
    //         }
    //     })
        
    // }


    render(){
        return (
            <section>
                {this.state.status && <Redirect to= "./subscribe"/>}
                <h1>Login Form </h1>
                <h2>{this.state.login}</h2>
                 
                <form onSubmit={this.loginHandler}>
                    <input type="text" id="name" placeholder="username"/>
                    <input type="password" id ="password" placeholder="password"/>
                    <button type="submit">Login</button>
                </form>
                {/* {this.state.login ? <button onClick={this.authHandler}>Check Authentication</button>:<div></div>} */}
                <h1>Sign Up form</h1>
                <form onSubmit={this.signupHandler}>
                    <input type="text" id="name" placeholder="username"/>
                    <input type="password" id ="password" placeholder="password"/>
                    <input type="text" id ="address" placeholder="address"/>  
                    <input type="text" id="postal" placeholder="Postal code"/>    
                    <button type="submit">Sign Up</button>
                </form>
                 
            </section>
        )
        
    }
}
export default Login;