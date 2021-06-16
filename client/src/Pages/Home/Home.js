import './Home.scss';
import  mexican from '../../assets/mexican-food.jpg';
function Home ({kitchens}) {
    
return (
    <section className="container">
        {/* <marquee> help local business</marquee> */}
        <nav className="navbar">
            <div><h2>Mom's</h2><h2>Kitchen</h2></div>
            <div className="hanging"></div>

            <div>
                <h2>logIn</h2>
            </div>
        </nav>
        <div className="menu">
            <h1 className="menu__heading">MENU</h1>
            <div className="menu__date">
                {/* <h2 className="menu__date--today">14th JUNE</h2> */}
                {/* <p>Helping local business and eating homemade food</p> */}
            </div>
        </div>
            

        {kitchens.map((kitchen) =>
            <div>
                
                <div className="first">
                    <div className="first__text">

                    </div>
                    <div className="first__img">
                        <img src={kitchen.image}/>
                    </div>
                </div>
                <div className="margin"></div>
            </div>
            )}
       

    </section>
    
)
}
export default Home;