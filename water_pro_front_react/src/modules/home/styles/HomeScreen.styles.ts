import {keyframes, styled} from "styled-components";

const BgAnimation = keyframes`
	from{
		transform: scale(1.3);
	}
	to{
		transform: scale(1);
	}
`;

export const Div = styled.div`
	position: relative;
	width: 100%;
	height: 100vh;
	overflow: hidden;
`;

export const ImageWrapper = styled.div`
	width: 100%;
	height: 100%;
	overflow: hidden;
	background-color: rgba(0, 0, 0, 0.9);
`

export const BackgroundImage = styled.img`
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100vh;
	object-fit: cover;
	z-index: 0;
	animation: ${BgAnimation} 20s forwards;
	overflow: hidden;
	opacity: 0.8;
`;

