import { useEffect, useState } from "react";
import { useAuth } from "../context/UserContext";
import InputField from "../components/InputField";
import { useNavigate } from "react-router-dom";

const RegistrationDetails = () => {
  // State for professional details (Step 1)
  const [educationDetails, setEducationDetails] = useState({
    licenseNumber: "",
    qualification: "",
    specification: "",
    experience: "",
  });

  // State for documentation details (Step 2)
  const [documentation, setDocumentation] = useState({
    profilePic: null,
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

  const { setProfileComplete } = useAuth(); // Context for user profile completion
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1); // Track current registration step
  const [message, setMessage] = useState({ text: "", type: "" });
  const [stepLocked, setStepLocked] = useState(false); // Lock steps once submitted

  // Backend API endpoints
  const professionalDetailsURL = import.meta.env.VITE_PROFESSIONAL_DELAILS_API;
  const documentationURL = import.meta.env.VITE_DOCUMENTS_UPLOAD_API;
  // console.log("professionalDetailsURL", professionalDetailsURL);
  // console.log("documentationURL", documentationURL);

  // Steps for progress tracking
  const steps = [
    { id: 1, title: "Professional Information" },
    { id: 2, title: "Documentation Profile" },
  ];

  // Check if step 1 or 2  is completed and redirect to dashboard
  useEffect(() => {
    const step1Completed = localStorage.getItem("step1Completed");
    const step2Completed = localStorage.getItem("step2Completed");
    if (step1Completed === "true") {
      setCurrentStep(2);
    }else if(step2Completed === "true"){
      navigate("/dashboard");
    }else{
      navigate("dashboard");
    }
  }, []);

  // Calculate progress percentage
  const progressPercentage = (currentStep / steps.length) * 100;

  // Navigate between steps
  const handleStepClick = (stepId) => {
    if (stepId <= currentStep && !stepLocked) {
      setCurrentStep(stepId);
    }
  };

  // Handle input change for text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDocumentation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file changes for file inputs
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setDocumentation((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    }
  };

  // Handle checkbox changes for expertise options
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setDocumentation((prev) => ({
      ...prev,
      expertise: {
        ...prev.expertise,
        [name]: checked,
      },
    }));
    // console.log("Checkbox changed:", name, checked);
  };

  // Submit professional details (Step 1)
  const handleProfessionalSubmit = async (e) => {
    e.preventDefault();

    // Ensure step is not locked
    if (stepLocked) {
      setCurrentStep(2);
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.user_id;

    // Validate user session
    if (!userId) {
      handleMessage("User is not logged in. Please log in again.", "error");
      return;
    }

    // Validate inputs
    if (
      !educationDetails.licenseNumber ||
      !educationDetails.qualification ||
      !educationDetails.specification ||
      !educationDetails.experience
    ) {
      handleMessage("Please fill all required fields.", "error");
      return;
    }
    try {
      const response = await fetch(professionalDetailsURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          license_number: educationDetails.licenseNumber,
          qualification: educationDetails.qualification,
          specification: educationDetails.specification,
          experience: educationDetails.experience,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        localStorage.setItem("step1Completed", "true");
        handleMessage(
          "Professional details submitted successfully!",
          "success"
        );
        setCurrentStep(2); // Move to step 2
      } else {
        const errorData = await response.json();
        handleMessage(errorData.message, "error");
      }
    } catch (error) {
      console.error("Error during professional details submission", error);
    }
  };

  // Submit documentation details (Step 2)
  const handleDocumentationSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.user_id;

    // Validate user session
    if (!userId) {
      handleMessage("User is not logged in. Please log in again.", "error");
      return;
    }

    // Validate inputs
    if (
      !documentation.profilePic ||
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

    // Prepare FormData for submission
    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("profile_pic", documentation.profilePic);
    formData.append("degree_certificate", documentation.degreeCertificate);
    formData.append("resume", documentation.resume);
    formData.append("aadhar_number", documentation.aadharNumber);
    formData.append("aadhar_card_front", documentation.aadharFront);
    formData.append("aadhar_card_back", documentation.aadharBack);
    formData.append("pan_number", documentation.panNumber);
    formData.append("pan_card", documentation.panCard);
    formData.append("signature", documentation.signature);
    formData.append(
      "professional_expertise",
      JSON.stringify(documentation.expertise)
    );

    // Submit to backend
    try {
      const response = await fetch(documentationURL, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        handleMessage("Documentation submitted successfully!", "success");
        setProfileComplete(true);
        localStorage.setItem("step2Completed", "true");
        navigate("/dashboard");
      } else {
        const errorData = await response.json();
        handleMessage(errorData.message, "error");
      }
    } catch (error) {
      console.error("Error during documentation submission", error);
    }
  };

  // Display messages to the user
  const handleMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  };

  return (
    <div className="w-full h-full p-10 md:p-8 flex flex-col overflow-y-auto ml-40">
      <div className="bg-white p-8 rounded-lg shadow-lg mx-auto w-full">
        <h1 className="text-2xl text-[#2C394B] font-semibold mb-6 text-center">
          Registration
        </h1>

        {/* Display messages */}
        {message.text && (
          <div
            className={`fixed top-24 left-1/2 transform -translate-x-1/2 z-10 py-4 rounded-md text-md font-medium ${
              message.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Steps */}
        <div className="mb-6">
          <div className="flex items-center mb-3">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`flex-1 text-center cursor-pointer ${
                  step.id === currentStep
                    ? "text-[#2C394B]"
                    : step.id < currentStep
                    ? "text-green-500"
                    : "text-gray-400"
                }`}
                onClick={() => handleStepClick(step.id)}
              >
                {step.title}
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

        {/* Step 1: Professional Details */}
        {currentStep === 1 && (
          <form
            onSubmit={handleProfessionalSubmit}
            className="grid grid-cols-2 gap-4 p-10"
          >
            <InputField
              label="License Number *"
              name="licenseNumber"
              placeholder="Enter License Number"
              value={educationDetails.licenseNumber}
              handleChange={(e) =>
                setEducationDetails((prev) => ({
                  ...prev,
                  licenseNumber: e.target.value,
                }))
              }
            />
            <InputField
              label="Qualification *"
              name="qualification"
              placeholder="Enter Qualification"
              value={educationDetails.qualification}
              handleChange={(e) =>
                setEducationDetails((prev) => ({
                  ...prev,
                  qualification: e.target.value,
                }))
              }
            />
            <InputField
              label="specification *"
              name="specification"
              placeholder="Enter specification"
              value={educationDetails.specification}
              handleChange={(e) =>
                setEducationDetails((prev) => ({
                  ...prev,
                  specification: e.target.value,
                }))
              }
            />
            <InputField
              label="Experience *"
              name="experience"
              placeholder="Enter Experience"
              value={educationDetails.experience}
              handleChange={(e) =>
                setEducationDetails((prev) => ({
                  ...prev,
                  experience: e.target.value,
                }))
              }
            />
            <div className="col-span-2 flex justify-center mt-6">
              <button
                type="submit"
                className="bg-[#337357] text-white py-2 px-6 rounded hover:bg-[#285b45] transition duration-200"
              >
                Next
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Documentation Details */}
        {currentStep === 2 && (
          <form
            onSubmit={handleDocumentationSubmit}
            className="grid grid-cols-2 gap-4 p-10"
          >
            <InputField
              label="Upload Profile Picture *"
              name="profilePic"
              type="file"
              handleChange={handleFileChange}
            />
            <InputField
              label="Upload Degree Certificate *"
              name="degreeCertificate"
              type="file"
              handleChange={handleFileChange}
            />
            <InputField
              label="Upload Resume *"
              name="resume"
              type="file"
              handleChange={handleFileChange}
            />
            <InputField
              label="Aadhar Number *"
              name="aadharNumber"
              placeholder="Enter Aadhar Number"
              value={documentation.aadharNumber}
              handleChange={handleChange}
            />
            <InputField
              label="Upload Aadhar Card Front *"
              name="aadharFront"
              type="file"
              handleChange={handleFileChange}
            />
            <InputField
              label="Upload Aadhar Card Back *"
              name="aadharBack"
              type="file"
              handleChange={handleFileChange}
            />
            <InputField
              label="PAN Number *"
              name="panNumber"
              placeholder="Enter PAN Number"
              value={documentation.panNumber}
              handleChange={handleChange}
            />
            <InputField
              label="Upload PAN Card *"
              name="panCard"
              type="file"
              handleChange={handleFileChange}
            />
            <InputField
              label="Upload Signature *"
              name="signature"
              type="file"
              handleChange={handleFileChange}
            />

            <div className="col-span-2">
              <label className="block font-medium text-gray-700 mb-2">
                Professional Expertise *
              </label>
              <div className="flex flex-wrap gap-4 ">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="careerCounsellor"
                    checked={documentation.expertise.careerCounsellor}
                    onChange={handleCheckboxChange}
                  />
                  <span>Career Counsellor</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="psychologist"
                    checked={documentation.expertise.psychologist}
                    onChange={handleCheckboxChange}
                  />
                  <span>Psychologist</span>
                </label>
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

            <div className="col-span-2 flex justify-center mt-6">
              <button
                type="submit"
                className="bg-[#337357] text-white py-2 px-6 rounded hover:bg-[#285b45] transition duration-200"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegistrationDetails;
