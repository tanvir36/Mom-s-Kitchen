import './Login.scss';
import axios from 'axios';
import {Component} from 'react';
import homemade from '../../assets/chef.png';
import {Redirect} from 'react-router-dom';
import pin from '../../assets/pin-new.png';
import localLove from '../../assets/localLove.jpg';
class Login extends Component{
    state ={
        login: "",
        username: "",
        address: "",
        postal: "",
        subscription: "",
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
                    localStorage.clear();
                        this.setState({
                        login: response.data.Message
                     });
                } else {
                    localStorage.setItem("token",response.data.token)
                        this.setState({
                            status: true,
                            username: response.data.result[0].userName,
                            address:  response.data.result[0].address,
                            postal: response.data.result[0].postal,
                            subscription: response.data.result[0].subscription|| "You don't have any"
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
        if(username && password && address && postal){
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

  backHandler=(event)=>{
        event.preventDefault();
        window.history.back();
    }

    clickHandler =(event)=>{
        event.preventDefault();
        this.setState({
            signup: true
        });
    }
    render(){
        return (
            <section className="main">                            
                <div className="container_one">
                        <div className="login">         
                            <form autoComplete="off" className={`${this.state.status? "no-show":"login__form"}`} onSubmit={this.loginHandler}>
                                <img className="login__form--img" src={pin}/>
                                <h1 className="login__heading">Login</h1>  
                                <input  className="login__form--input" type="text" id="name" placeholder="username"/>
                                <input className="login__form--input" type="password" id ="password" placeholder="password"/>
                                <button className="login__form--button" type="submit">Login</button>
                                <h2 className="login__form--error">{this.state.login}</h2>
                                <button className="login__form--signup" type="submit" onClick={this.clickHandler}>Sign Up</button>
                            </form>
                            <div className={`${this.state.status? "logged":"no-show"}`}>
                                <h1 className="logged__heading">Hi</h1>
                                <h1 className="logged__heading">{this.state.username}</h1>
                                <h2>{this.state.address}</h2>
                                <h2>{this.state.postal}</h2>
                                <h1>SUBSCRIPTIONS</h1>
                                <h2>{this.state.subscription}</h2>
                                <button className="logged__button" onClick={this.backHandler}>BACK</button>
                            </div>                         
                        </div>                        
                </div>
                <div className="container_two">
                    <div className={`${this.state.signup ? "signup" : "no-show"}`}>  
                        <form autoComplete="off"  className="signup__form" onSubmit={this.signupHandler}>
                            <img className="login__form--img" src={pin}/>
                            <h1 className="signup__heading">Sign Up</h1>
                            <input  className="signup__form--input" type="text" id="name" placeholder="username"/>
                            <input className="signup__form--input"  type="password" id ="password" placeholder="password"/>
                            <input className="signup__form--input" type="text" id ="address" placeholder="address"/>   
                            <input className="signup__form--input" type="text" id="postal" placeholder="Postal code"/>    
                            <button className="signup__form--button" type="submit">Sign Up</button>
                            {this.state.error?   (<h2 className="login__form--error">ALL FIELDS MANDATORY</h2>):<h2></h2>}
                        </form>
                    </div>
                    {!this.state.signup &&
                    <div className="back">
                        <img src={homemade} alt="localLove"/>
                        <h1 class="back__text">HOMEMADE</h1>
                    </div>}
                </div>                
            </section>
        )        
    }
}
export default Login;