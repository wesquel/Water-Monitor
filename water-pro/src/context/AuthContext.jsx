/* eslint-disable react/prop-types */
import { useContext, createContext } from "react";
import { api, requestConfig } from "../utils/config.js";
import { Navigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const login = async (data) => {
    try {
      const config = requestConfig("POST", data);
      const response = await fetch(api + "/auth/signin", config);

      if (response.ok) {
        const userData = await response.json();
        localStorage.setItem("user", JSON.stringify(userData));
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  // Get the authentication token
  const getUser = () => {
    return localStorage.getItem("user");
  };

  // Sign out a user
  const logout = () => {
    localStorage.removeItem("user");
  };
  return (
    <AuthContext.Provider value={{ login, getUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthValue() {
  return useContext(AuthContext);
}

export const RequireAuth = ({ children, value }) => {
  const auth = useAuthValue();

  // TODO ─ Realizar uma requisição de verdade para o back para saber se o usuário está autenticado
  if (!auth.getUser()) {
    return <Navigate to={value} />;
  }

  return children;
};

export const RequireNoAuth = ({ children }) => {
  const auth = useAuthValue();

  if (auth.getUser()) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};
