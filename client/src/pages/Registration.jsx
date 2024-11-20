// import React, { useState } from "react";
// import LOGO from "../assets/ollatoLogo.png";
// import { useNavigate } from "react-router-dom";
// import { FaArrowRightFromBracket } from "react-icons/fa6";
// import { FiEye, FiEyeOff } from "react-icons/fi";
// import statesAndDistricts from "../../public/states-and-districts.json";
// import { useUser } from "../context/UserContext";

// const Registration = () => {
//   const [personalDetails, setPersonalDetails] = useState({
//     firstName: "",
//     lastName: "",
//     gender: "",
//     birthDate: "",
//   });

//   const [contactDetails, setContactDetails] = useState({
//     email: "",
//     phone: "",
//     state: "",
//     city: "",
//   });

//   const [accountDetails, setAccountDetails] = useState({
//     password: "",
//     confirmPassword: "",
//   });

//   const [educationDetails, setEducationDetails] = useState({
//     licenseNumber: "",
//     qualification: "",
//     specialization: "",
//     experience: "",
//     institutionName: "",
//   });

//   const [documentation, setDocumentation] = useState({
//     degreeCertificate: null,
//     resume: null,
//     aadharNumber: "",
//     aadharFront: null,
//     aadharBack: null,
//     panNumber: "",
//     panCard: null,
//     signature: null,
//     expertise: {
//       careerCounsellor: false,
//       psychologist: false,
//       groupCounsellor: false,
//     },
//   });

//   const [formData, setFormData] = useState({
//     personalDetails: personalDetails,
//     contactDetails: contactDetails,
//     accountDetails: accountDetails,
//     educationDetails: educationDetails,
//     documentation: documentation,
//   });

//   const [otp, setOtp] = useState("");
//   const [step, setStep] = useState(1);
//   const [currentStep, setCurrentStep] = useState(user?.registrationStep || 1);

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [otpModal, setOtpModal] = useState(false);
//   const [message, setMessage] = useState({ text: "", type: "" }); // New consolidated message state

//   const [loading, setLoading] = useState(false);
//   const [districts, setDistricts] = useState([]);
//   const [isVerifying, setIsVerifying] = useState(false);

//   const { user, profileComplete, login,setProfileComplete } = useUser();
//   const isEditing = profileComplete === false;
//   // const [notification, setNotification] = useState("");
//   // const [error, setError] = useState(null);

//   // const { setProileComplete, } = useUser();
//   const steps = [
//     { id: 1, title: "Personal Information" },
//     { id: 2, title: "professional Information" },
//     { id: 3, title: "Documentation profile" },
//   ];

//   const navigate = useNavigate();
//   const PersonalDetails_Url = import.meta.env.VITE_PERSONAL_DELAILS_API;
//   const ProfessionalDetails_Url = import.meta.env.VITE_PROFESSIONAL_DELAILS_API;
//   const documentUpload_Url = import.meta.env.VITE_DOCUMENTS_UPLOAD_API;
//   const send_mobile_otp_Url = import.meta.env.VITE_SEND_MOBILE_OTP_API;
//   const verify_mobile_otp_Url = import.meta.env.VITE_VERIFY_MOBILE_OTP_API;
//   const send_email_otp_url = import.meta.env.VITE_SEND_EMAIL_OTP_API;
//   const verify_email_otp_url = import.meta.env.VITE_VERIFY_EMAIL_OTP_API;

//   const handlemessage = (text, type) => {
//     setMessage({ text, type }); // Update message state with text and type
//     setTimeout(() => {
//       setMessage({ text: "", type: "" }); // Reset message state after 3 seconds
//     }, 3000);
//   };

//   const completeStep = () => {
//     if (currentStep < steps.length - 1) {
//       setCurrentStep(currentStep + 1);
//     } else {
//       setProileComplete(true);
//       navigate("/dashboard");
//     }
//   };

//   // const handleChange = (e) => {
//   //   const { name, type, checked, value } = e.target;

//   //   setFormData({
//   //     ...formData,
//   //     [name]: type === "checkbox" ? checked : value,
//   //   });
//   // };

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     // Split the nested key (e.g., "personalDetails.firstName")
//     const keys = name.split(".");

//     // Use a functional state update to handle immutability
//     setFormData((prevState) => {
//       let newState = { ...prevState };
//       let current = newState;

//       // Navigate to the nested key
//       for (let i = 0; i < keys.length - 1; i++) {
//         current = current[keys[i]];
//       }

//       // Update the value at the nested key
//       current[keys[keys.length - 1]] = value;

//       return newState;
//     });
//   };

//   const handleStateChange = (e) => {
//     const selectedState = e.target.value;

//     // Find the selected state's data
//     const selectedStateData = statesAndDistricts.states.find(
//       (s) => s.state === selectedState
//     );

//     // Update the formData with the selected state and clear the district (city)
//     setFormData((prevData) => ({
//       ...prevData,
//       contactDetails: {
//         ...prevData.contactDetails,
//         state: selectedState,
//         city: "", // Clear city (district) when state changes
//       },
//     }));

//     // Update the districts based on the selected state
//     setDistricts(selectedStateData ? selectedStateData.districts : []);
//   };

//   const handleDistrictChange = (e) => {
//     const selectedDistrict = e.target.value;

//     // console.log("Selected District:", selectedDistrict);

//     // Update the formData with the selected district (city)
//     setFormData((prevData) => ({
//       ...prevData,
//       contactDetails: {
//         ...prevData.contactDetails,
//         city: selectedDistrict, // Ensure city (district) is set correctly
//       },
//     }));
//   };

//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     setFormData((prev) => ({
//       ...prev.documentation,
//       [name]: files[0],
//     }));
//   };

//   // const handleNextStep = async () => {
//   //   // if (step < 3) setStep(step + 1);
//   //   if (step === 1) {
//   //     // Ensure personal details are filled and Save Step 1 data to backend (simulated with localStorage)

//   //     const { firstName, lastName, gender, birthDate } =
//   //       formData.personalDetails;
//   //     if (!firstName || !lastName || !gender || !birthDate) {
//   //       handlemessage("Please fill in all required fields", "error");
//   //       return;
//   //     }
//   //     // Send personal details to the backend (demo).
//   //     // Assuming there's an API endpoint for adding a new user.
//   //     try {
//   //       const response = await fetch("/api/save-step-1", {
//   //         method: "POST",
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //         },
//   //         body: JSON.stringify({ formData }),
//   //       });
//   //       if (response.ok) {
//   //         // console.log("Step 1 data saved successfully");
//   //         handlemessage("Step 1 data saved successfully", "success");
//   //         navigate("/")
//   //       } else {
//   //         // console.log("Failed to save Step 1 data");
//   //         handlemessage("Failed to save Step 1 data", "error");
//   //       }
//   //     } catch (error) {
//   //       handlemessage(error.message, "error");
//   //     }
//   //     // const user = { ...formData.generalDetails, profileComplete: false };
//   //     // localStorage.setItem("user", JSON.stringify(user));

//   //     navigate("/");
//   //   } else {
//   //     setStep(step + 1);
//   //   }
//   // };

//   //For the sake of simplicity, let's assume we have a function to handle messages
//   // const handleNextStep = async () => {
//   //   if (step === 1) {
//   //     // ensure personal details are filled and save step 1 data to backend (simulated with localStorage)
//   //     const { firstName, lastName, gender, birthDate } =
//   //       formData.personalDetails;
//   //     if (!firstName || !lastName || !gender || !birthDate) {
//   //       handlemessage("Please fill in all required fields", "error");
//   //       return;
//   //     }
//   //     localStorage.setItem("formData", JSON.stringify(formData));
//   //     navigate("/");
//   //   }
//   // };

//   const handleVerifyEmail = () => {
//     if (!contactDetails.email) {
//       // setNotification("Please enter an email address.");
//       handlemessage("Please enter an email address.", "error");
//       return;
//     }
//     sendOtp("email");
//     // setOtpModal(true);
//   };

//   const handleVerifyPhone = () => {
//     if (!contactDetails.phone) {
//       // setNotification("Please enter a phone number.");
//       handlemessage("Please enter a phone number.", "error");
//       return;
//     }
//     sendOtp("phone");
//     // setOtpModal(true);
//   };

//   const sendOtp = async (type) => {
//     try {
//       const response = await fetch(send_mobile_otp_Url, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ type }), // Pass the type to the API (either "email" or "phone") *** change accordingly ***
//       });
//       if (response.ok) {
//         setOtpField(type);
//         setNotification("OTP sent successfully!");
//         setOtpModal(true);
//       } else {
//         throw new Error("Failed to send OTP");
//       }
//     } catch (error) {
//       console.error("Error sending OTP:", error);
//       setNotification("Error sending OTP. Please try again.");
//     }
//     // mockOTP sending
//     // setNotification("OTP sent successfully!");
//     handlemessage("OTP sent successfully!", "success");
//     setOtpModal(true);
//   };

//   // const verifyOtp = async (type) => {
//   //   // try {
//   //   //   const response = await fetch(`${apiBaseUrl}/verify-otp`, {
//   //   //     method: "POST",
//   //   //     headers: { "Content-Type": "application/json" },
//   //   //     body: JSON.stringify({ type: otpField, otp }), // Pass the type and OTP to the API (both "email" or "phone" and the entered OTP) *** change accordingly ***
//   //   //   });
//   //   //   if (response.ok) {
//   //   //     if (otpField === "email") {
//   //   //       setEmailOtpVerified(true);
//   //   //       setNotification("Email OTP Verified Successfully!");
//   //   //     } else if (otpField === "phone") {
//   //   //       setPhoneOtpVerified(true);
//   //   //       setNotification("Phone OTP Verified Successfully!");
//   //   //     }
//   //   //     setOtp(""); // Clear the OTP field
//   //   //     setOtpModal(false);
//   //   //   } else {
//   //   //     setNotification("Invalid OTP. Please try again.");
//   //   //     throw new Error("Invalid OTP");
//   //   //   }
//   //   // } catch (error) {
//   //   //   console.error("Error verifying OTP:", error);
//   //   //   setNotification("Error verifying OTP. Please try again.");
//   //   // }
//   // };

//   const handleOtpVerification = async () => {
//     // setNotification(""); // Clear any previous notification before starting
//     if (!otp || otp.length !== 6) {
//       // OTP validation
//       // setNotification("Please enter a valid 6-digit OTP.");
//       handlemessage("Please enter a valid 6-digit OTP.", "error");
//       return;
//     }
//     setIsVerifying(true); // Set isVerifying to true

//     // Simulate OTP check (for testing purposes, this is a mock check)
//     const isOtpValid = otp === "123456"; // Replace with real OTP validation logic

//     if (isOtpValid) {
//       //OTP is valid
//       // setNotification("OTP verified successfully!");
//       handlemessage("OTP verified successfully!", "success");
//       handleOtpVerificationSuccess(); // Call the success function
//     } else {
//       // OTP is invalid
//       // setNotification("Invalid OTP. Please try again.");
//       handlemessage("Invalid OTP. Please try again.", "error");
//     }
//     setIsVerifying(false); // Reset verifying state
//   };

//   const handleOtpVerificationSuccess = () => {
//     setOtpModal(false);

//     if (otpField === "email") {
//       setEmailOtpVerified(true);
//       setEmailVerified(true);
//       // setNotification("Email OTP Verified Successfully!");
//       handlemessage("Email OTP Verified Successfully!", "success");
//     } else if (otpField === "phone") {
//       setPhoneOtpVerified(true);
//       setPhoneVerified(true);
//       // setNotification("Phone OTP Verified Successfully!");
//       handlemessage("Phone OTP Verified Successfully!", "success");
//     }

//     setOtpVerified(true); // Mark OTP as verified
//     setOtpModal(false); // Close OTP modal
//     setOtp(""); // Clear OTP input
//     verifyOtp(otpField); // Call verifyOtp function with the OTP field type (email or phone)
//   };

//   const getSection = (currentStep) => {
//     if (currentStep === 1) return "generatedetails";
//     if (currentStep === 2) return "professionaldetails";
//     return "DocumentationDetails";
//   };
//   const getApiUrl = (currentStep) => {
//     if (currentStep === 1) return PersonalDetails_Url;
//     if (currentStep === 2) return ProfessionalDetails_Url;
//     return documentUpload_Url;
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const section = getSection(currentStep);
//     const apiUrl = getApiUrl(currentStep);
//     // setNotification("");
//     setMessage({ text: "", type: "" });
//     // setError(null);

//     // Validation: Check for required fields
//     const {
//       personalDetails: { firstName, lastName, gender, birthDate },
//       contactDetails: { email, state, city, phone },
//       accountDetails: { password, confirmPassword },
//     } = formData;

//     if (
//       !firstName ||
//       !lastName ||
//       !email ||
//       !gender ||
//       !birthDate ||
//       !state ||
//       !city ||
//       !phone ||
//       !password ||
//       !confirmPassword
//     ) {
//       // setError("Please fill in all required fields");
//       handlemessage("Please fill in all required fields", "error");
//       return;
//     }
//     // Password Match Validation
//     if (password !== confirmPassword) {
//       // setError("Passwords don't match!");
//       handlemessage("Passwords don't match!", "error");
//       return;
//     }

//     setLoading(true);

//     try {
//       // API Integration
//       const response = await fetch(apiUrl, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         // setNotification("Registration successful!");
//         handlemessage("Registration successful!", "success");
//         console.log("Response Data:", data);
//         if (currentStep === 1) {
//           handlemessage("Registration successful!", "success");
//           navigate("/login");
//         } else if (currentStep === 2) {
//           setCurrentStep(currentStep + 1);
//         } else {
//           login({});
//           navigate("/dashboard");
//         }
//         // Redirect to another page after success
//         setTimeout(() => navigate("/"), 3000);
//       } else {
//         const errorData = await response.json();
//         // setError(errorData.message || "Registration failed.");
//         handlemessage(errorData.message || "Registration failed.", "error");
//       }
//     } catch (error) {
//       console.error("Error during registration:", error);
//       // setError("An error occurred during registration.");
//       handlemessage("An error occurred during registration.", "error");
//     } finally {
//       setLoading(false);
//     }

//     // if (/*condition to check all fields are filled*/) {
//     //   setProfileComplete(true);
//     //   navigate("/dashboard");
//     // }
//     // using mock data and local storage for simplicity

//     // const users = JSON.parse(localStorage.getItem("users")) || [];
//     // users.push(formData);
//     // localStorage.setItem("users", JSON.stringify(users));

//     // setLoading(false);

//     // setTimeout(() => {
//     //   handlemessage("Registration successful!", "success");

//     //   navigate("/");
//     // }, 3000);

//     // console.log("Registration data:", formData);
//   };

//   return (
//     <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 overflow-y-auto">
//       {/* Left side logo */}
//       <div className="w-full md:w-1/3 bg-[#2C394B] flex items-center justify-center p-8">
//         <img src={LOGO} alt="Logo" className="w-1/2 h-auto" />
//       </div>

//       {/* Right side form */}
//       <div className="w-full h-full md:w-2/3 p-6 md:p-8 flex flex-col overflow-y-auto">
//         <div className="bg-white p-8 rounded-lg shadow-lg mx-auto w-full">
//           <h1 className="text-2xl text-[#2C394B] font-semibold mb-6 text-center">
//             Welcome to Registration
//           </h1>

//           {/* notification and error message */}
//           {message.text && (
//             <div
//               className={`fixed top-24 left-2/3 w-fit transform -translate-x-1/2 z-10 py-4 rounded-md flex items-center justify-center text-md font-medium ${
//                 message.type === "success"
//                   ? "bg-[#C4F9E2] text-[#004434]"
//                   : "bg-[#F8D7DA] text-[#721C24]"
//               }`}
//             >
//               <span className="pr-3">
//                 <svg
//                   width={20}
//                   height={20}
//                   viewBox="0 0 20 20"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <circle
//                     cx={10}
//                     cy={10}
//                     r={10}
//                     fill={message.type === "success" ? "#00B078" : "#D9534F"}
//                   />

//                   <path
//                     fillRule="evenodd"
//                     clipRule="evenodd"
//                     d="M14.1203 6.78954C14.3865 7.05581 14.3865 7.48751 14.1203 7.75378L9.12026 12.7538C8.85399 13.02 8.42229 13.02 8.15602 12.7538L5.88329 10.4811C5.61703 10.2148 5.61703 9.78308 5.88329 9.51682C6.14956 9.25055 6.58126 9.25055 6.84753 9.51682L8.63814 11.3074L13.156 6.78954C13.4223 6.52328 13.854 6.52328 14.1203 6.78954Z"
//                     fill="white"
//                   />
//                 </svg>
//               </span>

//               {message.text}
//             </div>
//           )}
//           {/* progress bar */}
//           <div className="mb-6">
//             <div className="flex items-center">
//               <div className="flex-grow h-1 bg-gray-300">
//                 <div
//                   className="h-full bg-[#2C394B]"
//                   style={{
//                     width: `${((currentStep + 1) / steps.length) * 100}%`,
//                   }}
//                 />
//               </div>
//               <div className="ml-4 text-gray-600">
//                 {currentStep + 1} of {steps.length}
//               </div>
//             </div>
//             <div className="flex justify-between mt-3">
//               {steps.map((step, index) => (
//                 <div
//                   key={index}
//                   className={`text-center ${
//                     index <= currentStep ? "text-[#2C394B]" : "text-gray-400"
//                   }`}
//                 >
//                   <div>{step.title}</div>
//                   <div
//                     className={`h-1 ${
//                       index <= currentStep ? "bg-[#2C394B]" : "bg-gray-300"
//                     }`}
//                   ></div>
//                 </div>
//               ))}
//             </div>
//           </div>
//           {/* step head progress bar */}
//           {/* <div className="flex justify-between mb-4 flex-wrap">
//             {["Personal Details", "Education Details", "Document Details"].map(
//               (title, index) => (
//                 <span
//                   key={index}
//                   className={`cursor-pointer ${
//                     step === index + 1 ? "text-[#2C394B]" : "text-gray-400"
//                   } font-semibold`}
//                   onClick={() => setStep(index + 1)}
//                 >
//                   {title}
//                 </span>
//               )
//             )}
//           </div> */}

//           {/* Steps form: Render forms based on current step */}

//           <form onSubmit={handleSubmit}>
//             {/* Step 1: Personal Details */}
//             {currentStep === 0 && (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {/* First Name */}
//                 <InputField
//                   label="First Name"
//                   name="personalDetails.firstName"
//                   placeholder="Enter your first name"
//                   value={personalDetails.firstName}
//                   handleChange={handleChange}
//                 />
//                 {/* Last Name */}
//                 <InputField
//                   label="Last Name"
//                   name="personalDetails.lastName"
//                   placeholder="Enter your last name"
//                   value={personalDetails.lastName}
//                   handleChange={handleChange}
//                 />
//                 {/* Email */}
//                 <InputField
//                   label="Email"
//                   name="contactDetails.email"
//                   placeholder="Enter your email"
//                   type="email"
//                   value={formData.contactDetails.email}
//                   handleChange={handleChange}
//                 />
//                 {/* Phone */}
//                 <InputField
//                   label="Phone"
//                   name="contactDetails.phone"
//                   placeholder="Enter your phone number"
//                   type="text"
//                   value={formData.contactDetails.phone}
//                   handleChange={handleChange}
//                 />
//                 <div>
//                   {/* Verify Email Button */}
//                   <button
//                     type="button"
//                     onClick={handleVerifyEmail}
//                     disabled={isVerifying} // Disable button if email is not entered
//                     className="text-[#2C394B] bg-[#f1f5f9] border border-[#2C394B] hover:bg-[#2C394B] hover:text-[#f1f5f9] p-2 rounded"
//                   >
//                     Verify Email
//                   </button>
//                 </div>

//                 <div>
//                   {/* Verify Phone Button */}
//                   <button
//                     type="button"
//                     onClick={handleVerifyPhone}
//                     disabled={isVerifying} // Disable button if phone is not entered
//                     className="text-[#2C394B] bg-[#f1f5f9] border border-[#2C394B] hover:bg-[#2C394B] hover:text-[#f1f5f9] p-2 rounded"
//                   >
//                     Verify Phone
//                   </button>
//                 </div>

//                 {/* OTP Modal */}
//                 {otpModal && (
//                   <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
//                     <div className="bg-white p-6 rounded-md shadow-lg w-11/12 md:w-1/3">
//                       <h3 className="text-xl text-center mb-4">Enter OTP</h3>
//                       <input
//                         type="text"
//                         placeholder="Enter OTP"
//                         value={otp}
//                         onChange={(e) => setOtp(e.target.value)}
//                         className="w-full p-2 border border-gray-300 rounded-md mb-4"
//                         aria-label="OTP Input field"
//                         maxLength={6}
//                       />
//                       <button
//                         type="button"
//                         onClick={handleOtpVerification}
//                         className="w-full bg-[#337357] text-white py-2 rounded-md"
//                         disabled={!isVerifying}
//                       >
//                         {isVerifying ? "Verifying..." : "Verify OTP"}
//                       </button>
//                       <button
//                         type="button"
//                         onClick={() => {
//                           sendOtp("");
//                           setOtpModal(false);
//                         }}
//                         className="w-full bg-[#C62E2E] text-white py-2 rounded-md mt-2"
//                       >
//                         Close
//                       </button>
//                     </div>
//                   </div>
//                 )}

//                 {/* Gender */}
//                 <InputField
//                   label="Gender"
//                   name="personalDetails.gender"
//                   value={personalDetails.gender}
//                   handleChange={handleChange}
//                   component="select"
//                 >
//                   <option value="" disabled>
//                     Select Gender
//                   </option>
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                   <option value="Other">Other</option>
//                 </InputField>
//                 {/* Date of Birth */}
//                 <InputField
//                   label="Date of Birth"
//                   name="personalDetails.birthDate"
//                   value={personalDetails.birthDate}
//                   handleChange={handleChange}
//                   component="input"
//                   type="date"
//                 />
//                 {/* State Dropdown */}
//                 <InputField
//                   label="State"
//                   name="contactDetails.state"
//                   value={formData.contactDetails.state}
//                   handleChange={handleStateChange}
//                   component="select"
//                 >
//                   <option value="" disabled>
//                     Select State
//                   </option>
//                   {statesAndDistricts.states.map((state) => (
//                     <option key={state.state} value={state.state}>
//                       {state.state}
//                     </option>
//                   ))}
//                 </InputField>
//                 {/* District Dropdown */}
//                 <InputField
//                   label="District"
//                   name="contactDetails.city"
//                   value={formData.contactDetails.city}
//                   handleChange={handleDistrictChange}
//                   component="select"
//                 >
//                   <option value="" disabled>
//                     Select City
//                   </option>
//                   {districts.length > 0 &&
//                     districts.map((district) => (
//                       <option key={district} value={district}>
//                         {district}
//                       </option>
//                     ))}
//                 </InputField>

//                 <div className="relative">
//                   {/* Password Field */}
//                   <InputField
//                     label="Password *"
//                     name="accountDetails.password"
//                     placeholder="Password"
//                     type={showPassword ? "text" : "password"}
//                     value={accountDetails.password}
//                     handleChange={handleChange}
//                   />
//                   <span
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-9 cursor-pointer"
//                   >
//                     {showPassword ? <FiEyeOff /> : <FiEye />}
//                   </span>
//                 </div>

//                 <div className="relative">
//                   {/* Confirm Password Field */}
//                   <InputField
//                     label="Confirm Password *"
//                     name="accountDetails.confirmPassword"
//                     placeholder="Confirm Password"
//                     type={showConfirmPassword ? "text" : "password"}
//                     value={formData.accountDetails.confirmPassword}
//                     handleChange={handleChange}
//                   />
//                   <span
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     className="absolute right-3 top-9 cursor-pointer"
//                   >
//                     {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
//                   </span>
//                 </div>
//                 {/*  */}
//                 {/* <button
//                   onClick={completeStep}
//                   className="mt-4 bg-[#337357] text-white py-2 px-4 rounded"
//                 >
//                   Submit
//                 </button> */}
//               </div>
//             )}

//             {/* Step 2 : Education details */}

//             {currentStep === 1 && (
//               <div>
//                 {/* License Number */}
//                 <InputField
//                   label="License Number *"
//                   name="educationDetails.licenseNumber"
//                   placeholder="Enter License Number"
//                   value={formData.educationDetails.licenseNumber}
//                   handleChange={handleChange}
//                 />
//                 {/* Qualification */}
//                 <InputField
//                   label="Qualification *"
//                   name="educationDetails.qualification"
//                   placeholder="Enter Qualification"
//                   value={formData.educationDetails.qualification}
//                   handleChange={handleChange}
//                 />
//                 {/* Specialization */}
//                 <InputField
//                   label="Specialization"
//                   name="educationDetails.specialization"
//                   placeholder={"Enter Specialization"}
//                   value={formData.educationDetails.specialization}
//                   handleChange={handleChange}
//                 />
//                 {/* Experience */}
//                 <InputField
//                   label="Experience"
//                   name="educationDetails.experience"
//                   placeholder={"Enter Experience"}
//                   value={formData.educationDetails.experience}
//                   handleChange={handleChange}
//                 />
//                 <button
//                   onClick={completeStep}
//                   className="mt-4 bg-[#337357] text-white py-2 px-4 rounded"
//                 >
//                   Next
//                 </button>
//               </div>
//             )}

//             {/* Step 3 : Document details */}
//             {currentStep === 2 && (
//               <div className="grid grid-cols-3 gap-4">
//                 {/* Documentation Details */}
//                 <InputField
//                   label="Upload Profile Picture"
//                   name="documentation.profilePicture"
//                   type="file"
//                   handleChange={handleFileChange}
//                 />
//                 {/* Degree Certificate */}
//                 <InputField
//                   label="Upload Degree Certificate"
//                   name="documentation.degreeCertificate"
//                   type="file"
//                   handleChange={handleFileChange}
//                 />
//                 {/* Resume */}
//                 <InputField
//                   label="Upload Resume"
//                   name="documentation.resume"
//                   type="file"
//                   handleChange={handleFileChange}
//                 />
//                 {/* Aadhar Number */}
//                 <InputField
//                   label="Aadhar Number"
//                   name="documentation.aadharNumber"
//                   placeholder="Enter Aadhar Number"
//                   value={formData.documentation.aadharNumber}
//                   handleChange={handleChange}
//                 />
//                 {/* Aadhar Card */}
//                 <InputField
//                   label="Upload Aadhar Card Front"
//                   name="documentation.aadharFront"
//                   type="file"
//                   handleChange={handleFileChange}
//                 />
//                 {/* Aadhar Card */}
//                 <InputField
//                   label="Upload Aadhar Card Back *"
//                   name="documentation.aadharBack"
//                   type="file"
//                   handleChange={handleFileChange}
//                 />
//                 {/* PAN Number */}
//                 <InputField
//                   label="PAN Number *"
//                   name="documentation.panNumber"
//                   placeholder="Enter PAN Number"
//                   value={formData.documentation.panNumber}
//                   handleChange={handleChange}
//                 />
//                 {/* PAN Card */}
//                 <InputField
//                   label="Upload PAN Card *"
//                   name="documentation.panCard"
//                   type="file"
//                   handleChange={handleFileChange}
//                 />
//                 {/* Signature */}
//                 <InputField
//                   label="Upload Signature *"
//                   name="documentation.signature"
//                   type="file"
//                   handleChange={handleFileChange}
//                 />
//                 {/* check box */}
//                 <InputField
//                   label="professional Expertise"
//                   type="checkbox"
//                   name="professionalExpertise"
//                   options={[
//                     "Career Counsellor",
//                     "Psychologist",
//                     "Group Counsellor",
//                   ]}
//                   handleChange={(e) => {}}
//                 ></InputField>
//                 {/* Register Button */}
//                 <div className="mt-4 flex justify-center">
//                   <button
//                     type="submit"
//                     className="bg-[#2C394B] text-white w-fit h-fit py-2 px-4 rounded-md"
//                   >
//                     {loading ? "Registering..." : "Complete Registeration"}
//                   </button>
//                 </div>
//               </div>
//             )}
//            {/* Register Button */}
//            <div className="mt-4 flex justify-center">
//                   <button
//                     type="submit"
//                     onClick={handleSubmit}
//                     className="bg-[#2C394B] text-white w-fit h-fit py-2 px-4 rounded-md"
//                   >
//                     {loading ? "Registering..." : "Complete Registeration"}
//                     {step === 3 ? "Complete Registration" : "Next"}
//                   </button>
//                 </div>
//           </form>
//           {/* Login Link */}
//           <div className="absolute top-6 right-14 flex justify-center items-center mt-4">
//             <p className="text-sm text-[#2C394B]">Already have an account?</p>
//             <button
//               className="ml-2 text-md text-[#2C394B] hover:text-[#597aac] hover:translate-x-1 transition duration-200 ease-in-out flex items-center gap-1"
//               onClick={() => navigate("/")}
//             >
//               <FaArrowRightFromBracket />
//               Login
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const InputField = ({
//   label,
//   type = "text",
//   name,
//   placeholder,
//   handleChange,
//   value,
//   options = [],
//   component = "input",
//   ...props
// }) => {
//   return (
//     <div className="mb-4 flex flex-col">
//       <label htmlFor={name} className="block text-[#2C394B]">
//         {label}
//         {props.required && "*"}
//       </label>
//       {type === "checkbox" && options.length > 0 ? (
//         <div className="flex flex-col">
//           {options.map((option, index) => (
//             <label key={index} className="inline-flex items-center mt-1">
//               <input
//                 type="checkbox"
//                 name={name}
//                 value={option}
//                 onChange={handleChange}
//                 className="mr-2"
//               />
//               {option}
//             </label>
//           ))}
//         </div>
//       ) : (
//         React.createElement(component, {
//           id: name,
//           type,
//           name,
//           placeholder,
//           value,
//           onChange: handleChange,
//           className: "w-full p-2 border border-gray-300 rounded-md",
//           ...props,
//         })
//       )}
//     </div>
//   );
// };

// export default Registration;

import React, { useState } from "react";
import LOGO from "../assets/ollatoLogo.png";
import { useNavigate } from "react-router-dom";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { FiEye, FiEyeOff } from "react-icons/fi";
import statesAndDistricts from "../../public/states-and-districts.json";
import { useUser } from "../context/UserContext";

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

  const { user, profileComplete, login, setProfileComplete } = useUser();

  const steps = [
    { id: 1, title: "Personal Information" },
    { id: 2, title: "Professional Information" },
    { id: 3, title: "Documentation Profile" },
  ];

  const navigate = useNavigate();

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

  // Message handler function
  const handleMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  };

  // Step completion logic
  const completeStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setProfileComplete(true);
      navigate("/dashboard");
    }
  };

  // Input handler logic
  const handleChange = (e) => {
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
    if (!contactDetails.email) {
      handleMessage("Please enter an email address.", "error");
      return;
    }
    sendOtp("email");
  };

  // Phone verification handler
  const handleVerifyPhone = () => {
    if (!contactDetails.phone) {
      handleMessage("Please enter a phone number.", "error");
      return;
    }
    sendOtp("phone");
  };

  // Function to send OTP
  const sendOtp = async (type) => {
    const url = apiUrls.sendOtp[type];
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type }), // Send the type to the API
      });

      if (response.ok) {
        handleMessage("OTP sent successfully!", "success");
        setOtpModal(true);
      } else {
        throw new Error("Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      handleMessage("Error sending OTP. Please try again.", "error");
    }
  };

  // OTP verification logic
  const handleOtpVerification = async () => {
    if (!otp || otp.length !== 6) {
      handleMessage("Please enter a valid 6-digit OTP.", "error");
      return;
    }

    setIsVerifying(true); // Show verifying UI
    const isOtpValid = otp === "123456"; // Simulated OTP validation

    if (isOtpValid) {
      handleMessage("OTP verified successfully!", "success");
      setOtpModal(false); // Close the modal
      setOtp(""); // Clear OTP input
      completeStep(); // Proceed to next step
    } else {
      handleMessage("Invalid OTP. Please try again.", "error");
    }
    setIsVerifying(false);
  };

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

    // Validation logic
    if (currentStep === 3) {
      // Verify Document fields here
      // Assuming validations passed
      // Proceed to submit

      setLoading(true);
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          handleMessage("Registration successful!", "success");
          if (currentStep === steps.length) {
            login({});
            navigate("/dashboard");
          } else {
            setCurrentStep(currentStep + 1);
          }
        } else {
          const errorData = await response.json();
          handleMessage(errorData.message || "Registration failed.", "error");
        }
      } catch (error) {
        console.error("Error during registration:", error);
        handleMessage("An error occurred during registration.", "error");
      } finally {
        setLoading(false);
      }
    } else {
      completeStep();
    }
  };

  // Render UI
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 overflow-y-auto">
      <div className="w-full md:w-1/3 bg-[#2C394B] flex items-center justify-center p-8">
        <img src={LOGO} alt="Logo" className="w-1/2 h-auto" />
      </div>

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
          <div className="mb-6">
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
                />
                <InputField
                  label="Last Name"
                  name="personalDetails.lastName"
                  placeholder="Enter your last name"
                  value={personalDetails.lastName}
                  handleChange={handleChange}
                />
                <InputField
                  label="Email"
                  name="contactDetails.email"
                  placeholder="Enter your email"
                  type="email"
                  value={contactDetails.email}
                  handleChange={handleChange}
                />
                <InputField
                  label="Phone"
                  name="contactDetails.phone"
                  placeholder="Enter your phone number"
                  type="text"
                  value={contactDetails.phone}
                  handleChange={handleChange}
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
                />
                <InputField
                  label="State"
                  name="contactDetails.state"
                  value={contactDetails.state}
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
                  label="District"
                  name="contactDetails.city"
                  value={contactDetails.city}
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
                <div className="relative">
                  <InputField
                    label="Password *"
                    name="accountDetails.password"
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    value={accountDetails.password}
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
                    label="Confirm Password *"
                    name="accountDetails.confirmPassword"
                    placeholder="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={accountDetails.confirmPassword}
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
