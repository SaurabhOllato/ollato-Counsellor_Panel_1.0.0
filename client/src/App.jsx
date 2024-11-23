import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { UserProvider } from "./context/UserContext.jsx";
import { useAuth } from "./context/UserContext.jsx";

import Registration from "./pages/Registration";
import Login from "./pages/Login";
import ForgotPassword from "./components/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Layout from "./Layout";
import ErrorPage from "./error-page.jsx";
import RegistrationDetails from "./pages/RegistrationDetails.jsx";
function App() {
  // console.log(import.meta.env.VITE_PERSONAL_DELAILS_API);

  // Private route
  const PrivateRoute = ({ children }) => {
    const { user, } = useAuth();
    // console.log("User in private route- before", user);

    if (!user) {
      // console.log("User in private route-middle ", user);

      return <Navigate to="/" replace />;
    }
    // console.log("User in private route- after", user);

    return children; // Render the protected component if authenticated
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
          <Route
            path="/registration-complete"
            element={
              <PrivateRoute>
                <Layout>
                  <RegistrationDetails />
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
