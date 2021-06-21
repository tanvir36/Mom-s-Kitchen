import './Home.scss';
import {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../Components/Navbar/Navbar';
class Home extends Component {
    state ={
        kitchens:[]  
    };
    
    componentDidMount () {
        axios.get(`http://localhost:8080/kitchens`).then((response)=>{
          this.setState({
            kitchens: response.data,
          })
        });
    }

    render(){
        return (
            <section className="container">
                <Navbar/>
                <div className="menu">
                    <h1 className="menu__heading">MENU</h1>
                </div>
               

                {this.state.kitchens.map((kitchen,i) =>
                    <div key={i}> 
                        <Link to = {`/${kitchen.id}`}>
                            <div className="first">
                                <div className="first__text">

                                </div>
                                <div className="first__img">
                                    <img src={kitchen.image} alt="specificImage"/>
                                </div>
                            </div>
                            <div className="margin"></div>
                        </Link>
                    </div>
                )}       
            </section>  
        )
    }
}
export default Home;