import Container from "./Container";
import { ReactComponent as Logo } from "../assets/logo.svg";
import Button from "./Button";
function Header() {
  return (
    <Container>
      <div className="w-full flex justify-between items-center py-10 flex-col sm:flex-row gap-4">
        <Logo className="text-mainBlue w-24 h-12" />
        <div className="flex items-center gap-8">
          <Button>ENTRAR</Button>
          <Button variant="outlined">CADASTRAR</Button>
        </div>
      </div>
    </Container>
  );
}

export default Header;
