import { ReactComponent as Wave } from "../assets/wave.svg";
import { ReactComponent as DownArrow } from "../assets/downArrow.svg";
function WaveSection() {
  return (
    <div className="gradient relative">
      <Wave className="w-full  h-full" />
      <DownArrow className="w-8 sm:w-[60px] top-[50%] left-[45%] absolute sm:top-[65%] sm:left-[50%] animate-bounce" />
    </div>
  );
}
export default WaveSection;
