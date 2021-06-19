import './Login.scss';
import axios from 'axios';
import {Component} from 'react';
import {Redirect} from 'react-router-dom';
import pin from '../../assets/pin-new.png';
import localLove from '../../assets/localLove.jpg';
class Login extends Component{
    state ={
        login: "",
        status: false,
        signup: false,
        error: false
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
                        console.log(response);
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
        if(username || password || address || postal){
            axios.post("http://localhost:8080/register", {username , password , address, postal})
            .then((response)=>{
            });
            this.setState({
                signup: false
            });
        }else{
            this.setState({
                error: true,
            });
        }
       
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

    clickHandler =(event)=>{
        event.preventDefault();
        this.setState({
            signup: true
        });
    }
    render(){
        return (
            <section className="main">
                <div className="check"></div>
                {/* {this.state.status && <Redirect to= "./subscribe"/>} */}
                <div className="container_one">
                        <div className="login">         
                            <form className="login__form" onSubmit={this.loginHandler}>
                                <img className="login__form--img" src={pin}/>
                                <h1>Login</h1>  
                                <input className="login__form--input" type="text" id="name" placeholder="username"/>
                                <input className="login__form--input" type="password" id ="password" placeholder="password"/>
                                <button className="login__form--button" type="submit">Login</button>
                                <h2 className="login__form--error">{this.state.login}</h2>
                                <button className="login__form--signup" type="submit" onClick={this.clickHandler}>Sign Up</button>
                            </form>
                        </div>                        
                </div>
                <div className="container_two">
                    <div className={`${this.state.signup ? "signup" : "no-signup"}`}>  
                        <form  className="signup__form" onSubmit={this.signupHandler}>
                            <img className="login__form--img" src={pin}/>
                            <h1>Sign Up</h1>
                            <input className="signup__form--input" type="text" id="name" placeholder="username"/>
                            <input className="signup__form--input"  type="password" id ="password" placeholder="password"/>
                            <input className="signup__form--input" type="text" id ="address" placeholder="address"/>   
                            <input className="signup__form--input" type="text" id="postal" placeholder="Postal code"/>    
                            <button className="signup__form--button" type="submit">Sign Up</button>
                            {this.state.error?   (<h2 className="login__form--error">ALL FIELDS MANDATORY</h2>):<h2></h2>}
           
                        </form>
                    </div>
                    <div className="back">
                        <img src={localLove} alt="localLove"/>
                    </div>
                </div>
                 
            </section>
        )
        
    }
}
export default Login;