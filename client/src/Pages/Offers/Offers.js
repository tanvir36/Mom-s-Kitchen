import axios from 'axios';
import { Component } from 'react';
import {Link} from 'react-router-dom';
import './Offers.scss';
class  Offers extends Component {
    state ={
        offers:[],
        id:""
    };

    componentDidMount () {
        axios.get(`http://localhost:8080/kitchens/${this.props.match.params.id}`).then((response)=>{
            this.setState({
                offers: response.data.offers,
                id: this.props.match.params.id
            });
        });
    }
    render () {
        return(
            <section className="offers">
                <h4> OFFERS</h4>
                {this.state.offers.map((offer,i)=>(
                    <div key={i}>  
                        <h1>{offer.description}</h1>
                        <h2>{offer.price}</h2>
                        <Link to = {`/${this.state.id}/${offer.name}/login`}>
                            <button type="submit">Subscribe</button>
                        </Link>
                    </div>
                ))}
            </section>
        )
    }
}
export default Offers;