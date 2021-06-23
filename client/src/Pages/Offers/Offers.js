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
                                <button  className={`offers__subscribe num${i}`}>ORDER</button> 
                            </Link>
                        </div>
                    ))}                                                                      
               </div>  
               <div className="terms">
                        <h1 className="terms__heading">Terms and Conditions</h1>
                        <p className="terms__text">* Money would be deducted after order is delievered</p>
                        <p className="terms__text">* You can call us at +16475400116 To customize the order.</p>
                        <p className="terms__text">* We do provide the Tiffin service. Contact us for more information</p>
                        <p className="terms__text">* We change our menu daily. Please keep checking our menu for new and exciting dishes</p>
                        <p className="terms__text">* If you like food please refer us to your family and friends</p>
                        <p className="terms__text">* Let us know how we can make service better. Any suggestions would be appreciated.</p>
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

  