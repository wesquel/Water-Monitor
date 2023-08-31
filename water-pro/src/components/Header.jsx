import Container from "./Container";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/logo.svg";
import Button from "./Button";
function Header() {
  return (
    <Container>
      <div className="w-full flex justify-between items-center py-10 flex-col sm:flex-row gap-4">
        <Logo className="text-mainBlue w-24 h-12" />
        <div className="flex items-center gap-8">
          <Link to="/login">
            <Button>ENTRAR</Button>
          </Link>
          <Link to="/register">
            <Button variant="outlined">CADASTRAR</Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}

export default Header;
