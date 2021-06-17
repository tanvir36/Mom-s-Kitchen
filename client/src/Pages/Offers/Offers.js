import axios from 'axios';
import { Component } from 'react';
import {Link} from 'react-router-dom';
import './Offers.scss';
class  Offers extends Component {
    state ={
        preferredKitchen:[]
    };

    componentDidMount () {
        axios.get(`http://localhost:8080/kitchens/${this.props.match.params.id}`).then((response)=>{
            this.setState({
                preferredKitchen: response.data
            });
        });
    }
    render () {
        console.log(this.state.preferredKitchen)
        return(
            <section className="offers">
                <h4> OFFERS</h4>
                {this.state.preferredKitchen.map((kitchen,i)=>(
                    <div key={i}>  
                        <h1>{kitchen.description}</h1>
                        <h2>{kitchen.price}</h2>
                        <Link to ="/login">
                            <button type="submit">Subscribe</button>
                        </Link>
                    </div>
                ))}
            </section>
        )
    }
}
export default Offers;