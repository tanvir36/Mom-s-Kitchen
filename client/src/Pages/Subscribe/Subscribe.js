import axios from 'axios';
import { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import './Subscribe.scss';
class Subscribe extends Component {
    state ={
        kitchen: null,
        offer: "",
        logIn: true
       
    };

    confirmHandler =(event)=>{
        event.preventDefault();
        axios.defaults.withCredentials= true;
        axios.get("http://localhost:8080/login").then((response)=>{
            console.log(response);
            if(response.data.loggedIn){
                const name = response.data.user[0].userName;
                const address= response.data.user[0].address;
                const postal =response.data.user[0].postal;
                
                axios.post(`http://localhost:8080/kitchens/${this.state.kitchen.id}/${this.state.offer.name}`,
                {
                    name: name, 
                    address: address,
                    postal: postal
                }).then((res)=>{console.log(res.data);});

                axios.put("http://localhost:8080/subscribe",{
                    title : this.state.kitchen.title,
                    name: this.state.offer.name,
                    price: this.state.offer.price,
                    username: name,
                }).then((response)=>{});
                this.setState({
                    status: true,
                });
            }else{
                this.setState({
                    logIn: false
                });
            }
        });           
    }
    componentDidMount () {
        // axios.defaults.withCredentials= true;
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
         
            <section>
                <h1>{this.state.kitchen.title} by {this.state.kitchen.name}</h1>
                <h2>{this.state.kitchen.slogan}</h2>
                <h3>{this.state.offer.name}</h3>
                <h3>{this.state.offer.description}</h3>
                <h1>{this.state.offer.price}</h1>
                <button onClick={this.confirmHandler}> CONFIRM</button>
                {!this.state.logIn  && <Link to={`./login`}><button>Log IN </button></Link>}
                <a href="/">CANCEL</a>
            </section>
            
        )
    }
}
export default Subscribe;