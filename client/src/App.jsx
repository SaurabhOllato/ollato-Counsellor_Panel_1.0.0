import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { UserProvider } from "./context/UserContext.jsx";
import { useUser } from "./context/UserContext.jsx";

import Registration from "./pages/Registration";
import Login from "./pages/Login";
import ForgotPassword from "./components/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Layout from "./Layout";
import ErrorPage from "./error-page.jsx";
function App() {
  // Mock authentication state
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // console.log(import.meta.env.VITE_PERSONAL_DELAILS_API);

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
          <Route path="/" element={<Login />} errorElement={<ErrorPage />} />
          <Route
            path="/registration"
            element={<Registration />}
            errorElement={<ErrorPage />}
          />
          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
            ErrorBoundary={ErrorBoundary}
          />
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
            errorElement={<ErrorPage />}
          />
          
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}
function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  return <div>{error.message}</div>;
}

export default App;
