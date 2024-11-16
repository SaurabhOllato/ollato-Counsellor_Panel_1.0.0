import React, { useState } from "react";
import LOGO from "../assets/ollatoLogo.png";
import { useNavigate } from "react-router-dom";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { FiEye, FiEyeOff } from "react-icons/fi";
import statesAndDistricts from "../../public/states-and-districts.json";

const Registration = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    email: "",
    phone: "",
    birthDate: "",
    state: "",
    district: "",
    zipcode: "",
    licenseNumber: "",
    qualification: "",
    specification: "",
    experience: "",
    profilePicture: null,
    degreeCertificate: null,
    resume: null,
    aadharNumber: "",
    aadharFront: null,
    aadharBack: null,
    panNumber: "",
    panCard: null,
    signature: null,
    expertiseCareerCounsellor: false,
    expertisePsychologist: false,
    expertiseGroupCounsellor: false,
    password: "",
    confirmPassword: "",
  });

  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpModal, setOtpModal] = useState(false);
  const [otpField, setOtpField] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [notification, setNotification] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [otpVerified, setOtpVerified] = useState(false);
  const [emailOtpVerified, setEmailOtpVerified] = useState(false);
  const [phoneOtpVerified, setPhoneOtpVerified] = useState(false);

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

  // Function to handle state selection and populate districts
  const handleStateChange = (event) => {
    const selectedState = event.target.value;
    setFormData((prevData) => ({
      ...prevData,
      state: selectedState,
      district: "",
    }));

    // Find the selected state's districts
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

  const handleOtpClick = (type) => {
    setOtpField(type);
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
      setOtp(""); // Reset OTP input
    } else {
      setNotification("Invalid OTP. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleLoginRedirect = () => {
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotification("");
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    if (!formData.email || !formData.password || !formData.fullName) {
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

    setTimeout(() => navigate("/"), 3000);

    console.log("Registration data:", formData);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Left side logo */}
      <div className="w-full md:w-1/4 bg-[#2C394B] flex items-center justify-center p-8">
        <img src={LOGO} alt="Logo" className="w-1/2 h-auto" />
      </div>

      {/* Right side form */}
      <div className="w-full md:w-3/4 p-6 md:p-8 h-full md:flex md:flex-col">
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
          {success && (
            <div className="text-[#25852a] text-center mb-4">{success}</div>
          )}
          {emailOtpVerified && <div>Email has been verified!</div>}
          {phoneOtpVerified && <div>Phone has been verified!</div>}

          {/* Step Navigation numbers
          <div className="flex justify-between mb-4">
            {[1, 2, 3].map((num) => (
              <span
                key={num}
                className={`cursor-pointer ${
                  step === num ? "text-[#2C394B]" : "text-gray-400"
                } font-semibold text-center`}
                onClick={() => setStep(num)}
              >
                {num}
              </span>
            ))}
          </div> */}

          {/* Step Header */}
          <div className="flex justify-between mb-4 flex-wrap sm:gap-1 sm:flex-col md:flex-row md:gap-1">
            {[
              "General Details",
              "Professional Details",
              "Documentation Details",
            ].map((title, index) => (
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
            {/* General Details */}
            {step === 1 && (
              <>
                {/* Full Name and Gender */}
                <div className="mb-4 flex flex-col md:flex-row md:space-x-4">
                  <div className="flex-1">
                    <label htmlFor="fullName" className="block text-gray-600">
                      Full Name *
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      name="fullName"
                      placeholder="Enter Your Full Name"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="gender" className="block text-gray-600">
                      Gender *
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="" disabled>
                        Select Gender
                      </option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Email and Phone */}
                <div className="mb-4 flex flex-col md:flex-row md:space-x-4">
                  <div className="flex-1">
                    <label htmlFor="email" className="block text-gray-600">
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={emailOtpVerified}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    {!emailVerified && (
                      <button
                        type="button"
                        onClick={() => handleOtpClick("email")}
                        className="mt-2 bg-[#2C394B] text-white px-4 py-2 rounded-md"
                      >
                        Verify Email OTP
                      </button>
                    )}
                  </div>
                  <div className="flex-1">
                    <label htmlFor="phone" className="block text-gray-600">
                      Phone Number *
                    </label>
                    <input
                      id="phone"
                      type="text"
                      name="phone"
                      placeholder="Enter Your Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={phoneOtpVerified}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    {!phoneVerified && (
                      <button
                        type="button"
                        onClick={() => handleOtpClick("phone")}
                        className="mt-2 bg-[#2C394B] text-white px-4 py-2 rounded-md"
                      >
                        Verify Phone OTP
                      </button>
                    )}
                  </div>
                </div>

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

                {/* Date of Birth and State/District */}
                <div className="mb-4 flex flex-col md:flex-row md:space-x-4">
                  <div className="flex-1">
                    <label htmlFor="birthDate" className="block text-gray-600">
                      Date of Birth *
                    </label>
                    <input
                      id="birthDate"
                      type="date"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="state" className="block text-gray-600">
                      State *
                    </label>
                    <select
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleStateChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="" disabled>
                        Select State
                      </option>
                      {statesAndDistricts.states.map((state) => (
                        <option key={state.state} value={state.state}>
                          {state.state}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-4 flex flex-col md:flex-row md:space-x-4">
                  <div className="flex-1">
                    <label htmlFor="district" className="block text-gray-600">
                      District *
                    </label>
                    <select
                      id="district"
                      name="district"
                      value={formData.district}
                      onChange={handleDistrictChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      disabled={districts.length === 0} // Disable dropdown if no districts are available
                    >
                      <option value="" disabled>
                        Select District
                      </option>
                      {districts.map((district) => (
                        <option key={district} value={district}>
                          {district}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1">
                    <label htmlFor="zipcode" className="block text-gray-600">
                      Zip Code *
                    </label>
                    <input
                      id="zipcode"
                      type="text"
                      name="zipcode"
                      placeholder="Enter Zip Code"
                      value={formData.zipcode}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="mt-4 flex justify-center w-full">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-fit bg-[#2C394B] text-white py-1 px-2 rounded-md"
                  >
                    Next
                  </button>
                </div>
              </>
            )}

            {/* Professional Details */}
            {step === 2 && (
              <div>
                {/* License Number and Qualification */}
                <div className="mb-4 flex flex-col md:flex-row md:space-x-4">
                  <div className="flex-1">
                    <label
                      htmlFor="licenseNumber"
                      className="block text-gray-600"
                    >
                      License Number *
                    </label>
                    <input
                      id="licenseNumber"
                      type="text"
                      name="licenseNumber"
                      placeholder="If No, put NA"
                      value={formData.licenseNumber}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor="qualification"
                      className="block text-gray-600"
                    >
                      Qualification *
                    </label>
                    <input
                      id="qualification"
                      type="text"
                      name="qualification"
                      placeholder="Enter your qualification"
                      value={formData.qualification}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                {/* Specification and Experience */}
                <div className="mb-4 flex flex-col md:flex-row md:space-x-4">
                  <div className="flex-1">
                    <label
                      htmlFor="specification"
                      className="block text-gray-600"
                    >
                      Specification *
                    </label>
                    <input
                      id="specification"
                      type="text"
                      name="specification"
                      placeholder="Enter your specification"
                      value={formData.specification}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="experience" className="block text-gray-600">
                      Experience *
                    </label>
                    <input
                      id="experience"
                      type="text"
                      name="experience"
                      placeholder="Enter your experience"
                      value={formData.experience}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="mt-4 flex justify-center">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-fit bg-[#2C394B] text-white py-1 px-2 rounded-md"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Documentation Details */}
            {step === 3 && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 h-full md:text-sm md:gap-2">
                  <div className="w-full">
                    <label
                      htmlFor="profilePicture"
                      className="block text-gray-600"
                    >
                      Upload Profile Picture *
                    </label>
                    <input
                      id="profilePicture"
                      type="file"
                      name="profilePicture"
                      onChange={handleFileChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="degreeCertificate"
                      className="block text-gray-600"
                    >
                      Upload Degree Certificate *
                    </label>
                    <input
                      id="degreeCertificate"
                      type="file"
                      name="degreeCertificate"
                      onChange={handleFileChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label htmlFor="resume" className="block text-gray-600">
                      Upload Resume *
                    </label>
                    <input
                      id="resume"
                      type="file"
                      name="resume"
                      onChange={handleFileChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label
                      htmlFor="aadharNumber"
                      className="block text-gray-600"
                    >
                      Aadhar Number *
                    </label>
                    <input
                      id="aadharNumber"
                      type="text"
                      name="aadharNumber"
                      placeholder="Enter Aadhar number"
                      value={formData.aadharNumber}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="aadharFront"
                      className="block text-gray-600"
                    >
                      Upload Aadhar Card Front *
                    </label>
                    <input
                      id="aadharFront"
                      type="file"
                      name="aadharFront"
                      onChange={handleFileChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label htmlFor="aadharBack" className="block text-gray-600">
                      Upload Aadhar Card Back *
                    </label>
                    <input
                      id="aadharBack"
                      type="file"
                      name="aadharBack"
                      onChange={handleFileChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label htmlFor="panNumber" className="block text-gray-600">
                      PAN Number *
                    </label>
                    <input
                      id="panNumber"
                      type="text"
                      name="panNumber"
                      placeholder="Enter PAN Number"
                      value={formData.panNumber}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label htmlFor="panCard" className="block text-gray-600">
                      Upload PAN Card *
                    </label>
                    <input
                      id="panCard"
                      type="file"
                      name="panCard"
                      onChange={handleFileChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label htmlFor="signature" className="block text-gray-600">
                      Signature *
                    </label>
                    <input
                      id="signature"
                      type="file"
                      name="signature"
                      onChange={handleFileChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <label className="block text-gray-600 mb-2">
                    Professional Expertise *
                  </label>
                  <div>
                    <div className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        name="expertiseCareerCounsellor"
                        checked={formData.expertiseCareerCounsellor}
                        onChange={handleChange}
                        className="h-5 w-5 text-[#2C394B] border-gray-300 rounded focus:ring-[#2C394B]"
                      />
                      <label className="ml-2 text-gray-600">
                        Career Counsellor
                      </label>
                    </div>
                    <div className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        name="expertisePsychologist"
                        checked={formData.expertisePsychologist}
                        onChange={handleChange}
                        className="h-5 w-5 text-[#2C394B] border-gray-300 rounded focus:ring-[#2C394B]"
                      />
                      <label className="ml-2 text-gray-600">Psychologist</label>
                    </div>
                    <div className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        name="expertiseGroupCounsellor"
                        checked={formData.expertiseGroupCounsellor}
                        onChange={handleChange}
                        className="h-5 w-5 text-[#2C394B] border-gray-300 rounded focus:ring-[#2C394B]"
                      />
                      <label className="ml-2 text-gray-600">
                        Group Counsellor
                      </label>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="relative">
                    <label htmlFor="password" className="block text-gray-600">
                      Create Password *
                    </label>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute top-9 right-3 cursor-pointer"
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </span>
                  </div>

                  <div className="relative">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-gray-600"
                    >
                      Confirm Password *
                    </label>
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <span
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute top-9 right-3 cursor-pointer"
                    >
                      {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex justify-center">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="bg-[#2C394B] text-white py-1 px-2 rounded-md w-fit"
                  >
                    {loading ? "Registering..." : "Register"}
                  </button>
                </div>
              </div>
            )}
          </form>
          {/* Login Link */}
          <div className="absolute top-6 right-14 flex justify-center items-center mt-4">
            <p className="text-sm text-[#2C394B]">Already have an account?</p>
            <button
              className="ml-2 text-md text-[#2C394B] hover:text-[#597aac] hover:translate-x-1 transition duration-200 ease-in-out flex items-center gap-1"
              onClick={handleLoginRedirect}
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

export default Registration;
