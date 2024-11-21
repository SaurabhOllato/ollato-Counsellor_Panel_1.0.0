import React, { useState } from "react";
import LOGO from "../assets/ollatoLogo.png";
import { useNavigate } from "react-router-dom";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Notification from "../components/Notification/Notification";
import { useAuth } from "../context/UserContext.jsx";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phoneNumber: "",
    otp: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showOtpLogin, setShowOtpLogin] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const [notification, setNotification] = useState({ message: "", type: "" });

  const login_Url = import.meta.env.VITE_LOGIN_API;
  const send_mobile_otp_Url = import.meta.env.VITE_SEND_MOBILE_OTP_API;
  const verify_mobile_otp_Url = import.meta.env.VITE_VERIFY_MOBILE_OTP_API;

  const { login } = useAuth(); // Access context login function
  const navigate = useNavigate();

  // Trigger a notification
  const triggerNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 3000);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Email/Password Login
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (showOtpLogin) return; // Prevent form submission if in OTP login mode

    setLoading(true);
    try {
      const response = await fetch(login_Url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        login(data.user); // Save user in context
        triggerNotification("Login successful! Redirecting...", "success");
        navigate("/dashboard");
      } else {
        const errorData = await response.json();
        triggerNotification(
          errorData.message || "Invalid login credentials.",
          "error"
        );
      }
    } catch (error) {
      triggerNotification(
        "An error occurred during login. Please try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  // Send OTP
  const handleSendOtp = async () => {
    setLoading(true);
    try {
      if (!/^\d{10}$/.test(formData.phoneNumber)) {
        triggerNotification("Invalid phone number.", "error");
        return;
      }

      const response = await fetch(send_mobile_otp_Url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: formData.phoneNumber }),
      });

      if (response.ok) {
        setOtpSent(true);
        triggerNotification("OTP sent to your phone number.", "success");
      } else {
        const errorData = await response.json();
        triggerNotification(
          errorData.message || "Failed to send OTP.",
          "error"
        );
      }
    } catch (error) {
      triggerNotification(
        "An error occurred while sending OTP. Please try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const response = await fetch(verify_mobile_otp_Url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber: formData.phoneNumber,
          otp: formData.otp,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        login(data.user); // Save user in context
        triggerNotification("Login successful! Redirecting...", "success");
        navigate("/dashboard");
      } else {
        const errorData = await response.json();
        triggerNotification(errorData.message || "Invalid OTP.", "error");
      }
    } catch (error) {
      triggerNotification(
        "An error occurred during OTP verification. Please try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  // Toggle between email/password login and OTP login
  const toggleLoginMethod = () => {
    setShowOtpLogin((prev) => !prev);
    setOtpSent(false);
    setFormData({ email: "", password: "", phoneNumber: "", otp: "" });
  };

  const handleForgotPassword = () => navigate("/forgot-password");

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 h-full">
      <div className="w-full md:w-1/3 bg-[#2C394B] flex items-center justify-center p-8">
        <img src={LOGO} alt="Logo" className="w-1/2 md:w-3/4 h-auto" />
      </div>

      <div className="w-full md:w-2/3 p-8 mt-20 h-full">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
          <h1 className="text-2xl text-[#2C394B] font-semibold mb-6 text-center">
            {showOtpLogin ? "Login with OTP" : "Welcome Back"}
          </h1>
          <Notification
            message={notification.message}
            type={notification.type}
          />
          <form onSubmit={handleSubmit}>
            {showOtpLogin ? (
              <>
                <div className="mb-4">
                  <label className="block text-gray-600">Phone Number *</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Enter your phone number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                {otpSent && (
                  <div className="mb-4">
                    <label className="block text-gray-600">Enter OTP *</label>
                    <input
                      type="text"
                      name="otp"
                      placeholder="Enter OTP sent to your phone"
                      value={formData.otp}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                )}
                {/* OTP login buttons */}
                <div className="mt-4 flex justify-center">
                  <button
                    type="button"
                    onClick={otpSent ? handleVerifyOtp : handleSendOtp}
                    className={`w-1/2 bg-[#2C394B] text-white p-2 rounded-md ${
                      loading ? "opacity-50" : ""
                    }`}
                    disabled={loading || (!otpSent && !formData.phoneNumber)}
                  >
                    {loading
                      ? "Processing..."
                      : otpSent
                      ? "Verify OTP"
                      : "Send OTP"}
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="mb-4">
                  <label className="block text-gray-600">Email *</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4 relative">
                  <label className="block text-gray-600">Password *</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-9 cursor-pointer text-gray-500"
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible />
                    ) : (
                      <AiOutlineEye />
                    )}
                  </span>
                </div>
                <div className="mt-1">
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-[#2C394B] underline hover:translate-x-1 transition duration-200 ease-in-out"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="mt-4 flex justify-center">
                  <button
                    type="submit"
                    className={`w-1/4 bg-[#2C394B] text-white p-2 rounded-md ${
                      loading ? "opacity-50" : ""
                    }`}
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </button>
                </div>
              </>
            )}
          </form>
          <div className="mt-6 text-center">
            <button
              className="text-[#2C394B] underline hover:translate-x-1 transition duration-200 ease-in-out hover:text-[#2d3f5a]"
              onClick={toggleLoginMethod}
            >
              {showOtpLogin ? "Back to Email Login" : "Login with OTP"}
            </button>
          </div>
          <div className="mt-4 text-center flex justify-center sm:text-sm md:text-base">
            <p className="text-gray-600">Don't have an account?</p>
            <button
              className="ml-2 text-md text-[#2C394B] hover:text-[#597aac] hover:translate-x-1 transition duration-200 ease-in-out flex items-center gap-1"
              onClick={() => navigate("/registration")}
            >
              <FaArrowRightFromBracket />
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
