import React, { useState } from "react";
import LOGO from "../assets/ollatoLogo.png";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import Notification from "./Notification/Notification";

function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false); // Set otpSent to true initially
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const [error, setError] = useState(null);
  // const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const [notification, settNotification] = useState({ message: "", type: "" });

  const triggerNotification = (message, type) => {
    settNotification({ message, type });
    setTimeout(() => settNotification({ message: "", type: "" }), 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    // setError(null);

    // try {
    //   const response = await fetch("/api/send-otp", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ email: formData.email }),
    //   });

    //   if (response.ok) {
    //     setOtpSent(true);
    //     setSuccessMessage("OTP sent to your email.");
    //      triggerNotification("OTP sent to your email.", "success");
    //   } else {
    //     const errorData = await response.json();
    //     setError(errorData.message || "Failed to send OTP.");
    //  triggerNotification("OTP sent to your email.", "error");
    //   }
    // } catch (error) {
    //   setError("An error occurred while sending OTP.");
    // } finally {
    //   setLoading(false);
    // }
    setOtpSent(true);
    // setSuccessMessage("OTP sent to your email.");
    triggerNotification("OTP sent to your email.", "success");
  };

  const handleVerifyOtpAndUpdatePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    // setError(null);

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    // try {
    //   const response = await fetch("/api/reset-password", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       email: formData.email,
    //       otp: formData.otp,
    //       newPassword: formData.newPassword,
    //     }),
    //   });

    //   if (response.ok) {
    //     setSuccessMessage(
    //       "Password updated successfully! Redirecting to login..."
    //     );
    //     setTimeout(() => {
    //       navigate("/login");
    //     }, 3000);
    //   } else {
    //     const errorData = await response.json();
    //     setError(errorData.message || "Failed to reset password.");
    //   }
    // } catch (error) {
    //   setError("An error occurred while resetting the password.");
    // } finally {
    //   setLoading(false);
    // }

    // setSuccessMessage("Password updated successfully! Redirecting to login...");
    triggerNotification(
      "Password updated successfully! Redirecting to login...",
      "success"
    );
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 h-full">
      <div className="w-full md:w-1/3 bg-[#2C394B] flex items-center justify-center p-8">
        <img src={LOGO} alt="Logo" className="w-1/2 md:w-3/4 h-auto" />
      </div>

      <div className="w-full md:w-2/3 p-8 mt-20 h-full">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
          <h1 className="text-2xl text-[#2C394B] font-semibold mb-6 text-center">
            Forgot Password
          </h1>

          <Notification
            message={notification.message}
            type={notification.type}
          />
          {/* {successMessage && (
            <div className="text-[#267c47] text-center mb-4">
              {successMessage}
            </div>
          )}

          {error && (
            <div className="text-[#cf3f3f] text-center mb-4">{error}</div>
          )} */}

          {/* Conditional rendering based on OTP sent */}
          {otpSent ? (
            <form onSubmit={handleVerifyOtpAndUpdatePassword}>
              <div className="mb-4">
                <label className="block text-gray-600">Enter OTP *</label>
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter OTP sent to your email"
                  value={formData.otp}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="mb-4 relative">
                <label className="block text-gray-600">New Password *</label>
                <input
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  placeholder="Create a new password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
                <span
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-9 cursor-pointer text-gray-500"
                >
                  {showNewPassword ? (
                    <AiOutlineEyeInvisible />
                  ) : (
                    <AiOutlineEye />
                  )}
                </span>
              </div>

              <div className="mb-4 relative">
                <label className="block text-gray-600">
                  Confirm New Password *
                </label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm your new password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-9 cursor-pointer text-gray-500"
                >
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible />
                  ) : (
                    <AiOutlineEye />
                  )}
                </span>
              </div>

              <div className="mt-4 flex justify-center">
                <button
                  type="submit"
                  className={`w-1/2 bg-[#2C394B] text-white p-2 rounded-md ${
                    loading ? "opacity-50" : ""
                  }`}
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Reset Password"}
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSendOtp}>
              <div className="mb-4">
                <label className="block text-gray-600">Email *</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="mt-4 flex justify-center">
                <button
                  type="submit"
                  className={`w-1/2 bg-[#2C394B] text-white p-2 rounded-md ${
                    loading ? "opacity-50" : ""
                  }`}
                  disabled={loading}
                >
                  {loading ? "Sending OTP..." : "Send OTP"}
                </button>
              </div>

              <div className="absolute top-6 right-14 flex justify-center items-center mt-4">
                <p className="text-sm text-[#2C394B]">Back to Login?</p>
                <button
                  className="ml-2 text-md text-[#2C394B] hover:text-[#597aac] hover:translate-x-1 transition duration-200 ease-in-out flex items-center gap-1"
                  onClick={() => navigate("/")}
                >
                  <FaArrowRightFromBracket />
                  Login
                </button>
              </div>
            </form>
          )}
          {/* Login Link */}
          <div className="absolute top-6 right-14 flex justify-center items-center mt-4">
            <p className="text-sm text-[#2C394B]">Back to Login?</p>
            <button
              className="ml-2 text-md text-[#2C394B] hover:text-[#597aac] hover:translate-x-1 transition duration-200 ease-in-out flex items-center gap-1"
              onClick={() => navigate("/")}
            >
              <FaArrowRightFromBracket />
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
