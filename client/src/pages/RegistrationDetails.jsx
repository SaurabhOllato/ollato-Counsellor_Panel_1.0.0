import { useState } from "react";
import { useAuth } from "../context/UserContext";
import InputField from "../components/InputField"; // Assuming InputField is your component
import LOGO from "../assets/ollatoLogo.png"; // Assuming your logo path is correct
import { useNavigate } from "react-router-dom";

const RegistrationDetails = () => {
  const [educationDetails, setEducationDetails] = useState({
    licenseNumber: "",
    qualification: "",
    specialization: "",
    experience: "",
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

  const { setProfileComplete } = useAuth();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1); // Track the current step
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  // URLs for the APIs
  const professionalDetailsURL = import.meta.env.VITE_PROFESSIONAL_DELAILS_API;
  const documentationURL = import.meta.env.VITE_DOCUMENTS_UPLOAD_API;

  // Steps
  const steps = [
    { id: 1, title: "Professional Information" },
    { id: 2, title: "Documentation Profile" },
  ];

  // Calculate progress
  const progressPercentage = (currentStep / steps.length) * 100;

  const handleStepClick = (stepId) => {
    if (stepId <= currentStep) {
      setCurrentStep(stepId); // Allow moving to earlier steps
    }
  };

  // Complete current step and move to the next
  const completeStep = () => {
    if (currentStep === steps.length) {
      setProfileComplete(true); // Mark profile as complete
      navigate("/dashboard"); // Redirect to dashboard
    } else {
      setCurrentStep(currentStep + 1); // Move to next step
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split("."); // Handle nested state updates

    // Set the new value in the nested state
    if (name.startsWith("educationDetails")) {
      setEducationDetails((prev) => ({ ...prev, [keys[1]]: value }));
    } else if (name.startsWith("documentation")) {
      setDocumentation((prev) => ({ ...prev, [keys[1]]: value }));
    }
  };

  // Handle file changes
  //   const handleFileChange = (e) => {
  //     const { name, files } = e.target;
  //     if (name.startsWith("documentation")) {
  //       setDocumentation((prev) => ({ ...prev, [name]: files[0] }));
  //     }
  //   };

  const handleFileChange = (e) => {
    const { name, files } = e.target;

    if (files && files[0]) {
      setDocumentation((prev) => ({
        ...prev,
        [name]: files[0], // Update the field with the selected file
      }));
    }
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setDocumentation((prev) => ({
      ...prev,
      expertise: {
        ...prev.expertise,
        [name]: checked, // Update the state based on checkbox selection
      },
    }));
  };

  // Submit professional details (step 1)
  const handleProfessionalSubmit = async (e) => {
    e.preventDefault();
    // console.log("Submitting professional details:", educationDetails);

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.user_id;
    // console.log("User ID:", userId);

    // Check if user ID exists

    if (!userId) {
      handleMessage("User is not logged in. Please log in again.", "error");

      return;
    }

    if (
      !educationDetails.licenseNumber ||
      !educationDetails.qualification ||
      !educationDetails.experience ||
      !educationDetails.specialization
    ) {
      handleMessage("Please fill all required fields.", "error");
      return;
    }

    const { licenseNumber, qualification, specialization, experience } =
      educationDetails;
    try {
      const response = await fetch(professionalDetailsURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          license_number: licenseNumber,
          qualification: qualification,
          specification: specialization,
          experience: experience,
        }),
      });

      if (response.ok) {
        handleMessage(
          "Professional details submitted successfully!",
          "success"
        );
        completeStep(); // Move to the next step
      } else {
        const errorData = await response.json();
        handleMessage(errorData.message, "error");
      }
    } catch (error) {
      console.error("Error during professional details submission", error);
    }
    console.log("Professional details sent to backend:", educationDetails);
  };

  // Submit documentation details (step 2)
  const handleDocumentationSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting documentation details:", documentation);

    if (
      !documentation.degreeCertificate ||
      !documentation.resume ||
      !documentation.aadharNumber ||
      !documentation.aadharFront ||
      !documentation.aadharBack ||
      !documentation.panNumber ||
      !documentation.panCard ||
      !documentation.signature
    ) {
      handleMessage(
        "Please fill all required fields and upload all documents.",
        "error"
      );

      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));

    const userId = user?.user_id;
    console.log("User ID:", userId);

    if (!userId) {
      handleMessage("User is not logged in. Please log in again.", "error");

      return;
    }

    console.log("Degree Certificate:", documentation.degreeCertificate);
    console.log("Resume:", documentation.resume);
    console.log("Aadhar Front:", documentation.aadharFront);
    console.log("Aadhar Back:", documentation.aadharBack);
    console.log("PAN Card:", documentation.panCard);
    console.log("Signature:", documentation.signature);

    try {
      // Prepare FormData payload for file uploads

      const formData = new FormData();

      formData.append("user_id", userId);
      formData.append("degreeCertificate", documentation.degreeCertificate);
      formData.append("resume", documentation.resume);
      formData.append("aadharNumber", documentation.aadharNumber);
      formData.append("aadharFront", documentation.aadharFront);
      formData.append("aadharBack", documentation.aadharBack);
      formData.append("panNumber", documentation.panNumber);
      formData.append("panCard", documentation.panCard);
      formData.append("signature", documentation.signature);

      // Append expertise as JSON string
      formData.append("expertise", JSON.stringify(documentation.expertise));
      console.log("documentation-data-frontend", formData);

      const response = await fetch(documentationURL, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        handleMessage("Documentation submitted successfully!", "success");
        completeStep();
      } else {
        const errorData = await response.json();
        handleMessage(errorData.message, "error");
      }
    } catch (error) {
      console.error("Error during documentation submission", error);
    }
    console.log("documentation-data-frontend", formData);
  };

  // Message handler
  const handleMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 3000); // Reset message after 3 seconds
  };

  return (
    <div className="w-full h-full p-10 md:p-8 flex flex-col overflow-y-auto ml-40">
      <div className="bg-white p-8 rounded-lg shadow-lg mx-auto w-full">
        <h1 className="text-2xl text-[#2C394B] font-semibold mb-6 text-center">
          Registration
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

        {/* Steps and Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center mb-3">
            {steps.map((step) => (
              <div
                key={step.id}
                className="flex-1 text-center cursor-pointer"
                onClick={() => handleStepClick(step.id)}
              >
                <span
                  className={`text-sm font-medium ${
                    step.id === currentStep
                      ? "text-[#2C394B]"
                      : step.id < currentStep
                      ? "text-green-500"
                      : "text-gray-400"
                  }`}
                >
                  {step.title}
                </span>
              </div>
            ))}
          </div>
          <div className="relative h-2 bg-gray-300 rounded">
            <div
              className="absolute h-full bg-[#2C394B] rounded"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Professional Details Form (Step 1) */}
        {currentStep === 1 && (
          <form onSubmit={handleProfessionalSubmit}>
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
                placeholder="Enter Specialization"
                value={educationDetails.specialization}
                handleChange={handleChange}
              />
              <InputField
                label="Experience"
                name="educationDetails.experience"
                placeholder="Enter Experience"
                value={educationDetails.experience}
                handleChange={handleChange}
              />
              <button
                type="submit"
                className="mt-4 bg-[#337357] text-white py-2 px-4 rounded"
              >
                Next
              </button>
            </div>
          </form>
        )}

        {/* Documentation Details Form (Step 2) */}
        {currentStep === 2 && (
          <form onSubmit={handleDocumentationSubmit}>
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
                label="Upload Aadhar Card Back"
                name="documentation.aadharBack"
                type="file"
                handleChange={handleFileChange}
              />
              <InputField
                label="PAN Number"
                name="documentation.panNumber"
                placeholder="Enter PAN Number"
                value={documentation.panNumber}
                handleChange={handleChange}
              />
              <InputField
                label="Upload PAN Card"
                name="documentation.panCard"
                type="file"
                handleChange={handleFileChange}
              />
              <InputField
                label="Upload Signature"
                name="documentation.signature"
                type="file"
                handleChange={handleFileChange}
              />
              {/* Checkbox Inputs */}
              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Professional Expertise *
                </label>
                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="careerCounsellor"
                      checked={documentation.expertise.careerCounsellor}
                      onChange={handleCheckboxChange}
                    />
                    <span>Career Counsellor</span>
                  </label>
                </div>
                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="psychologist"
                      checked={documentation.expertise.psychologist}
                      onChange={handleCheckboxChange}
                    />
                    <span>Psychologist</span>
                  </label>
                </div>
                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="groupCounsellor"
                      checked={documentation.expertise.groupCounsellor}
                      onChange={handleCheckboxChange}
                    />
                    <span>Group Counsellor</span>
                  </label>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 bg-[#337357] text-white py-2 px-4 rounded"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegistrationDetails;
