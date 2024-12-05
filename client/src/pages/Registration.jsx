import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { FiEye, FiEyeOff } from "react-icons/fi";
import OtpModal from "../components/OtpModal";
import InputField from "../components/InputField";
import statesAndDistricts from "../../public/states-and-districts.json";
import { useAuth } from "../context/UserContext";
import { useNotification } from "../context/NotificationContext";
import LOGO from "../assets/Ollato_Logo_CC-03.png";

const Registration = () => {
  // State Variables
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    gender: "",
    date_of_birth: "",
    state: "",
    district: "",
    password: "",
    confirm_password: "",
  });

  const [otp, setOtp] = useState("");
  const [otpType, setOtpType] = useState("");
  const [otpModal, setOtpModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);

  const { triggerNotification } = useNotification();
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_APP_API_ENDPOINT_URL;

  // Utility Functions
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    const selectedStateData = statesAndDistricts.states.find(
      (state) => state.state === selectedState
    );

    setFormData((prevData) => ({
      ...prevData,
      state: selectedState,
      district: "", // Reset district when state changes
    }));
    setDistricts(selectedStateData ? selectedStateData.districts : []);
  };

  const handleVerifyEmail = () => {
    if (!formData.email) {
      triggerNotification("Please enter an email address.", "error");
      return;
    }
    sendEmailOtp(formData.email);
    setOtpType("email");
  };

  const handleVerifyPhone = () => {
    if (!formData.phone_number) {
      triggerNotification("Please enter a phone number.", "error");
      return;
    }
    sendPhoneOtp(formData.phone_number);
    setOtpType("phone");
  };

  const sendEmailOtp = async (email) => {
    try {
      const response = await fetch(`${API_URL}/otp/email-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        triggerNotification("OTP sent to your email.", "success");
        setOtpModal(true);
      } else {
        const errorData = await response.json();
        triggerNotification(
          errorData.message || "Failed to send OTP.",
          "error"
        );
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      triggerNotification("Error sending OTP. Please try again.", "error");
    }
  };

  const sendPhoneOtp = async (phoneNumber) => {
    try {
      const response = await fetch(`${API_URL}/otp/mobile-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber }),
      });
      if (response.ok) {
        triggerNotification("OTP sent to your phone.", "success");
        setOtpModal(true);
      } else {
        const errorData = await response.json();
        triggerNotification(
          errorData.message || "Failed to send OTP.",
          "error"
        );
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      triggerNotification("Error sending OTP. Please try again.", "error");
    }
  };

  const handleOtpVerification = async () => {
    if (!otp || otp.length !== 4) {
      triggerNotification("Please enter a valid 4-digit OTP.", "error");
      return;
    }
    setIsVerifying(true);
    const url =
      otpType === "email"
        ? `${API_URL}/otp/verify-email-otp`
        : `${API_URL}/otp/verify-mobile-otp`;

    const payload =
      otpType === "email"
        ? { enteredOtp: otp, email: formData.email }
        : { enteredOtp: otp, phoneNumber: formData.phone_number };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        triggerNotification("OTP verified successfully!", "success");
        setOtpModal(false);
        setOtp("");
        if (otpType === "email") setIsEmailVerified(true);
        else setIsPhoneVerified(true);
      } else {
        const errorData = await response.json();
        triggerNotification(errorData.message || "Invalid OTP.", "error");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      triggerNotification(
        "An error occurred during OTP verification.",
        "error"
      );
    } finally {
      setIsVerifying(false);
    }
  };

  const handlePersonalDetailsSubmit = async (e) => {
    e.preventDefault();
    // const user = JSON.parse(localStorage.getItem("user"));
    // const user_id = user?.user_id || "user123";

    const payload = {
      ...formData,
    };
    // console.log("Payload:", payload);

    try {
      const response = await fetch(`${API_URL}/auth/upload-personal-details`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      // console.log("Response:", response);

      if (response.ok) {
        triggerNotification("Registration successful!", "success");
        navigate("/");
      } else {
        const errorData = await response.json();
        triggerNotification(
          errorData.message || "Registration failed.",
          "error"
        );
      }
    } catch (error) {
      console.error("Error submitting details:", error);
      triggerNotification("An error occurred during registration.", "error");
    }
  };
  // Handle Personal Details Submission
  const handlepersonalDetailsSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.user_id || "user123"; // Replace with dynamic user ID

    const payload = {
      ...formData,
      user_id: userId,
      district: formData.district,
    };

    try {
      const response = await fetch(`${API_URL}/auth/upload-personal-details`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        triggerNotification("Registration successful!", "success");
        navigate("/");
      } else {
        const errorData = await response.json();
        triggerNotification(
          errorData.message || "Registration failed.",
          "error"
        );
      }
    } catch (error) {
      console.error("Error submitting personal details:", error);
      triggerNotification("An error occurred during registration.", "error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Sidebar */}
      <div className="w-full md:w-1/3 bg-[#2C394B] flex items-center justify-center p-8">
        <img src={LOGO} alt="Logo" className="w-1/2 h-auto" />
      </div>
      {/* Form Section */}
      <div className="w-full h-full md:w-2/3 p-6 md:p-8 flex flex-col">
        {/* Header */}
        <div className="bg-white p-8 rounded-lg shadow-lg mx-auto w-full">
          <h1 className="text-2xl text-[#2C394B] font-semibold mb-6 text-center">
            Welcome to Registration
          </h1>

          {/* Form */}
          <form onSubmit={handlePersonalDetailsSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="First Name"
                name="first_name"
                placeholder="Enter your first name"
                value={formData.first_name}
                handleChange={handleChange}
              />
              <InputField
                label="Last Name"
                name="last_name"
                placeholder="Enter your last name"
                value={formData.last_name}
                handleChange={handleChange}
              />
              <InputField
                label="Email"
                name="email"
                placeholder="Enter your email"
                type="email"
                value={formData.email}
                handleChange={handleChange}
                disabled={isEmailVerified}
              />
              <InputField
                label="Phone Number"
                name="phone_number"
                placeholder="Enter your phone number"
                type="text"
                value={formData.phone_number}
                handleChange={handleChange}
                disabled={isPhoneVerified}
              />
              {/* Email Verification */}
              <div>
                <button
                  type="button"
                  onClick={handleVerifyEmail}
                  disabled={isEmailVerified || isVerifying}
                  className="text-[#2C394B] bg-[#f1f5f9] border border-[#2C394B] hover:bg-[#2C394B] hover:text-[#f1f5f9] p-2 rounded"
                >
                  {isEmailVerified ? "Email Verified" : "Verify Email"}
                </button>
              </div>
              {/* Phone Verification */}
              <div>
                <button
                  type="button"
                  onClick={handleVerifyPhone}
                  disabled={isPhoneVerified || isVerifying}
                  className="text-[#2C394B] bg-[#f1f5f9] border border-[#2C394B] hover:bg-[#2C394B] hover:text-[#f1f5f9] p-2 rounded"
                >
                  Verify Phone
                </button>
              </div>
              {/* OTP Modal */}
              {otpModal && (
                <OtpModal
                  otp={otp}
                  setOtp={setOtp}
                  handleOtpVerification={handleOtpVerification}
                  setOtpModal={setOtpModal}
                  isVerifying={isVerifying}
                />
              )}

              <InputField
                label="Gender"
                name="gender"
                value={formData.gender}
                handleChange={handleChange}
                component="select"
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </InputField>
              <InputField
                label="Date of Birth"
                name="date_of_birth"
                value={formData.date_of_birth}
                handleChange={handleChange}
                type="date"
              />
              <InputField
                label="State"
                name="state"
                value={formData.state}
                handleChange={handleStateChange}
                component="select"
              >
                <option value="" disabled>
                  Select State
                </option>
                {statesAndDistricts.states.map((state) => (
                  <option key={state.state} value={state.state}>
                    {state.state}
                  </option>
                ))}
              </InputField>
              <InputField
                label="district"
                name="district"
                value={formData.district}
                handleChange={(e) =>
                  setFormData((prev) => ({ ...prev, district: e.target.value }))
                }
                component="select"
              >
                <option value="" disabled>
                  Select district
                </option>
                {districts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </InputField>
              <div className="relative">
                <InputField
                  label="Password"
                  name="password"
                  placeholder="Enter Password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  handleChange={handleChange}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 cursor-pointer"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </span>
              </div>
              <div className="relative">
                <InputField
                  label="Confirm Password"
                  name="confirm_password"
                  placeholder="Confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirm_password}
                  handleChange={handleChange}
                />
                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-9 cursor-pointer"
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </span>
              </div>
            </div>
            <div>
              <div className="col-span-2 flex justify-center mt-6">
                <button
                  type="submit"
                  className="bg-[#2C394B] text-white py-2 px-6 rounded hover:bg-[#285b45] transition duration-200"
                >
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
        {/* login  */}
        <div className="absolute top-6 right-14 flex justify-center items-center mt-4">
          <p className="text-sm text-[#2C394B]">Already have an account?</p>
          <button
            onClick={() => navigate("/")}
            className="ml-2 text-md text-[#2C394B] hover:text-[#597aac] hover:translate-x-1 transition duration-200 ease-in-out flex items-center gap-1"
          >
            <FaArrowRightFromBracket />
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Registration;
