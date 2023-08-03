import './navbar.css';
import avatar from '../../assets/user.png';

const NavBar = ({sideBarOpen, openSideBar}) =>{
  return (
    <nav className="navbar">
      <div className="nav_icon" onClick={() => openSideBar()}>
        <i className="fa fa-bars" aria-hidden="true"></i>
      </div>

      <div className="navbar__left">
        <a href="#" className="active_link">Sensores</a>
      </div>

      <div className="navbar__right">
        <a href="#">
          <i className="fa fa-search"></i>
        </a>

        <a href="#">
          <i className="fa fa-clock-o"></i>
        </a>

        <a href="#">
          <img width="30" src={avatar} alt = "avatar"/>
        </a>
      </div>

    </nav>
  )

}

export default NavBar;
