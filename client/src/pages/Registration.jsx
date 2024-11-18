import React, { useState } from "react";
import LOGO from "../assets/ollatoLogo.png";
import { useNavigate } from "react-router-dom";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { FiEye, FiEyeOff } from "react-icons/fi";
import statesAndDistricts from "../../public/states-and-districts.json";

const Registration = () => {
  const [personalDetails, setPersonalDetails] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    birthDate: "",
  });

  const [contactDetails, setContactDetails] = useState({
    email: "",
    phone: "",
    state: "",
    city: "",
  });

  const [accountDetails, setAccountDetails] = useState({
    password: "",
    confirmPassword: "",
  });

  // const [educationDetails, setEducationDetails] = useState({
  //   licenseNumber: "",
  //   qualification: "",
  //   specialization: "",
  //   experience: "",
  //   institutionName: "",
  // });

  // const [documentation, setDocumentation] = useState({
  //   degreeCertificate: null,
  //   resume: null,
  //   aadharNumber: "",
  //   aadharFront: null,
  //   aadharBack: null,
  //   panNumber: "",
  //   panCard: null,
  //   signature: null,
  //   expertise: {
  //     careerCounsellor: false,
  //     psychologist: false,
  //     groupCounsellor: false,
  //   },
  // });

  const [formData, setFormData] = useState({
    personalDetails: personalDetails,
    contactDetails: contactDetails,
    accountDetails: accountDetails,
  });

  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpModal, setOtpModal] = useState(false);
  // const [notification, setNotification] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" }); // New consolidated message state

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [isVerifying, setIsVerifying] = useState(false);

  const navigate = useNavigate();
  const apiBaseUrl = "https://example.com/api"; // Base URL for API

  const handlemessage = (text, type) => {
    setMessage({ text, type }); // Update message state with text and type
    setTimeout(() => {
      setMessage({ text: "", type: "" }); // Reset message state after 3 seconds
    }, 3000);
  };

  // const handleChange = (e) => {
  //   const { name, type, checked, value } = e.target;

  //   setFormData({
  //     ...formData,
  //     [name]: type === "checkbox" ? checked : value,
  //   });
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Split the nested key (e.g., "personalDetails.firstName")
    const keys = name.split(".");

    // Use a functional state update to handle immutability
    setFormData((prevState) => {
      let newState = { ...prevState };
      let current = newState;

      // Navigate to the nested key
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }

      // Update the value at the nested key
      current[keys[keys.length - 1]] = value;

      return newState;
    });
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;

    // Find the selected state's data
    const selectedStateData = statesAndDistricts.states.find(
      (s) => s.state === selectedState
    );

    // Update the formData with the selected state and clear the district (city)
    setFormData((prevData) => ({
      ...prevData,
      contactDetails: {
        ...prevData.contactDetails,
        state: selectedState,
        city: "", // Clear city (district) when state changes
      },
    }));

    // Update the districts based on the selected state
    setDistricts(selectedStateData ? selectedStateData.districts : []);
  };

  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;

    // console.log("Selected District:", selectedDistrict);

    // Update the formData with the selected district (city)
    setFormData((prevData) => ({
      ...prevData,
      contactDetails: {
        ...prevData.contactDetails,
        city: selectedDistrict, // Ensure city (district) is set correctly
      },
    }));
  };

  // const handleFileChange = (e) => {
  //   const { name, files } = e.target;
  //   setFormData((prev) => ({
  //     ...prev.documentation,
  //     [name]: files[0],
  //   }));
  // };

  // const handleNext = () => {
  //   if (step < 3) setStep(step + 1);
  // };

  const handleVerifyEmail = () => {
    if (!contactDetails.email) {
      // setNotification("Please enter an email address.");
      handlemessage("Please enter an email address.", "error");
      return;
    }
    sendOtp("email");
    // setOtpModal(true);
  };

  const handleVerifyPhone = () => {
    if (!contactDetails.phone) {
      // setNotification("Please enter a phone number.");
      handlemessage("Please enter a phone number.", "error");
      return;
    }
    sendOtp("phone");
    // setOtpModal(true);
  };

  const sendOtp = async (type) => {
    // try {
    //   const response = await fetch(`${apiBaseUrl}/send-otp`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ type }), // Pass the type to the API (either "email" or "phone") *** change accordingly ***
    //   });
    //   if (response.ok) {
    //     setOtpField(type);
    //     setNotification("OTP sent successfully!");
    //     setOtpModal(true);
    //   } else {
    //     throw new Error("Failed to send OTP");
    //   }
    // } catch (error) {
    //   console.error("Error sending OTP:", error);
    //   setNotification("Error sending OTP. Please try again.");
    // }
    // mockOTP sending
    // setNotification("OTP sent successfully!");
    handlemessage("OTP sent successfully!", "success");
    setOtpModal(true);
  };

  // const verifyOtp = async (type) => {
  //   // try {
  //   //   const response = await fetch(`${apiBaseUrl}/verify-otp`, {
  //   //     method: "POST",
  //   //     headers: { "Content-Type": "application/json" },
  //   //     body: JSON.stringify({ type: otpField, otp }), // Pass the type and OTP to the API (both "email" or "phone" and the entered OTP) *** change accordingly ***
  //   //   });
  //   //   if (response.ok) {
  //   //     if (otpField === "email") {
  //   //       setEmailOtpVerified(true);
  //   //       setNotification("Email OTP Verified Successfully!");
  //   //     } else if (otpField === "phone") {
  //   //       setPhoneOtpVerified(true);
  //   //       setNotification("Phone OTP Verified Successfully!");
  //   //     }
  //   //     setOtp(""); // Clear the OTP field
  //   //     setOtpModal(false);
  //   //   } else {
  //   //     setNotification("Invalid OTP. Please try again.");
  //   //     throw new Error("Invalid OTP");
  //   //   }
  //   // } catch (error) {
  //   //   console.error("Error verifying OTP:", error);
  //   //   setNotification("Error verifying OTP. Please try again.");
  //   // }
  // };

  const handleOtpVerification = async () => {
    setNotification(""); // Clear any previous notification before starting
    if (!otp || otp.length !== 6) {
      // OTP validation
      // setNotification("Please enter a valid 6-digit OTP.");
      handlemessage("Please enter a valid 6-digit OTP.", "error");
      return;
    }
    setIsVerifying(true); // Set isVerifying to true

    // Simulate OTP check (for testing purposes, this is a mock check)
    const isOtpValid = otp === "123456"; // Replace with real OTP validation logic

    if (isOtpValid) {
      //OTP is valid
      // setNotification("OTP verified successfully!");
      handlemessage("OTP verified successfully!", "success");
      handleOtpVerificationSuccess(); // Call the success function
    } else {
      // OTP is invalid
      // setNotification("Invalid OTP. Please try again.");
      handlemessage("Invalid OTP. Please try again.", "error");
    }
    setIsVerifying(false); // Reset verifying state
  };

  const handleOtpVerificationSuccess = () => {
    setOtpModal(false);

    if (otpField === "email") {
      setEmailOtpVerified(true);
      setEmailVerified(true);
      // setNotification("Email OTP Verified Successfully!");
      handlemessage("Email OTP Verified Successfully!", "success");
    } else if (otpField === "phone") {
      setPhoneOtpVerified(true);
      setPhoneVerified(true);
      // setNotification("Phone OTP Verified Successfully!");
      handlemessage("Phone OTP Verified Successfully!", "success");
    }

    setOtpVerified(true); // Mark OTP as verified
    setOtpModal(false); // Close OTP modal
    setOtp(""); // Clear OTP input
    verifyOtp(otpField); // Call verifyOtp function with the OTP field type (email or phone)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setNotification("");
    setMessage({ text: "", type: "" });
    // setError(null);

    // Validation: Check for required fields
    const {
      personalDetails: { firstName, lastName, gender, birthDate },
      contactDetails: { email, state, city, phone },
      accountDetails: { password, confirmPassword },
    } = formData;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !gender ||
      !birthDate ||
      !state ||
      !city ||
      !phone ||
      !password ||
      !confirmPassword
    ) {
      // setError("Please fill in all required fields");
      handlemessage("Please fill in all required fields", "error");
      return;
    }
    // Password Match Validation
    if (password !== confirmPassword) {
      // setError("Passwords don't match!");
      handlemessage("Passwords don't match!", "error");
      return;
    }

    setLoading(true);

    // try {
    //   // API Integration
    //   const response = await fetch("/api/register", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(formData),
    //   });

    //   if (response.ok) {
    //     const data = await response.json();
    //     setNotification("Registration successful!");
    //     console.log("Response Data:", data);

    //     // Redirect to another page after success
    //     setTimeout(() => navigate("/"), 3000);
    //   } else {
    //     const errorData = await response.json();
    //     setError(errorData.message || "Registration failed.");
    //   }
    // } catch (error) {
    //   console.error("Error during registration:", error);
    //   setError("An error occurred during registration.");
    // } finally {
    //   setLoading(false);
    // }

    // Mock API Response
    setTimeout(() => {
      setLoading(false);
      handlemessage("Registration successful!", "success");

      navigate("/");
    }, 3000);

    console.log("Registration data:", formData);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 overflow-y-auto">
      {/* Left side logo */}
      <div className="w-full md:w-1/3 bg-[#2C394B] flex items-center justify-center p-8">
        <img src={LOGO} alt="Logo" className="w-1/2 h-auto" />
      </div>

      {/* Right side form */}
      <div className="w-full h-full md:w-2/3 p-6 md:p-8 flex flex-col overflow-y-auto">
        <div className="bg-white p-8 rounded-lg shadow-lg mx-auto w-full">
          <h1 className="text-2xl text-[#2C394B] font-semibold mb-6 text-center">
            Welcome to Registration
          </h1>

          {/* {notification && (
            <div className="text-[#25852a] text-center mb-4">
              {notification}
            </div>
          )}
          {error && (
            <div className="text-[#b13e31] text-center mb-4">{error}</div>
          )} */}

          {/* {notification  */}
          {/* {notification && (
            <div className="py-4 bg-[#C4F9E2] text-[#004434] rounded-md flex items-center justify-center text-sm font-medium">
              <span className="pr-3">
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx={10} cy={10} r={10} fill="#00B078" />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14.1203 6.78954C14.3865 7.05581 14.3865 7.48751 14.1203 7.75378L9.12026 12.7538C8.85399 13.02 8.42229 13.02 8.15602 12.7538L5.88329 10.4811C5.61703 10.2148 5.61703 9.78308 5.88329 9.51682C6.14956 9.25055 6.58126 9.25055 6.84753 9.51682L8.63814 11.3074L13.156 6.78954C13.4223 6.52328 13.854 6.52328 14.1203 6.78954Z"
                    fill="white"
                  />
                </svg>
              </span>
              {notification}
            </div>
          )} */}

          {/* error */}

          {/* {error && (
            <div className="py-4 bg-[#F8D7DA] text-[#721C24] rounded-md flex items-center justify-center text-sm font-medium">
              <span className="pr-3">
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx={10} cy={10} r={10} fill="#D9534F" />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14.1203 6.78954C14.3865 7.05581 14.3865 7.48751 14.1203 7.75378L9.12026 12.7538C8.85399 13.02 8.42229 13.02 8.15602 12.7538L5.88329 10.4811C5.61703 10.2148 5.61703 9.78308 5.88329 9.51682C6.14956 9.25055 6.58126 9.25055 6.84753 9.51682L8.63814 11.3074L13.156 6.78954C13.4223 6.52328 13.854 6.52328 14.1203 6.78954Z"
                    fill="white"
                  />
                </svg>
              </span>
              {error}
            </div>
          )} */}

          {/*  */}
          {message.text && (
            <div
              className={`fixed top-24 left-2/3 w-fit transform -translate-x-1/2 z-10 py-4 rounded-md flex items-center justify-center text-md font-medium ${
                message.type === "success"
                  ? "bg-[#C4F9E2] text-[#004434]"
                  : "bg-[#F8D7DA] text-[#721C24]"
              }`}
            >
              <span className="pr-3">
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx={10}
                    cy={10}
                    r={10}
                    fill={message.type === "success" ? "#00B078" : "#D9534F"}
                  />

                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M14.1203 6.78954C14.3865 7.05581 14.3865 7.48751 14.1203 7.75378L9.12026 12.7538C8.85399 13.02 8.42229 13.02 8.15602 12.7538L5.88329 10.4811C5.61703 10.2148 5.61703 9.78308 5.88329 9.51682C6.14956 9.25055 6.58126 9.25055 6.84753 9.51682L8.63814 11.3074L13.156 6.78954C13.4223 6.52328 13.854 6.52328 14.1203 6.78954Z"
                    fill="white"
                  />
                </svg>
              </span>

              {message.text}
            </div>
          )}

          {/* Step Header */}
          <div className="flex justify-between mb-4 flex-wrap">
            {["Personal Details"].map((title, index) => (
              <span
                key={index}
                className={`cursor-pointer ${
                  step === index + 1 ? "text-[#2C394B]" : "text-gray-400"
                } font-semibold`}
                onClick={() => setStep(index + 1)}
              >
                {title}
              </span>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Personal Details */}
            {step === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First Name */}
                <InputField
                  label="First Name"
                  name="personalDetails.firstName"
                  placeholder="Enter your first name"
                  value={personalDetails.firstName}
                  handleChange={handleChange}
                />
                {/* Last Name */}
                <InputField
                  label="Last Name"
                  name="personalDetails.lastName"
                  placeholder="Enter your last name"
                  value={personalDetails.lastName}
                  handleChange={handleChange}
                />
                {/* Email */}
                <InputField
                  label="Email"
                  name="contactDetails.email"
                  placeholder="Enter your email"
                  type="email"
                  value={formData.contactDetails.email}
                  handleChange={handleChange}
                />
                {/* Phone */}
                <InputField
                  label="Phone"
                  name="contactDetails.phone"
                  placeholder="Enter your phone number"
                  type="text"
                  value={formData.contactDetails.phone}
                  handleChange={handleChange}
                />
                <div>
                  {/* Verify Email Button */}
                  <button
                    type="button"
                    onClick={handleVerifyEmail}
                    disabled={isVerifying} // Disable button if email is not entered
                    className="text-[#2C394B] bg-[#f1f5f9] border border-[#2C394B] hover:bg-[#2C394B] hover:text-[#f1f5f9] p-2 rounded"
                  >
                    Verify Email
                  </button>
                </div>

                <div>
                  {/* Verify Phone Button */}
                  <button
                    type="button"
                    onClick={handleVerifyPhone}
                    disabled={isVerifying} // Disable button if phone is not entered
                    className="text-[#2C394B] bg-[#f1f5f9] border border-[#2C394B] hover:bg-[#2C394B] hover:text-[#f1f5f9] p-2 rounded"
                  >
                    Verify Phone
                  </button>
                </div>

                {/* OTP Modal */}
                {otpModal && (
                  <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded-md shadow-lg w-11/12 md:w-1/3">
                      <h3 className="text-xl text-center mb-4">Enter OTP</h3>
                      <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md mb-4"
                        aria-label="OTP Input field"
                        maxLength={6}
                      />
                      <button
                        type="button"
                        onClick={handleOtpVerification}
                        className="w-full bg-[#337357] text-white py-2 rounded-md"
                        disabled={!isVerifying}
                      >
                        {isVerifying ? "Verifying..." : "Verify OTP"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          sendOtp("");
                          setOtpModal(false);
                        }}
                        className="w-full bg-[#C62E2E] text-white py-2 rounded-md mt-2"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}

                {/* Gender */}
                <InputField
                  label="Gender"
                  name="personalDetails.gender"
                  value={personalDetails.gender}
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
                {/* Date of Birth */}
                <InputField
                  label="Date of Birth"
                  name="personalDetails.birthDate"
                  value={personalDetails.birthDate}
                  handleChange={handleChange}
                  component="input"
                  type="date"
                />
                {/* State Dropdown */}
                <InputField
                  label="State"
                  name="contactDetails.state"
                  value={formData.contactDetails.state}
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
                {/* District Dropdown */}
                <InputField
                  label="District"
                  name="contactDetails.city"
                  value={formData.contactDetails.city}
                  handleChange={handleDistrictChange}
                  component="select"
                >
                  <option value="" disabled>
                    Select City
                  </option>
                  {districts.length > 0 &&
                    districts.map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                </InputField>

                {/* Password Field */}
                <InputField
                  label="Password *"
                  name="accountDetails.password"
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  value={accountDetails.password}
                  handleChange={handleChange}
                  className="relative"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-5 cursor-pointer"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </span>

                {/* Confirm Password Field */}
                <InputField
                  label="Confirm Password *"
                  name="accountDetails.confirmPassword"
                  placeholder="Confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.accountDetails.confirmPassword}
                  handleChange={handleChange}
                />
                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-5 cursor-pointer"
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </span>
              </div>
            )}

            {/* Register Button */}
            <div className="mt-4 flex justify-center">
              <button
                type="submit"
                className="bg-[#2C394B] text-white py-2 px-4 rounded-md"
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </div>
          </form>
          {/* Login Link */}
          <div className="absolute top-6 right-14 flex justify-center items-center mt-4">
            <p className="text-sm text-[#2C394B]">Already have an account?</p>
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
};

const InputField = ({
  label,
  type = "text",
  name,
  placeholder,
  handleChange,
  value,
  options = [],
  component = "input",
  ...props
}) => {
  return (
    <div className="mb-4 flex flex-col">
      <label htmlFor={name} className="block text-[#2C394B]">
        {label}
        {props.required && "*"}
      </label>
      {type === "checkbox" && options.length > 0 ? (
        <div className="flex flex-col">
          {options.map((option, index) => (
            <label key={index} className="inline-flex items-center mt-1">
              <input
                type="checkbox"
                name={name}
                value={option}
                onChange={handleChange}
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>
      ) : (
        React.createElement(component, {
          id: name,
          type,
          name,
          placeholder,
          value,
          onChange: handleChange,
          className: "w-full p-2 border border-gray-300 rounded-md",
          ...props,
        })
      )}
    </div>
  );
};

export default Registration;
