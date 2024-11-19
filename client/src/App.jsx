import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import ForgotPassword from "./components/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Layout from "./Layout";
import { UserProvider } from "./context/UserContext.jsx";
import { useUser } from "./context/UserContext.jsx";
function App() {
  // Mock authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Private route wrapper
  const PrivateRoute = ({ children }) => {
    const { user } = useUser();
    return user ? children : <Navigate to="/" />;
  };

  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          {/* public routes */}
          <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}

          {/* private routes */}
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
