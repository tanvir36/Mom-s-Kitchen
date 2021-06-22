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
                <div className="hanging"></div>
                <div className="menu">
                    <h1 className="menu__heading">MENU</h1>
                </div>
               

                {this.state.kitchens.map((kitchen,i) =>
                    <div key={i}> 
                        {/* <div className="margin"></div> */}
                        <Link to = {`/${kitchen.id}`}>
                            <div className="first">
                                <div className="first__text">
                                    <h2 className="first__text--heading">{kitchen.title}</h2>
                                    <h2 className="first__text--subheading">{kitchen.slogan}</h2>
                                    <h3 className="first__text--subheading">By</h3>
                                    <h3 className="first__text--subheading">{kitchen.name}</h3>
                                </div>
                                <div className="first__img">
                                    <img src={kitchen.image} alt="specificImage"/>
                                </div>
                            </div>
            
                        </Link>
                        <div className="margin"></div>
                    </div>
                )}       
            </section>  
        )
    }
}
export default Home;