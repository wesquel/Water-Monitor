import styled from "styled-components";
import { Typography } from "antd";
import {keyframes} from "styled-components";
const {Title} = Typography;


const RollAnimation = keyframes`
	from { transform: translateX(-50%); }
	to { transform: translateX(0%); opacity: 1;}
` ;

export const BackgroundImage = styled.img`
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100vh;
	object-fit: cover;
	z-index: -1;
`;


export const LogoImage = styled.img`
	width: 300px;
`;
 
export const ContainerLogin = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: rgba(255, 255, 255, 0.3);
	width: 100%;
	height: 100vh; 
	max-width: 646px;
	padding-left: 22px;
	padding-right: 22px;
	z-index: 2;
	border-radius: 30px 0px 0px 30px;
	box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

	animation: ${RollAnimation} 1.2s forwards;
	opacity: 0;
`;

export const LimitedContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	max-width: 498px;
	flex-direction: column;
`;

export const ContainerLoginG = styled.div`
	display: flex;
	width: 100%;
	justify-content: right;
`;

export const TitleLogin = styled(Title)`
	&.ant-typography {
		color: #364156;
	}
`;

export const DivLeft = styled.div`
	display: flex;
	justify-content: left;
`;

export const DivMessage = styled.div`
	display: flex;
	justify-content: left;
	width: 100%;
	color: #000000;
	padding-left: 8px;
`;


export const Alink = styled.a`
	display: flex;
	justify-content: left;
	width: 100%;
	color: #000000;
	text-decoration: none;
	padding-top: 15px;
	padding-left: 8px;
	&:hover{
		color: rgba(203, 203, 203, 1);
	}
`;

