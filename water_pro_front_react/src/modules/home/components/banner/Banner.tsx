import {DivBanner, H1Banner, PBanner, ABanner} from "./Banner.styles";
import './font.css'


const Banner = () => {

  return(
    <DivBanner>
      <H1Banner className="font-1">
        <ABanner >W</ABanner>ater Pro
      </H1Banner>
      <PBanner className="font-2">
        Desenvolvimento de uma plaforma para monitoramento<br/> de parâmetros de qualidade
            da água através do<br/> microcontrolador arduíno. 
      </PBanner>
    </DivBanner> 
  );
}

export default Banner;
