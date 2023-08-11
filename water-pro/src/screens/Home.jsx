import Button from "../components/Button";
import Container from "../components/Container";
import Header from "../components/Header";
import WaveSection from "../components/WaveSection";
import { ReactComponent as Figure } from "../assets/figure.svg";

function Home() {
  return (
    <div className="overflow-x-hidden">
      <div className="w-screen h-screen bg-mainBlack flex flex-col justify-between">
        <Header />
        <Container>
          <div className="flex w-full justify-between items-center">
            <div className="flex flex-col gap-8 ">
              <h1 className="font-bold text-mainBlue text-xl sm:text-4xl w-[100%] sm:w-[70%]">
                Efetivo sistema para acompanhamento da água
              </h1>
              <p className="sm:text-base text-mainWhite font-light text-xs w-[100%] sm:w-[60%]">
                Dashboard para monitoramento de parâmetros de qualidade da água
                através do microcontrolador arduíno.
              </p>
              <Button className="text-base font-light w-[259px]">
                COMEÇAR A USAR
              </Button>
            </div>
            <Figure className="hidden sm:block" />
          </div>
        </Container>
        <WaveSection />
      </div>
      <div className="bg-mainBlue">
        <Container>
          <p>teste</p>
          <p>teste</p>
          <p>teste</p>
          <p>teste</p>
          <p>teste</p>
          <p>teste</p>
          <p>teste</p>
          <p>teste</p>
        </Container>
      </div>
    </div>
  );
}
export default Home;
