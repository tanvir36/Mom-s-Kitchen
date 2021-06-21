import axios from 'axios';
import { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import SubscriptionInfo from '../SubscriptionInfo/SubscriptionInfo';
import './Subscribe.scss';
import Navbar from '../../Components/Navbar/Navbar';
class Subscribe extends Component {
    state ={
        kitchen: null,
        offer: "",
        username:"",
        address: "",
        postal: "",
        logIn: true,
        logged: false
       
    };

    confirmHandler =(event)=>{
        event.preventDefault();
        //axios.defaults.withCredentials= true;
            axios.post(`http://localhost:8080/kitchens/${this.state.kitchen.id}/${this.state.offer.name}`,
            {
                name: this.state.username, 
                address: this.state.address,
                postal: this.state.postal
            }).then((res)=>{               
                console.log(res.data);
                    if('status' in res.data){
                        this.setState({
                            error: "You Subscribed Already!!"
                        });
                    }else{
                        axios.put("http://localhost:8080/subscribe",{
                            title : this.state.kitchen.title,
                            name: this.state.offer.name,
                            price: this.state.offer.price,
                            username: this.state.username,
                        }).then((response)=>{});
                    }
            })
            .catch((error)=>{
               
            })                       
    }
    componentDidMount () {         
         axios.get("http://localhost:8080/userAuthenticated",{
             headers: {
                 "x-access-token" :localStorage.getItem("token"),
            },
         }).then((response)=>{
             console.log(response);
             if(response.data.auth && 'user' in response.data){               
                this.setState({
                    logged: true,
                    username: response.data.user[0].userName,
                    address: response.data.user[0].address,
                    postal: response.data.user[0].postal
                })
            }
         });
   
        axios.get(`http://localhost:8080/kitchens/${this.props.match.params.id}`)  
        .then((response)=>{
            this.setState({
               kitchen: response.data,
               offer: response.data.offers.find(offer=>offer.name===this.props.match.params.name)
            });   
        })
    }
    render(){
        
        if(!this.state.kitchen){
            return(<main>Ready.........✔️</main>)
        }
        return(
         
            <section className="background">
               
                <div className="subscribe"> 
                    <div className="subscribe__container">
                        <Navbar/>
                        {this.state.logged && <h1 className="user">{`Helloo ${this.state.username}`}</h1> }
                        
                        <div className="subscribe__heading">
                            <h1 className="subscribe__heading--text">{this.state.kitchen.title}</h1>
                            <h2 className="subscribe__heading--text">{this.state.kitchen.slogan}</h2>
                            <h2 className="subscribe__heading--text">{`By ${this.state.kitchen.name}`}</h2>
                        </div>

                        <div className="subscribe__offer">
                            <div className="subscribe__offer--text">
                                <h1>{this.state.offer.name}</h1>
                                <h1 className="italic">{this.state.offer.description}</h1>
                                <h1>{`Price: ${this.state.offer.price}`}</h1>
                            </div>
                            <div className="subscribe__offer--buttons">
                                {!this.state.logged && 
                                    <Link to={`./log`}>
                                        <button  type="submit">LOGIN</button>
                                    </Link>} 
                                {this.state.logged && <button  onClick={this.confirmHandler} type="submit">CONFIRM</button> }                                                    
                            </div>
                        </div>
                    </div>                  
                </div>
            </section>            
        )
    }
}
export default Subscribe;

{/* <div className="check"></div>
                <h1>{this.state.kitchen.title} by {this.state.kitchen.name}</h1>
                <h2>{this.state.kitchen.slogan}</h2>
                <h3>{this.state.offer.name}</h3>
                <h3>{this.state.offer.description}</h3>
                <h1>{this.state.offer.price}</h1>
                <button onClick={this.confirmHandler}> CONFIRM</button>
                {!this.state.logIn  && <Link to={`./login`}><button>Log IN </button></Link>}
                <a href="/">CANCEL</a> */}