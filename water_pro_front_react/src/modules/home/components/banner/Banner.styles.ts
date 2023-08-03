import styled, {keyframes} from "styled-components";
import './font.css'

const  moveBanner = keyframes`
	from{
		transform: translateY(10rem) rotateY(-30deg);
	}
	to{
		transform: translateY(0) rotateY(0deg);
		opacity: 1;
	}
`;

export const DivBanner = styled.div`
	position: absolute;
	top: 50%;
	right: 5%;
	color: white;
`;

export const H1Banner = styled.h1` 
	color: white;
	font-size: 5em;
	font-weight: 500;
	text-shadow: .2rem .3rem 2px rgba(0, 0, 0, 0.5);
	line-height: 3rem;
	margin-bottom: 3rem;
	opacity: 0;
	animation: ${moveBanner} 1.5s 0.7s forwards;
`;

export const PBanner = styled.p` 
	color: white;
	font-size: 1.2rem;
	text-shadow: .3rem .2rem rgba(0, 0, 0, 0.4);
	margin-bottom: 2rem;
	opacity: 0;
	animation: moveBanner  forwards;
	animation: ${moveBanner} 1.5s 1.2s forwards;
`;

export const ABanner = styled.a` 
	color: #5D3FD3;
	text-decoration: none;
	font-size: 1.3em;
`;

