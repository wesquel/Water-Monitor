import Navbar from "../components/Navbar/Navbar";
import Banner from "../components/banner/Banner";
import {BackgroundImage, Div, ImageWrapper} from "../styles/HomeScreen.styles";

const HomeScreen = () => {

	return (
		<Div>
			<ImageWrapper><BackgroundImage src="./bg_home.jpg"/></ImageWrapper>
			<Navbar/>
			<Banner/>
		</Div>	
	);
}

export default HomeScreen;
