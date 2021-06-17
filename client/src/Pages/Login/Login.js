import './Login.scss';
import axios from 'axios';
import {Component} from 'react';
class Login extends Component{
    state ={
        login: "",
    };
   
    loginHandler =(event)=>{
        event.preventDefault();
        const username=event.target.name.value;
        const password= event.target.password.value;
        // console.log(`${username}   ${password}`);
        axios.defaults.withCredentials= true;
        axios.post("http://localhost:8080/login",{username, password}).then((response)=>{
                if(response.data.Message){
                    this.setState({
                        login: response.data.Message
                    });
                } else {
                    this.setState({
                        login: ("Welcome "+response.data[0].userName)
                    });
                }              
        })
        event.target.reset();
    }

    signupHandler= (event)=>{
        event.preventDefault();
        const username=event.target.name.value;
        const password= event.target.password.value;
        axios.post("http://localhost:8080/register", {username , password}).then((response)=>{
            console.log(response);
        });
        event.target.reset();
    }
    componentDidMount () {
        axios.defaults.withCredentials= true;
        axios.get("http://localhost:8080/login").then((response)=>{
            console.log(response);
        })
    }


    render(){
        return (
            <section>
                <h1>Login Form </h1>
                <h2>{this.state.login}</h2>
                 
                <form onSubmit={this.loginHandler}>
                    <input type="text" id="name" placeholder="username"/>
                    <input type="password" id ="password" placeholder="password"/>
                    <button type="submit">Login</button>
                </form>
                <h1>Sign Up form</h1>
                <form onSubmit={this.signupHandler}>
                    <input type="text" id="name" placeholder="username"/>
                    <input type="password" id ="password" placeholder="password"/>
                    <button type="submit">Sign Up</button>
                </form>

            </section>
        )
        
    }
}
export default Login;