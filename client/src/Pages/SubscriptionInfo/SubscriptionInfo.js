import './SubscriptionInfo.scss';
import Login from '../../Components/Login/Login';
import { Component } from 'react';

class SubscriptionInfo extends Component{
    render(){
        return (
            <section>
                <Login/>
                <button>SHOW</button>
            </section>
        
        );    
    }   
}

export default SubscriptionInfo;