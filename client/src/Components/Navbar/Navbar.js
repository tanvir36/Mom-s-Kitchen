import './Navbar.scss';
import login from '../../assets/login.png';
function Navbar() {
return(
    <section>
        <div className="nav">
           <a className="nav__link" href="/"> <div className="nav__link--icon">Mom's <br/> Kitchen</div></a>
           <a  href="/login"> <div className="nav__login"><img src={login}></img></div></a>
        </div>
        
    </section>
)
}
export default Navbar;
