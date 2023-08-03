import {useState} from "react";
import ButtonLeaf from "../../../shared/buttons/ButtonLeaf";
import Input from "../../../shared/inputs/Input";
import {BackgroundImage, ContainerLogin, ContainerLoginG, DivMessage, LimitedContainer} from "../styles/RegistryScreen.styles";
import SVGLogo from "../../../shared/icons/SVGLogo";
import {useRequests} from "../../../shared/hooks/useRequest";
import Phone from "../../../shared/inputs/Phone";
//import {GlobalContext} from "../../../shared/hooks/useGlobalContext";

const RegistryScreen = () =>
	{
	//const { globalData } = useContext(GlobalContext);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [cpf, setCpf] = useState('');

	const { addRequest, loading } = useRequests();

	const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};

	const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
	};

	const handleCpf = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCpf(event.target.value);
	};

	const handlePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPhone(event.target.value);
	};
	const handleRegistry = () => {
		addRequest('http://', { 
			email: email,
			password: password,
			cpf: cpf,
			phone: phone,
			name: name,
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
								placeholder="Nome" onChange={handleName} value={name}></Input>
						<br/>
						<Input title="" className="form-control py-3" 
								placeholder="CPF" onChange={handleCpf} value={cpf}></Input>
						<br/>
						<Input type="phone" className="form-control py-3" 
								placeholder="Telefone" onChange={handlePhone} value={phone}></Input>
						<br/>
						<Input type="email" className="form-control py-3" 
								placeholder="Email" onChange={handleEmail} value={email}></Input>
						<br/>
						<Input type="password" title="" className="form-control py-3" 
								placeholder="Senha" onChange={handlePassword} value={password}></Input>
						<br/>
						<DivMessage className="form-text">Seus dados estarão seguros conosco.</DivMessage>
						<br/>
						<ButtonLeaf onClick={handleRegistry}>Registre-se</ButtonLeaf>
					</LimitedContainer>
				</ContainerLogin>
			</ContainerLoginG>
		</div>
	);
}

export default RegistryScreen;
