import axios from 'axios';
import { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import bag from '../../assets/bag.png'
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
        logged: false,
        final: false,
        error: ""
       
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
                            error: "You Ordered Already!!"
                        });
                    }else{
                        axios.put("http://localhost:8080/subscribe",{
                            title : this.state.kitchen.title,
                            name: this.state.offer.name,
                            price: this.state.offer.price,
                            username: this.state.username,
                        }).then((response)=>{
                            this.setState({
                                final: true
                            })
                        });
                    }
            })
            .catch((error)=>{
               
            })                       
    }
    componentDidMount () {  
        // axios.defaults.withCredentials= true;       
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
            return(<main>Ready.........??????</main>)
        }
        return(
         
            <section className="background">
               
                <div className="subscribe"> 
                    
                    <div className="subscribe__container"> 
                    <Navbar/>                      
                        {this.state.logged && <h1 className="user">{`Helloo ${this.state.username}`}</h1> }                       
                        <div className="subscribe__heading">
                            <h1 className="subscribe__heading--main">{this.state.kitchen.title}</h1>
                            <h2 className="subscribe__heading--sub">{this.state.kitchen.slogan}</h2>
                            <h2 className="subscribe__heading--sub">{`By ${this.state.kitchen.name}`}</h2>
                        </div>

                        <div className="subscribe__offer">
                           {!this.state.final && <div className="subscribe__offer--text">
                                <h1 className="subscribe__heading--main">{this.state.offer.name}</h1>
                                <h2 className="subscribe__heading--sub" >{this.state.offer.description}</h2>
                                <h2 className="subscribe__heading--sub">{`Price: ${this.state.offer.price}`}</h2>                              
                            </div>}
                            {this.state.final && <div className="subscribe__offer--bag"><img  src={bag}/></div>}
                            <div className="subscribe__offer--buttons">
                                {!this.state.logged && 
                                    <Link to={`./log`}>
                                        <button  type="submit">LOGIN</button>
                                       
                                    </Link>} 
                                {this.state.logged && <button  onClick={this.confirmHandler} type="submit">CONFIRM</button> } 
                                {this.state.final && <button>DONE ??????</button>}
                                                                                 
                            </div>
                        </div>
                        {this.state.error!=="" && <div className="user">{this.state.error}</div>}
                        
                    </div>                  
                </div>
            </section>            
        )
    }
}
export default Subscribe;

