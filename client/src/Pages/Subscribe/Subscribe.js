import axios from 'axios';
import { Component } from 'react';
import './Subscribe.scss';
class Subscribe extends Component {
    state ={
        kitchen: null,
        offer: ""
    };

    confirmHandler =(event)=>{
        event.preventDefault();
        

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
            </section>
            
        )
    }
}
export default Subscribe;