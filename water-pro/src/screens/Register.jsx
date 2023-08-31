import React, { useState } from "react";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import Container from "../components/Container";
import { ReactComponent as Logo } from "../assets/logo.svg";
import WaveSection from "../components/WaveSection";

const Register = () => {
  const [user, setUser] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Aqui você pode adicionar validações de dados do formulário

    try {
      const userData = {
        username: user,
        fullName,
        email,
        password,
      };

      console.log(userData);

      const response = await fetch("http://localhost:8080/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        // Requisição bem-sucedida, você pode redirecionar o usuário ou fazer outras ações
        console.log("Registro realizado com sucesso!");
        navigate("/login");
      } else {
        // Tratar erros, exibir mensagens de erro, etc.
        console.error("Erro ao tentar criar conta.");
      }
    } catch (error) {
      console.error("Erro ao enviar a requisição:", error);
    }
  };

  return (
    <div className="bg-mainBlack min-h-screen flex flex-col justify-center items-center relative ">
      <Container className="w-full flex justify-between items-center py-10 flex-col sm:flex-row gap-4">
        <Link to="/">
          <Logo className="text-mainBlue w-24 h-12" />
        </Link>
      </Container>

      <div className="flex-grow flex flex-col items-center relative z-10">
        <div className="bg-mainWhite w-[30rem] rounded-xl flex flex-col p-[4.5rem] justify-center shadow-lg">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col mb-6">
              <label>
                <span className="font-semibold">Usuário</span>
                <input
                  type="text"
                  className="p-2 bg-mainWhite rounded-xl outline-none border-2 w-full mt-1 focus:border-mainBlue transition-colors duration-300"
                  onChange={(e) => setUser(e.target.value)}
                />
              </label>
            </div>
            <div className="flex flex-col mb-6">
              <label>
                <span className="font-semibold">Nome Completo</span>
                <input
                  type="text"
                  className="p-2 bg-mainWhite rounded-xl outline-none border-2 w-full mt-1 focus:border-mainBlue transition-colors duration-300"
                  onChange={(e) => setFullName(e.target.value)}
                />
              </label>
            </div>
            <div className="flex flex-col mb-6">
              <label>
                <span className="font-semibold">E-Mail</span>
                <input
                  type="email"
                  className="p-2 bg-mainWhite rounded-xl outline-none border-2 w-full mt-1 focus:border-mainBlue transition-colors duration-300"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
            </div>
            <div className="flex flex-col mb-6">
              <label>
                <span className="font-semibold">Senha</span>
                <input
                  type="password"
                  className="p-2 bg-mainWhite rounded-xl outline-none border-2 w-full mt-1 focus:border-mainBlue transition-colors duration-300"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>
            <div className="flex flex-col mb-6">
              <label>
                <span className="font-semibold">Confirmar Senha</span>
                <input
                  type="password"
                  className="p-2 bg-mainWhite rounded-xl outline-none border-2 w-full mt-1 focus:border-mainBlue transition-colors duration-300"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </label>
            </div>
            <div className="flex flex-col">
              <label className="font-semibold mb-6">
                <input type="checkbox" className="mr-2" />
                Concordo com os{" "}
                <Link to="#" className="text-mainBlue">
                  termos
                </Link>
              </label>
              <Button className="bg-mainBlack text-mainWhite uppercase">
                Criar Conta
              </Button>
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

export default Register;
