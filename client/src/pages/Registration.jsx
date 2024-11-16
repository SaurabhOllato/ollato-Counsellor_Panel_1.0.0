import React, { useState } from "react";
import LOGO from "../assets/ollatoLogo.png";
import { useNavigate } from "react-router-dom";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { FiEye, FiEyeOff } from "react-icons/fi";
import statesAndDistricts from "../../public/states-and-districts.json";

const Registration = () => {
  const [personalDetails, setPersonalDetails] = useState({
    profilePicture: null,
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
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpModal, setOtpModal] = useState(false);
  const [otpField, setOtpField] = useState("");
  const [notification, setNotification] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [districts, setDistricts] = useState([]);


  const apiBaseUrl = "https://example.com/api"; // Base URL for API

  const sendOtp = async (type) => {
    try {
      const response = await fetch(`${apiBaseUrl}/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type }), // Pass the type to the API (either "email" or "phone") *** change accordingly ***
      });
      if (response.ok) {
        setOtpField(type);
        setNotification("OTP sent successfully!");
      } else {
        throw new Error("Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setNotification("Error sending OTP. Please try again.");
    }
  };

  const verifyOtp = async (type) => {
    try {
      const response = await fetch(`${apiBaseUrl}/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: otpField, otp }), // Pass the type and OTP to the API (both "email" or "phone" and the entered OTP) *** change accordingly ***
      });
      if (response.ok) {
        if (otpField === "email") {
          setEmailOtpVerified(true);
          setNotification("Email OTP Verified Successfully!");
        } else if (otpField === "phone") {
          setPhoneOtpVerified(true);
          setNotification("Phone OTP Verified Successfully!");
        }
        setOtp(""); // Clear the OTP field
        setOtpModal(false);
      } else {
        setNotification("Invalid OTP. Please try again.");
        throw new Error("Invalid OTP");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setNotification("Error verifying OTP. Please try again.");
    }
  };
  const handleVerifyPhone = () => {
    sendOtp("phone");
    setOtpModal(true);
  };
  const handleVerifyEmail = () => {
    sendOtp("email");
    setOtpModal(true);
  };

  const handleOtpVerification = () => {
    if (otp === "123456") {
      if (otpField === "email") {
        setEmailOtpVerified(true);
        setEmailVerified(true);
        setNotification("Email OTP Verified Successfully!");
      } else if (otpField === "phone") {
        setPhoneOtpVerified(true);
        setPhoneVerified(true);
        setNotification("Phone OTP Verified Successfully!");
      }
      setOtpVerified(true);
      setOtpModal(false);
      verifyOtp(otpField);
      setOtp(""); // Reset OTP input
    } else {
      setNotification("Invalid OTP. Please try again.");
    }
  };

  // Function to handle state selection and populate districts
  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      contactDetails: {
        ...prevData.contactDetails,
        state: selectedState,
        city: "",
      },
    }));
    const selectedStateData = statesAndDistricts.states.find(
      (s) => s.state === selectedState
    );
    setDistricts(selectedStateData ? selectedStateData.districts : []);
  };

  const handleDistrictChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      district: event.target.value,
    }));
  };

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev.documentation,
      [name]: files[0],
    }));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotification("");
    setError(null);

    if (
      formData.accountDetails.password !==
      formData.accountDetails.confirmPassword
    ) {
      setError("Passwords don't match!");
      return;
    }

    if (
      !formData.personalDetails.firstName ||
      !formData.personalDetails.lastName ||
      !formData.personalDetails.email ||
      !formData.contactDetails.state ||
      !formData.contactDetails.city ||
      !formData.contactDetails.phoneNumber ||
      !formData.accountDetails.password ||
      !formData.accountDetails.confirmPassword ||
      !formData.educationDetails.qualification ||
      !formData.educationDetails.specialization ||
      !formData.educationDetails.experience
    ) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);

    // try {
    //   const response = await fetch("/api/register", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(formData),
    //   });

    //   if (response.ok) {
    //     const data = await response.json();

    //     setSuccess("Registration successful!");
    //     setTimeout(() => navigate("/"), 3000);
    //   } else {
    //     const errorData = await response.json();
    //     setError(errorData.message || "Registration failed.");
    //   }
    // } catch (error) {
    //   setError("An error occurred during registration.");
    // } finally {
    //   setLoading(false);
    // }

    setTimeout(() => {
      setLoading(false);

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

          {notification && (
            <div className="text-[#25852a] text-center mb-4">
              {notification}
            </div>
          )}
          {error && (
            <div className="text-[#b13e31] text-center mb-4">{error}</div>
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
                  value={formData.personalDetails.firstName}
                  handleChange={handleChange}
                />
                {/* Last Name */}
                <InputField
                  label="Last Name"
                  name="personalDetails.lastName"
                  placeholder="Enter your last name"
                  value={formData.personalDetails.lastName}
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
                <div className="flex space-x-2">
                  {/* Verify Email Button */}
                  <button
                    type="button"
                    onClick={handleVerifyEmail}
                    className="text-[#2C394B] bg-[#f1f5f9] border border-[#2C394B] hover:bg-[#2C394B] hover:text-[#f1f5f9] p-2 rounded"
                  >
                    Verify Email
                  </button>
                  {/* Verify Phone Button */}
                  <button
                    type="button"
                    onClick={handleVerifyPhone}
                    className="text-[#2C394B] bg-[#f1f5f9] border border-[#2C394B] hover:bg-[#2C394B] hover:text-[#f1f5f9] p-2 rounded"
                  >
                    Verify Phone
                  </button>
                </div>
                {/* Gender */}
                <InputField
                  label="Gender"
                  name="personalDetails.gender"
                  value={formData.personalDetails.gender}
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
                  value={formData.personalDetails.birthDate}
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
                  {districts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </InputField>
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
                      />
                      <button
                        type="button"
                        onClick={handleOtpVerification}
                        className="w-full bg-[#337357] text-white py-2 rounded-md"
                      >
                        Verify OTP
                      </button>
                      <button
                        type="button"
                        onClick={() => setOtpModal(false)}
                        className="w-full bg-[#C62E2E] text-white py-2 rounded-md mt-2"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
                {/* Password Field */}
                <InputField
                  label="Password *"
                  name="accountDetails.password"
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  value={formData.accountDetails.password}
                  handleChange={handleChange}
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
