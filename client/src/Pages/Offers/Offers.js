import axios from 'axios';
import { Component } from 'react';
import {Link} from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import './Offers.scss';
import avocado from '../../assets/avocado-new.png';
import tomato from '../../assets/tomato.jpg';
class  Offers extends Component {
    state ={
        offers:[],
        id:"",
        
    };

    // subscribeHandler= (event)=>{
    //     event.preventDefault();
    //     axios.get("http://localhost:8080/userAuthenticated",{
    //         headers: {
    //             "x-access-token" :localStorage.getItem("token"),
    //         },
    //     }).then((response)=>{
    //         console.log(response);
    //         if(!response.data.auth){
    //             this.setState({
    //                 loginReq: true
    //             })
    //         }
    //     });
    // }
    componentDidMount () {
        axios.defaults.withCredentials=true;
        axios.get(`http://localhost:8080/kitchens/${this.props.match.params.id}`).then((response)=>{
            this.setState({
                offers: response.data.offers,
                id: this.props.match.params.id
            });
           
        });
    }

    render () {
        
        return(
            <section>
               <Navbar/>
               <div className="holder">
                    {this.state.offers.map((offer,i)=>(
                        <div key={i} className="offers">
                            <div className={`offers__card num${i}`}>
                                <div className="offers__card--img"><img  src={avocado} alt="avocado"/></div>
                                <h1 className="offers__card--heading">{offer.name}</h1>
                                <p className="offers__card--text">{offer.description} </p>                                                                
                                <p className="offers__card--price">{`Price: ${offer.price}`}</p>
                            </div>
                            <Link to ={`/${this.state.id}/${offer.name}/subscribe`}>          
                                <button  className={`offers__subscribe num${i}`}>SUBSCRIBE</button> 
                            </Link>
                        </div>
                    ))}                                                      
               </div>  
               {/* {this.state.offers.map((offer,i)=>(
                    <div key={i}>  
                        <h1>{offer.description}</h1>
                        <h2>{offer.price}</h2>
                        <Link to = {`/${this.state.id}/${offer.name}/login`}>
                            <button type="submit">Subscribe</button>
                        </Link>
                    </div>
                ))} */} 
            </section>
        )
    }
}
export default Offers;

  