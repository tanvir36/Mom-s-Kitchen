
import Login from '../../Components/Login/Login';
import Navbar from '../../Components/Navbar/Navbar';
import { Component } from 'react';

class SubscriptionInfo extends Component{
    render(){
        return (
            <section>
                <Navbar/>
                <Login/>

            </section>
        
        );    
    }   
}

export default SubscriptionInfo;