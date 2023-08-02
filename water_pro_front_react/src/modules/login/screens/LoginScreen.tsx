import {useContext, useState} from "react";
import ButtonLeaf from "../../../shared/buttons/ButtonLeaf";
import Input from "../../../shared/inputs/Input";
import {Alink, BackgroundImage, ContainerLogin, ContainerLoginG, DivMessage, LimitedContainer} from "../styles/LoginScreen.styles";
import SVGLogo from "../../../shared/icons/SVGLogo";
import {useRequests} from "../../../shared/hooks/useRequest";
import {GlobalContext} from "../../../shared/hooks/useGlobalContext";

const LoginScreen = () =>
	{
	//const { globalData } = useContext(GlobalContext);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const { postRequest, loading } = useRequests();

	const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};

	const handleLogin = () => {
		postRequest('http://', { 
			email: email,
			password: password,
		});
	}
	return (
		<div>
			<ContainerLoginG>
				<BackgroundImage src="./bg_login.jpg"/>
				<ContainerLogin>
					<LimitedContainer>
						<SVGLogo width={400} height={200} viewBox="0 100 200 10"/>
						<Input title="" className="form-control py-3" 
								placeholder="Email" onChange={handleEmail} value={email}></Input>
						<br/>
						<Input type="password" title="" className="form-control py-3" 
								placeholder="Senha" onChange={handlePassword} value={password}></Input>
						<DivMessage className="form-text">Seus dados estarão seguros conosco.</DivMessage>
						<Alink className="" href="#"> Não fez o cadastro?</Alink>
						<ButtonLeaf onClick={handleLogin}>Entrar</ButtonLeaf>
					</LimitedContainer>
				</ContainerLogin>
			</ContainerLoginG>
		</div>
	);
}

export default LoginScreen;
