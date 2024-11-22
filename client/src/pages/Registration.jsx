import React, { useState } from "react";
import LOGO from "../assets/ollatoLogo.png";
import { useNavigate } from "react-router-dom";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { FiEye, FiEyeOff } from "react-icons/fi";
import statesAndDistricts from "../../public/states-and-districts.json";
import { useAuth } from "../context/UserContext";

const Registration = () => {
  // State management
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

  const [educationDetails, setEducationDetails] = useState({
    licenseNumber: "",
    qualification: "",
    specialization: "",
    experience: "",
    institutionName: "",
  });

  const [documentation, setDocumentation] = useState({
    degreeCertificate: null,
    resume: null,
    aadharNumber: "",
    aadharFront: null,
    aadharBack: null,
    panNumber: "",
    panCard: null,
    signature: null,
    expertise: {
      careerCounsellor: false,
      psychologist: false,
      groupCounsellor: false,
    },
  });

  const [formData, setFormData] = useState({
    personalDetails,
    contactDetails,
    accountDetails,
    educationDetails,
    documentation,
  });

  const [otp, setOtp] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpModal, setOtpModal] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [otpType, setOtpType] = useState(""); // 'email' or 'phone' to track the OTP type
  const [stepLocked, setStepLocked] = useState(false);

  const { setProfileComplete } = useAuth();
  const navigate = useNavigate();
  const steps = [
    { id: 1, title: "Personal Information" },
    { id: 2, title: "Professional Information" },
    { id: 3, title: "Documentation Profile" },
  ];

  // API URLs
  const apiUrls = {
    personalDetails: import.meta.env.VITE_PERSONAL_DELAILS_API,
    professionalDetails: import.meta.env.VITE_PROFESSIONAL_DELAILS_API,
    documentation: import.meta.env.VITE_DOCUMENTS_UPLOAD_API,
    sendOtp: {
      email: import.meta.env.VITE_SEND_EMAIL_OTP_API,
      phone: import.meta.env.VITE_SEND_MOBILE_OTP_API,
    },
    verifyOtp: {
      email: import.meta.env.VITE_VERIFY_EMAIL_OTP_API,
      phone: import.meta.env.VITE_VERIFY_MOBILE_OTP_API,
    },
  };

  // Calculate progress based on currentStep and total steps
  const progressPercentage = (currentStep / steps.length) * 100;

  const handleStepClick = (stepId) => {
    if (stepId <= currentStep) {
      // Allow only clicking completed or current steps
      setCurrentStep(stepId);
    }
  };

  // Message handler function
  const handleMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  };

  // Step completion logic
  const completeStep = () => {
    if (currentStep === 1) {
      setStepLocked(true); // Lock data after Step 1 submission
    }

    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setProfileComplete(true);
      navigate("/dashboard");
    }
  };

  // Input handler logic
  const handleChange = (e) => {
    if (stepLocked) return; // Prevent changes if step is locked
    const { name, value } = e.target;
    const keys = name.split("."); // Handle nested state updates

    setFormData((prevState) => {
      const newState = { ...prevState };
      let current = newState;

      // Navigate to the corresponding nested keys
      keys.slice(0, -1).forEach((key) => {
        current = current[key];
      });

      // Update the corresponding value
      current[keys[keys.length - 1]] = value;
      return newState;
    });
  };

  // Change handler for state select
  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    const selectedStateData = statesAndDistricts.states.find(
      (s) => s.state === selectedState
    );

    setFormData((prevData) => ({
      ...prevData,
      contactDetails: {
        ...prevData.contactDetails,
        state: selectedState,
        city: "", // Clear city when state changes
      },
    }));

    setDistricts(selectedStateData ? selectedStateData.districts : []);
  };

  // District change handler
  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;

    setFormData((prevData) => ({
      ...prevData,
      contactDetails: {
        ...prevData.contactDetails,
        city: selectedDistrict,
      },
    }));
  };

  // File change handler for document uploads
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      documentation: {
        ...prev.documentation,
        [name]: files[0],
      },
    }));
  };

  // Email verification handler
  const handleVerifyEmail = () => {
    if (!formData.contactDetails.email) {
      handleMessage("Please enter an email address.", "error");
      return;
    }
    // sendOtp("email", formData.contactDetails.email);
    sendEmailOtp(formData.contactDetails.email);
    setOtpType("email"); // Track OTP type as email
  };

  // Phone verification handler
  const handleVerifyPhone = () => {
    if (!contactDetails.phone) {
      handleMessage("Please enter a phone number.", "error");
      return;
    }
    // sendOtp("phone", contactDetails.phone);
    sendPhoneOtp(formData.contactDetails.phone); // Send OTP for phone
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
          phoneNumber: formData.contactDetails.phone,
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
          ? { enteredOtp: otp, email: formData.contactDetails.email }
          : { enteredOtp: otp, phoneNumber: formData.contactDetails.phone };

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload), // Send OTP and email/phone to backend
      });

      if (response.ok) {
        handleMessage("OTP verified successfully!", "success");
        setOtpModal(false); // Close OTP modal
        setOtp(""); // Clear OTP input
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

  // const handleOtpVerification = () => {
  //   if (otpType === "email") {
  //     handleVerifyEmailOtp();
  //   } else if (otpType === "phone") {
  //     handleVerifyPhoneOtp();
  //   }
  //   setOtp("");
  // };

  // // Function to send OTP
  // const sendOtp = async (type, recipient) => {
  //   const url = apiUrls.sendOtp[type];

  //   try {
  //     const response = await fetch(url, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ type, recipient }), // Send type and recipient (email/phone)
  //     });
  //     console.log("response", response);
  //     console.log("type", type);
  //     console.log("recipient", recipient);

  //     if (response.ok) {
  //       handleMessage("OTP sent successfully!", "success");
  //       setOtpModal(true); // Open the OTP modal
  //     } else {
  //       const errorData = await response.json();
  //       handleMessage(errorData.message || "Failed to send OTP.", "error");
  //     }
  //   } catch (error) {
  //     console.error("Error sending OTP:", error);
  //     handleMessage("Error sending OTP. Please try again.", "error");
  //   }
  // };

  // OTP verification logic
  // const handleOtpVerification = async () => {
  //   if (!otp || otp.length !== 6) {
  //     handleMessage("Please enter a valid 6-digit OTP.", "error");
  //     return;
  //   }

  //   setIsVerifying(true); // Show verifying state
  //   try {
  //     const url = apiUrls.verifyOtp[otpType]; // Assuming `otpType` is "email" or "phone"
  //     const response = await fetch(url, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ otp, type: otpType }), // Send OTP and type to backend
  //     });

  //     if (response.ok) {
  //       handleMessage("OTP verified successfully!", "success");
  //       setOtpModal(false); // Close the modal
  //       setOtp(""); // Clear OTP input
  //       completeStep(); // Proceed to next step
  //     } else {
  //       const errorData = await response.json();
  //       handleMessage(
  //         errorData.message || "Invalid OTP. Please try again.",
  //         "error"
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Error verifying OTP:", error);
  //     handleMessage(
  //       "An error occurred during OTP verification. Please try again.",
  //       "error"
  //     );
  //   } finally {
  //     setIsVerifying(false); // Reset verifying state
  //   }
  // };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl =
      currentStep === 1
        ? apiUrls.personalDetails
        : currentStep === 2
        ? apiUrls.professionalDetails
        : apiUrls.documentation;

    setLoading(true);

    try {
      // Prepare payload
      const payload = new FormData();

      // Add personal details
      payload.append("user_id", "user123"); // Replace with dynamic user_id
      payload.append("first_name", formData.personalDetails.firstName);
      payload.append("last_name", formData.personalDetails.lastName);
      payload.append("gender", formData.personalDetails.gender);
      payload.append("date_of_birth", formData.personalDetails.birthDate);

      // Add contact details
      payload.append("email", formData.contactDetails.email);
      payload.append("phone_number", formData.contactDetails.phone);
      payload.append("state", formData.contactDetails.state);
      payload.append("district", formData.contactDetails.city);

      // Step-specific additions
      if (currentStep === 1) {
        payload.append("password", formData.accountDetails.password);
        payload.append(
          "confirm_password",
          formData.accountDetails.confirmPassword
        );
      }

      if (currentStep === 2) {
        payload.append(
          "license_number",
          formData.educationDetails.licenseNumber
        );
        payload.append(
          "qualification",
          formData.educationDetails.qualification
        );
        payload.append(
          "specialization",
          formData.educationDetails.specialization
        );
        payload.append("experience", formData.educationDetails.experience);
        payload.append(
          "institution_name",
          formData.educationDetails.institutionName
        );
      }

      if (currentStep === 3) {
        payload.append(
          "degree_certificate",
          formData.documentation.degreeCertificate
        );
        payload.append("resume", formData.documentation.resume);
        payload.append("aadhar_number", formData.documentation.aadharNumber);
        payload.append("aadhar_front", formData.documentation.aadharFront);
        payload.append("aadhar_back", formData.documentation.aadharBack);
        payload.append("pan_number", formData.documentation.panNumber);
        payload.append("pan_card", formData.documentation.panCard);
        payload.append("signature", formData.documentation.signature);

        // Add expertise as JSON string
        payload.append(
          "expertise",
          JSON.stringify(formData.documentation.expertise)
        );
      }
      // Log the payload
      for (const [key, value] of payload.entries()) {
        console.log(`${key}: ${value}`);
      }
      // Send payload to backend
      const response = await fetch(apiUrl, {
        method: "POST",
        body: payload, // FormData automatically sets the appropriate headers
      });

      if (response.ok) {
        if (currentStep === 1) {
          handleMessage("Personal details submitted successfully!", "success");
          navigate("/"); // Redirect to login page
        } else if (currentStep === steps.length) {
          handleMessage("Registration completed successfully!", "success");
          navigate("/dashboard"); // Redirect to dashboard
        } else {
          handleMessage("Step submitted successfully!", "success");
          setCurrentStep((prev) => prev + 1);
        }
      } else {
        const contentType = response.headers.get("Content-Type");
        let errorMessage = "Registration failed!";
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        }
        handleMessage(errorMessage, "error");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      handleMessage(
        "An error occurred during registration. Please try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
    console.log("Regitsration data:", formData);
  };

  // Render UI
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

          {message.text && (
            <div
              className={`fixed top-24 left-2/3 w-fit transform -translate-x-1/2 z-10 py-4 rounded-md flex items-center justify-center text-md font-medium ${
                message.type === "success"
                  ? "bg-[#C4F9E2] text-[#004434]"
                  : "bg-[#F8D7DA] text-[#721C24]"
              }`}
            >
              <span className="pr-3">
                <svg width={20} height={20}>
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

          {/* Progress Bar */}
          {/* <div className="mb-6">
            <div className="flex items-center">
              <div className="flex-grow h-1 bg-gray-300">
                <div
                  className="h-full bg-[#2C394B]"
                  style={{ width: `${(currentStep / steps.length) * 100}%` }}
                />
              </div>
              <div className="ml-4 text-gray-600">
                {currentStep} of {steps.length}
              </div>
            </div>
            <div className="flex justify-between mt-3">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`text-center ${
                    index < currentStep ? "text-[#2C394B]" : "text-gray-400"
                  }`}
                >
                  <div>{step.title}</div>
                  <div
                    className={`h-1 ${
                      index < currentStep ? "bg-[#2C394B]" : "bg-gray-300"
                    }`}
                  ></div>
                </div>
              ))}
            </div>
          </div> */}
          {/* Progress Bar and Header */}
          <div className="mb-6">
            <div className="flex items-center mb-3">
              {/* Header Titles */}
              {steps.map((step) => (
                <div
                  key={step.id}
                  className="flex-1 text-center cursor-pointer"
                  onClick={() => handleStepClick(step.id)}
                >
                  <span
                    className={`text-sm font-medium ${
                      step.id === currentStep
                        ? "text-[#2C394B]" // Active step color
                        : step.id < currentStep
                        ? "text-green-500" // Completed step color
                        : "text-gray-400" // Upcoming step color
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
              ))}
            </div>

            {/* Progress Bar */}
            <div className="relative h-2 bg-gray-300 rounded">
              <div
                className="absolute h-full bg-[#2C394B] rounded"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit}>
            {currentStep === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="First Name"
                  name="personalDetails.firstName"
                  placeholder="Enter your first name"
                  value={personalDetails.firstName}
                  handleChange={handleChange}
                  disabled={stepLocked}
                />
                <InputField
                  label="Last Name"
                  name="personalDetails.lastName"
                  placeholder="Enter your last name"
                  value={personalDetails.lastName}
                  handleChange={handleChange}
                  disabled={stepLocked}
                />
                <InputField
                  label="Email"
                  name="contactDetails.email"
                  placeholder="Enter your email"
                  type="email"
                  value={contactDetails.email}
                  handleChange={handleChange}
                  disabled={stepLocked}
                />
                <InputField
                  label="phoneNumber"
                  name="contactDetails.phone"
                  placeholder="Enter your phone number"
                  type="text"
                  value={contactDetails.phone}
                  handleChange={handleChange}
                  disabled={stepLocked}
                />
                <div>
                  <button
                    type="button"
                    onClick={handleVerifyEmail}
                    disabled={isVerifying}
                    className="text-[#2C394B] bg-[#f1f5f9] border border-[#2C394B] hover:bg-[#2C394B] hover:text-[#f1f5f9] p-2 rounded"
                  >
                    Verify Email
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={handleVerifyPhone}
                    disabled={isVerifying}
                    className="text-[#2C394B] bg-[#f1f5f9] border border-[#2C394B] hover:bg-[#2C394B] hover:text-[#f1f5f9] p-2 rounded"
                  >
                    Verify Phone
                  </button>
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
                        aria-label="OTP Input field"
                        maxLength={6}
                      />
                      <button
                        type="button"
                        onClick={handleOtpVerification}
                        className="w-full bg-[#337357] text-white py-2 rounded-md"
                      >
                        {isVerifying ? "Verifying..." : "Verify OTP"}
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
                <InputField
                  label="Gender"
                  name="personalDetails.gender"
                  value={personalDetails.gender}
                  handleChange={handleChange}
                  component="select"
                  disabled={stepLocked}
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
                  name="personalDetails.birthDate"
                  value={personalDetails.birthDate}
                  handleChange={handleChange}
                  component="input"
                  type="date"
                  disabled={stepLocked}
                />
                <InputField
                  label="State"
                  name="contactDetails.state"
                  value={formData.contactDetails.state}
                  handleChange={handleStateChange}
                  component="select"
                  disabled={stepLocked}
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
                  label="District"
                  name="contactDetails.city"
                  value={formData.contactDetails.city}
                  handleChange={handleDistrictChange}
                  component="select"
                  disabled={stepLocked}
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
                    label="Password *"
                    name="accountDetails.password"
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    value={accountDetails.password}
                    handleChange={handleChange}
                    disabled={stepLocked}
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
                    label="Confirm Password *"
                    name="accountDetails.confirmPassword"
                    placeholder="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={accountDetails.confirmPassword}
                    handleChange={handleChange}
                    disabled={stepLocked}
                  />
                  <span
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-9 cursor-pointer"
                  >
                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                  </span>
                </div>
              </div>
            )}

            {/* Step 2: Education Details */}
            {currentStep === 2 && (
              <div>
                <InputField
                  label="License Number *"
                  name="educationDetails.licenseNumber"
                  placeholder="Enter License Number"
                  value={educationDetails.licenseNumber}
                  handleChange={handleChange}
                />
                <InputField
                  label="Qualification *"
                  name="educationDetails.qualification"
                  placeholder="Enter Qualification"
                  value={educationDetails.qualification}
                  handleChange={handleChange}
                />
                <InputField
                  label="Specialization"
                  name="educationDetails.specialization"
                  placeholder={"Enter Specialization"}
                  value={educationDetails.specialization}
                  handleChange={handleChange}
                />
                <InputField
                  label="Experience"
                  name="educationDetails.experience"
                  placeholder={"Enter Experience"}
                  value={educationDetails.experience}
                  handleChange={handleChange}
                />
                <button
                  type="button"
                  onClick={completeStep}
                  className="mt-4 bg-[#337357] text-white py-2 px-4 rounded"
                >
                  Next
                </button>
              </div>
            )}

            {/* Step 3: Document Details */}
            {currentStep === 3 && (
              <div className="grid grid-cols-3 gap-4">
                <InputField
                  label="Upload Profile Picture"
                  name="documentation.profilePicture"
                  type="file"
                  handleChange={handleFileChange}
                />
                <InputField
                  label="Upload Degree Certificate"
                  name="documentation.degreeCertificate"
                  type="file"
                  handleChange={handleFileChange}
                />
                <InputField
                  label="Upload Resume"
                  name="documentation.resume"
                  type="file"
                  handleChange={handleFileChange}
                />
                <InputField
                  label="Aadhar Number"
                  name="documentation.aadharNumber"
                  placeholder="Enter Aadhar Number"
                  value={documentation.aadharNumber}
                  handleChange={handleChange}
                />
                <InputField
                  label="Upload Aadhar Card Front"
                  name="documentation.aadharFront"
                  type="file"
                  handleChange={handleFileChange}
                />
                <InputField
                  label="Upload Aadhar Card Back *"
                  name="documentation.aadharBack"
                  type="file"
                  handleChange={handleFileChange}
                />
                <InputField
                  label="PAN Number *"
                  name="documentation.panNumber"
                  placeholder="Enter PAN Number"
                  value={documentation.panNumber}
                  handleChange={handleChange}
                />
                <InputField
                  label="Upload PAN Card *"
                  name="documentation.panCard"
                  type="file"
                  handleChange={handleFileChange}
                />
                <InputField
                  label="Upload Signature *"
                  name="documentation.signature"
                  type="file"
                  handleChange={handleFileChange}
                />
              </div>
            )}
            <div className="mt-4 flex justify-center">
              <button
                type="submit"
                className="bg-[#2C394B] text-white w-fit h-fit py-2 px-4 rounded-md"
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </div>
          </form>

          {/* Login Link */}
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
    </div>
  );
};

// Reusable Input Field Component
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
}) => (
  <div className="mb-4 flex flex-col">
    <label htmlFor={name} className="block text-[#2C394B]">
      {label} {props.required && "*"}
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

export default Registration;
