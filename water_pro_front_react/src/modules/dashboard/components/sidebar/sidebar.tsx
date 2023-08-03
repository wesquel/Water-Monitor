import './sidebar.css';
import logo from '../../assets/logo.png';


const SideBar = ({ sideBarOpen, closeSideBar }) => {
  return (
    <div className={sideBarOpen ? "sidebar-responsive" : ""} id="sidebar"> 
      <div className='sidebar__title'>
        <div className='sidebar__img'>
          <img src={logo} alt="logo" />
          <h1> WaterPro </h1>
        </div>
        <i onClick={() => closeSideBar()}
        className='fa fa-times'
        id='sideBarIcon'
        aria-hidden='true'></i>
      </div>
      <div className='sidebar__menu'>
        
        <div className='sidebar__link active_menu_link'>
          <i className='fa fa-minus-square'></i>
          <a href='#'> Home</a>
        </div>
        <h2> ADMIN</h2>
        <div className='sidebar__link'>
          <i className='fa fa-tachometer'></i>
          <a href='#'> Área Administrativa</a>
        </div>
        <h2> PESSOAS </h2>
        <div className='sidebar__link'>
          <i className='fa fa-male'></i>
          <a href='#'>Admistradores</a>
        </div>
        <div className='sidebar__link'>
          <i className='fa fa-tasks'></i>
          <a href='#'> A plataforma</a>
        </div>
        <div className='sidebar__link'>
          <i className='fa fa-file-text'></i>
          <a href='#'>Política de privacidade</a>
        </div>
        <div className='sidebar__logout'>
          <i className='fa fa-power-off'></i>
          <a href='#'>Logout</a>
        </div>

      </div>
    </div>
  );
}

export default SideBar;
