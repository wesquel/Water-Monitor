import './Navbar.css'
import {Menu, Nav} from './Navbar.styles';


const Navbar = () => {

  return(
      <Menu>
      <Nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
            <a href="/" className="p-1">
              <img src="./logo.svg" height="200" width="150"/>
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-center" id="navbarScroll">
              <ul className="navbar-nav my-2 my-lg-0 navbar-nav-scroll">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" id="barra" href="#">Sobre</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" id="barra" href="#">Como Funciona</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" id="barra" href="#">Participantes</a>
                </li>
              </ul>
            </div>
              <form className="d-flex" role="search">
                <a href="/login"><button type="button" className="btn btn-dark px-4 btn-rounded">Entrar</button></a>
                <a href="/registry"><button type="button" className="btn btn-purple px-4 btn-rounded">Registre-se</button></a>
              </form>
          </div>
      </Nav>
    </Menu>
  );
}

export default Navbar;
