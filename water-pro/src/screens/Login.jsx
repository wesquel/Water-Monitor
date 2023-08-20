import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "../components/Container";
import { ReactComponent as Logo } from "../assets/logo.svg";
import WaveSection from "../components/WaveSection";
import Button from "../components/Button";
import { useAuthValue } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuthValue();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginData = {
      username: user,
      password: password,
    };

    const loginSuccess = await login(loginData);

    if (loginSuccess) {
      navigate("/dashboard");
    } else {
      setLoginError(true);
    }
  };

  return (
    <div className="bg-mainBlack min-h-screen flex flex-col justify-center items-center relative overflow-hidden">
      <Container className="w-full flex justify-between items-center py-10 flex-col sm:flex-row gap-4 absolute top-0">
        <Link to="/">
          <Logo className="text-mainBlue w-24 h-12" />
        </Link>
      </Container>

      <div className="flex-grow flex flex-col items-center justify-center relative z-10">
        <div className="bg-mainWhite w-[30rem] rounded-xl flex flex-col p-[4.5rem] justify-center shadow-xl">
          <form onSubmit={handleLogin}>
            <div className="flex flex-col mb-6">
              <label>
                <span className="font-semibold">Usuário</span>
                <input
                  type="text"
                  className="p-2 bg-mainWhite rounded-xl outline-none border-2 w-full mt-1 focus:border-mainBlue transition-colors duration-300"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                />
              </label>
            </div>
            <div className="flex flex-col mb-6">
              <label>
                <span className="font-semibold">Senha</span>
                <input
                  type="password"
                  className="p-2 bg-mainWhite rounded-xl outline-none border-2 w-full mt-1 focus:border-mainBlue transition-colors duration-300"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>
            {loginError && (
              <p className="text-red-500 mb-4">
                Credenciais inválidas. Por favor, tente novamente.
              </p>
            )}
            <div className="flex items-center">
              <Button type="submit" className="bg-mainBlack text-mainWhite">
                Entrar
              </Button>
              <Link
                to="/register"
                className="ml-8 text-sm text-mainBlue font-semibold"
              >
                Criar conta
              </Link>
            </div>
          </form>
        </div>
      </div>

      <div className="absolute bottom-[-6rem] ">
        <WaveSection />
      </div>
    </div>
  );
};

export default Login;
