import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { FiEye, FiEyeOff } from "react-icons/fi";
import OtpModal from "../components/OtpModal";
import InputField from "../components/InputField";
import statesAndDistricts from "../../public/states-and-districts.json";
import { useAuth } from "../context/UserContext";
import LOGO from "../assets/ollatoLogo.png";

const Registration = () => {
  // Single State for Form Data
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    gender: "",
    date_of_birth: "",
    state: "",
    city: "",
    password: "",
    confirm_password: "",
  });

  const [otp, setOtp] = useState("");
  const [otpType, setOtpType] = useState(""); // Tracks OTP type ('email' or 'phone')

  const [otpModal, setOtpModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [districts, setDistricts] = useState([]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);

  const { setProfileComplete } = useAuth();
  const navigate = useNavigate();

  // API URLs
  const apiUrls = {
    sendOtp: {
      email: import.meta.env.VITE_SEND_EMAIL_OTP_API,
      phone: import.meta.env.VITE_SEND_MOBILE_OTP_API,
    },
    verifyOtp: {
      email: import.meta.env.VITE_VERIFY_EMAIL_OTP_API,
      phone: import.meta.env.VITE_VERIFY_MOBILE_OTP_API,
    },
  };
  const personalDetailsURL = import.meta.env.VITE_PERSONAL_DELAILS_API;

  // Utility: Display Messages
  const handleMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  };

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle State Selection
  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    const selectedStateData = statesAndDistricts.states.find(
      (state) => state.state === selectedState
    );

    setFormData((prevData) => ({
      ...prevData,
      state: selectedState,
      city: "", // Reset city when state changes
    }));
    setDistricts(selectedStateData ? selectedStateData.districts : []);
  };

  // Email verification handler
  const handleVerifyEmail = () => {
    if (!formData.email) {
      handleMessage("Please enter an email address.", "error");
      return;
    }
    // sendOtp("email", formData.contactDetails.email);
    sendEmailOtp(formData.email);
    setOtpType("email"); // Track OTP type as email
  };

  // Phone verification handler
  const handleVerifyPhone = () => {
    if (!formData.phone) {
      handleMessage("Please enter a phone number.", "error");
      return;
    }
    // sendOtp("phone", contactDetails.phone);
    sendPhoneOtp(formData.phone); // Send OTP for phone
    setOtpType("phone"); // Track OTP type as phone
  };

  // Function to send OTP for email
  const sendEmailOtp = async (email) => {
    const url = apiUrls.sendOtp.email; // API URL for email OTP
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }), // Send only email
      });

      if (response.ok) {
        handleMessage("OTP sent to your email.", "success");
        setOtpModal(true); // Open the OTP modal
      } else {
        const errorData = await response.json();
        handleMessage(errorData.message || "Failed to send OTP.", "error");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      handleMessage("Error sending OTP. Please try again.", "error");
    }
  };

  // Function to send OTP for phone
  const sendPhoneOtp = async (phoneNumber) => {
    const url = apiUrls.sendOtp.phone; // API URL for phone OTP
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber }), // Send only phone number
      });

      if (response.ok) {
        handleMessage("OTP sent to your phone number.", "success");
        setOtpModal(true); // Open the OTP modal
      } else {
        const errorData = await response.json();
        handleMessage(errorData.message || "Failed to send OTP.", "error");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      handleMessage("Error sending OTP. Please try again.", "error");
    }
  };

  // OTP verification logic for email
  const handleVerifyEmailOtp = async () => {
    if (!otp || otp.length !== 4) {
      handleMessage("Please enter a valid 4-digit OTP.", "error");
      return;
    }
    setIsVerifying(true); // Show verifying state
    try {
      const url = apiUrls.verifyOtp.email; // API URL for verifying email OTP
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          enteredOtp: otp,
          email: formData.contactDetails.email,
        }), // Send OTP and email to backend
      });

      if (response.ok) {
        handleMessage("OTP verified successfully!", "success");
        setOtpModal(false); // Close the modal
        setOtp(""); // Clear OTP input
        completeStep(); // Proceed to next step
      } else {
        const errorData = await response.json();
        handleMessage(
          errorData.message || "Invalid OTP. Please try again.",
          "error"
        );
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      handleMessage(
        "An error occurred during OTP verification. Please try again.",
        "error"
      );
    } finally {
      setIsVerifying(false); // Reset verifying state
    }
  };

  // OTP verification logic for phone
  const handleVerifyPhoneOtp = async () => {
    if (!otp || otp.length !== 4) {
      handleMessage("Please enter a valid 4-digit OTP.", "error");
      return;
    }

    setIsVerifying(true); // Show verifying state
    try {
      const url = apiUrls.verifyOtp.phone; // API URL for verifying phone OTP
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          enteredOtp: otp,
          phoneNumber: formData.contactDetails.phone_number,
        }), // Send OTP and phone to backend
      });

      if (response.ok) {
        handleMessage("OTP verified successfully!", "success");
        setOtpModal(false); // Close the modal
        setOtp(""); // Clear OTP input
        completeStep(); // Proceed to next step
      } else {
        const errorData = await response.json();
        handleMessage(
          errorData.message || "Invalid OTP. Please try again.",
          "error"
        );
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      handleMessage(
        "An error occurred during OTP verification. Please try again.",
        "error"
      );
    } finally {
      setIsVerifying(false); // Reset verifying state
    }
  };

  const handleOtpVerification = async () => {
    if (!otp || otp.length !== 4) {
      handleMessage("Please enter a valid 4-digit OTP.", "error");
      return;
    }

    setIsVerifying(true); // Show verifying state
    try {
      const url =
        otpType === "email" ? apiUrls.verifyOtp.email : apiUrls.verifyOtp.phone;
      const payload =
        otpType === "email"
          ? { enteredOtp: otp, email: formData.email }
          : { enteredOtp: otp, phoneNumber: formData.phone_number };

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload), // Send OTP and email/phone to backend
      });

      if (response.ok) {
        handleMessage("OTP verified successfully!", "success");
        setOtpModal(false); // Close OTP modal
        setOtp(""); // Clear OTP input

        // Update verification status
        if (otpType === "email") {
          setIsEmailVerified(true);
        } else {
          setIsPhoneVerified(true);
        }
      } else {
        const errorData = await response.json();
        handleMessage(
          errorData.message || "Invalid OTP. Please try again.",
          "error"
        );
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      handleMessage(
        "An error occurred during OTP verification. Please try again.",
        "error"
      );
    } finally {
      setIsVerifying(false); // Reset verifying state
    }
  };

  // // Handle OTP Verification
  // const handleOtpVerification = async () => {
  //   if (!otp || otp.length !== 4)
  //     return handleMessage("Please enter a valid 4-digit OTP.", "error");

  //   const url =
  //     otpType === "email" ? apiUrls.verifyOtp.email : apiUrls.verifyOtp.phone;
  //   const payload =
  //     otpType === "email"
  //       ? { enteredOtp: otp, email: formData.email }
  //       : { enteredOtp: otp, phone: formData.phone_number };

  //   try {
  //     const response = await fetch(url, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(payload),
  //     });

  //     if (response.ok) {
  //       handleMessage("OTP verified successfully!", "success");
  //       setOtpModal(false);
  //       setOtp(""); // Clear OTP input
  //     } else {
  //       const errorData = await response.json();
  //       handleMessage(
  //         errorData.message || "Invalid OTP. Please try again.",
  //         "error"
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Error verifying OTP:", error);
  //     handleMessage("An error occurred during verification.", "error");
  //   }
  // };
  const handlepersonalDetailsSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.user_id;
    console.log("User ID:", userId);
    // Flatten the form data
    const payload = {
      user_id: "user123", // Replace with dynamic user ID
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      phone_number: formData.phone_number,
      gender: formData.gender,
      date_of_birth: formData.date_of_birth,
      state: formData.state,
      district: formData.city,
      password: formData.password,
      confirm_password: formData.confirm_password,
    };

    console.log("personal details - payload", payload);

    try {
      const response = await fetch(personalDetailsURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        handleMessage("Registration successful!", "success");
        setProfileComplete(true);
        navigate("/");
      } else {
        const errorData = await response.json();
        handleMessage(errorData.message || "Registration failed.", "error");
      }
    } catch (error) {
      console.error("Error submitting personal details:", error);
      handleMessage("An error occurred during registration.", "error");
    }
    console.log("Personal details submitted:", formData);
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
          {/* Message */}
          {message.text && (
            <div
              className={`py-4 px-6 mb-4 rounded ${
                message.type === "success"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {message.text}
            </div>
          )}
          {/* Form */}
          <form onSubmit={handlepersonalDetailsSubmit}>
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
                label="City"
                name="city"
                value={formData.city}
                handleChange={(e) =>
                  setFormData((prev) => ({ ...prev, city: e.target.value }))
                }
                component="select"
              >
                <option value="" disabled>
                  Select City
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
              <button
                type="submit"
                className="w-fit mx-auto bg-[#2C394B] text-white py-2 rounded-md mt-4"
              >
                Register
              </button>
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
