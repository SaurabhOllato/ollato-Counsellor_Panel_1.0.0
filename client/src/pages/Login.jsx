import React, { useState } from "react";
import LOGO from "../assets/ollatoLogo.png";
import { useNavigate } from "react-router-dom";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

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
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); // To capture success messages
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null); // Clear previous success message

    if (showOtpLogin) {
      await handleVerifyOtp(); // Handle OTP verification
    } else {
      try {
        const response = await fetch("/api/login", {
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
          setSuccessMessage("Login successful! Redirecting..."); // Set success message
          navigate("/dashboard"); // Redirect to dashboard after message
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Invalid login credentials.");
        }
      } catch (error) {
        setError("An error occurred while logging in.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSendOtp = async () => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null); // Clear previous success message

    // try {
    //   const response = await fetch("/api/send-otp", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ phoneNumber: formData.phoneNumber }),
    //   });

    //   if (response.ok) {
    //     setOtpSent(true);
    //     setSuccessMessage("OTP sent to your phone number."); // Set success message
    //   } else {
    //     const errorData = await response.json();
    //     setError(errorData.message || "Failed to send OTP.");
    //   }
    // } catch (error) {
    //   setError("An error occurred while sending OTP.");
    // } finally {
    //   setLoading(false);
    // }

    if (formData.phoneNumber.length === 10) {
      setOtpSent(true);
      setSuccessMessage("OTP sent to your phone number."); // Set success message
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null); // Clear previous success message

    // try {
    //   const response = await fetch("/api/verify-otp", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       phoneNumber: formData.phoneNumber,
    //       otp: formData.otp,
    //     }),
    //   });

    //   if (response.ok) {
    //     setSuccessMessage("Login successful! Redirecting..."); // Set success message
    //     navigate("/dashboard"); // Redirect to dashboard
    //   } else {
    //     const errorData = await response.json();
    //     setError(errorData.message || "Invalid OTP.");
    //   }
    // } catch (error) {
    //   setError("An error occurred while verifying OTP.");
    // } finally {
    //   setLoading(false);
    // }

    if (formData.otp === "123456") {
      navigate("/dashboard");
    }
  };

  const toggleLoginMethod = () => {
    setShowOtpLogin(!showOtpLogin);
    setOtpSent(false);
    setFormData({ email: "", password: "", phoneNumber: "", otp: "" });
    setError(null);
    setSuccessMessage(null); // Clear message on toggle
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

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
          {/* Error message */}
          {error && (
            <div className="text-[#c93434] text-center mt-4 border border-[#c93434] mb-6 p-2 rounded shadow-lg bg-[#f6f6f6]">
              {error}
            </div>
          )}
          {/* Success message */}
          {successMessage && (
            <div className="text-[#2c7525] text-center mt-4 border border-[#2c7525] mb-6 p-2 rounded shadow-lg bg-[#f6f6f6]">
              {successMessage}
            </div>
          )}

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
                    } w-fit md:w-1/3`}
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
