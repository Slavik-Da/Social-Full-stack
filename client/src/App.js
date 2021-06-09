import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth } from "./hooks/auth.hook";
import { Routes } from "./routes";
import { HttpProvider } from "./States/HttpProvider";
import { Navbar } from "./components/Navbar";
import { Loader } from "./components/Loader";
import "materialize-css";
import { AuthContext } from "./States/Context/AuthContext";

function App() {
  const { token, login, logout, userId, isAuthenticated, role } = useAuth();

  const isAuthReturnNavbar = isAuthenticated && <Navbar />;

  return (
    <HttpProvider>
      <AuthContext.Provider
        value={{
          token,
          login,
          logout,
          userId,
          isAuthenticated,
          role,
        }}
      >
        <Router>
          {isAuthReturnNavbar}
          <div className="container">
            <Routes isAuthenticated={isAuthenticated} role={role} />
          </div>
        </Router>
      </AuthContext.Provider>
    </HttpProvider>
  );
}

export default App;
