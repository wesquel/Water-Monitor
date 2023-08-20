import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./screens/home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Dashboard from "./screens/Dashboard";

import {
  AuthProvider,
  RequireAuth,
  RequireNoAuth,
} from "./context/AuthContext";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <RequireNoAuth>
                  <Home />
                </RequireNoAuth>
              }
            />
            <Route
              path="/login"
              element={
                <RequireNoAuth>
                  <Login />
                </RequireNoAuth>
              }
            />
            <Route
              path="/register"
              element={
                <RequireNoAuth>
                  <Register />
                </RequireNoAuth>
              }
            />
            <Route
              path="/dashboard"
              element={
                <RequireAuth value="/login">
                  <Dashboard />
                </RequireAuth>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
