import './Home.scss';
import {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
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
                <nav className="navbar">
                    <div><h2>Mom's</h2><h2>Kitchen</h2></div>
                    <div className="hanging"></div>
                    <div>
                        <h2>logIn</h2>
                    </div>
                </nav>
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