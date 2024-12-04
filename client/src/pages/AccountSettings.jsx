// import React, { useState } from "react";
// import { FiEye, FiEyeOff } from "react-icons/fi";

// const AccountSettings = () => {
//   const [profileData, setProfileData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//     profilePicture: "",
//   });

//   const [profilePreview, setProfilePreview] = useState(null);
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
//   const [activeSection, setActiveSection] = useState("Profile");

//   // Handle input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setProfileData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle profile picture upload
//   const handleProfilePictureChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setProfileData((prev) => ({ ...prev, profilePicture: file }));
//       const reader = new FileReader();
//       reader.onload = () => setProfilePreview(reader.result);
//       reader.readAsDataURL(file);
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (profileData.password !== profileData.confirmPassword) {
//       alert("Passwords do not match.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("firstName", profileData.firstName);
//     formData.append("lastName", profileData.lastName);
//     formData.append("email", profileData.email);
//     formData.append("phone", profileData.phone);
//     formData.append("password", profileData.password);
//     if (profileData.profilePicture) {
//       formData.append("profilePicture", profileData.profilePicture);
//     }

//     try {
//       const response = await fetch("https://api.example.com/update-profile", {
//         method: "POST",
//         body: formData,
//       });
//       if (response.ok) {
//         alert("Profile updated successfully!");
//       } else {
//         alert("Failed to update profile.");
//       }
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       alert("An error occurred.");
//     }
//   };

//   return (
//     <section className="max-w-3xl mx-auto bg-white shadow-md p-6 rounded-lg mt-8">
//       {/* Navigation between sections */}
//       <div className="flex items-center mb-3 border-b border-gray-200">
//         {["Profile", "Password", "Contact"].map((section) => (
//           <div
//             key={section}
//             onClick={() => setActiveSection(section)}
//             className={`flex-1 text-center cursor-pointer text-[#2C394B] font-semibold
//               ${activeSection === section ? "border-b-2 border-blue-500" : ""}`}
//           >
//             {section}
//           </div>
//         ))}
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Profile Section */}
//         {activeSection === "Profile" && (
//           <>
//             <div>
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-800 mb-6">
//                   Edit Profile Picture
//                 </h1>
//                 <div className="flex items-center">
//                   <div className="relative">
//                     <img
//                       src={
//                         profilePreview ||
//                         "https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg"
//                       }
//                       alt="Profile"
//                       className="w-20 h-20 rounded-full border border-gray-300"
//                     />
//                     <label
//                       htmlFor="profilePicture"
//                       className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full cursor-pointer"
//                     >
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         strokeWidth="2"
//                         stroke="currentColor"
//                         className="w-5 h-5"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           d="M5 13l4 4L19 7"
//                         />
//                       </svg>
//                     </label>
//                   </div>
//                   <input
//                     type="file"
//                     id="profilePicture"
//                     accept="image/*"
//                     className="hidden"
//                     onChange={handleProfilePictureChange}
//                   />
//                 </div>
//               </div>

//               <div className="mb-4">
//                 <div className="flex items-center justify-between mb-4">
//                   <label htmlFor="firstName">First Name</label>
//                   <input
//                     type="text"
//                     id="firstName"
//                     value={profileData.firstName}
//                     name="firstName"
//                     onChange={handleInputChange}
//                     className=" p-2 border border-gray-300 rounded"
//                   />
//                 </div>
//                 <div className="flex items-center justify-between mb-4">
//                   <label htmlFor="firstName">Last Name</label>
//                   <input
//                     type="text"
//                     id="firstName"
//                     value={profileData.lastName}
//                     name="lastName"
//                     onChange={handleInputChange}
//                     className=" p-2 border border-gray-300 rounded"
//                   />
//                 </div>
//               </div>
//             </div>
//           </>
//         )}

//         {/* Password Section */}
//         {activeSection === "Password" && (
//           <>
//             <h1 className="text-2xl font-bold text-gray-800 mb-6">
//               Change Password
//             </h1>
//             <div>
//               <label className="block text-gray-600">Password</label>
//               <div className="relative">
//                 <input
//                   type={passwordVisible ? "text" : "password"}
//                   name="password"
//                   value={profileData.password}
//                   onChange={handleInputChange}
//                   className="w-full p-3 border rounded-lg"
//                   required
//                 />
//                 <span
//                   onClick={() => setPasswordVisible(!passwordVisible)}
//                   className="absolute right-3 top-3 cursor-pointer"
//                 >
//                   {passwordVisible ? <FiEye /> : <FiEyeOff />}
//                 </span>
//               </div>
//             </div>

//             <div>
//               <label className="block text-gray-600">Confirm Password</label>
//               <div className="relative">
//                 <input
//                   type={confirmPasswordVisible ? "text" : "password"}
//                   name="confirmPassword"
//                   value={profileData.confirmPassword}
//                   onChange={handleInputChange}
//                   className="w-full p-3 border rounded-lg"
//                   required
//                 />
//                 <span
//                   onClick={() =>
//                     setConfirmPasswordVisible(!confirmPasswordVisible)
//                   }
//                   className="absolute right-3 top-3 cursor-pointer"
//                 >
//                   {confirmPasswordVisible ? <FiEye /> : <FiEyeOff />}
//                 </span>
//               </div>
//             </div>
//           </>
//         )}

//         {/* Contact Section */}
//         {activeSection === "Contact" && (
//           <>
//             <h1 className="text-2xl font-bold text-gray-800 mb-6">
//               Update Contact Information
//             </h1>
//             <div>
//               <label className="block text-gray-600">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={profileData.email}
//                 onChange={handleInputChange}
//                 className="w-full p-3 border rounded-lg"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block text-gray-600">Phone</label>
//               <input
//                 type="tel"
//                 name="phone"
//                 value={profileData.phone}
//                 onChange={handleInputChange}
//                 className="w-full p-3 border rounded-lg"
//                 required
//               />
//             </div>
//           </>
//         )}

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
//         >
//           Save Changes
//         </button>
//       </form>
//     </section>
//   );
// };

// export default AccountSettings;

import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNotification } from "../context/NotificationContext";
import SupportForm from "../components/SupportForm";

const AccountSettings = () => {
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    profilePicture: "",
  });

  const [profilePreview, setProfilePreview] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("Profile");
  const { triggerNotification } = useNotification();

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle profile picture upload
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileData((prev) => ({ ...prev, profilePicture: file }));
      const reader = new FileReader();
      reader.onload = () => setProfilePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (profileData.password !== profileData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const formData = new FormData();
    formData.append("firstName", profileData.firstName);
    formData.append("lastName", profileData.lastName);
    formData.append("email", profileData.email);
    formData.append("phone", profileData.phone);
    formData.append("password", profileData.password);
    if (profileData.profilePicture) {
      formData.append("profilePicture", profileData.profilePicture);
    }

    try {
      // const response = await fetch("https://api.example.com/update-profile", {
      //   method: "POST",
      //   body: formData,
      // });

      const response = {
        ok: true,
      };

      if (response.ok) {
        triggerNotification("Profile updated successfully!", "success");
      } else {
        triggerNotification("Failed to update profile.", "error");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      triggerNotification("An error occurred.", "error");
    }
  };

  return (
    <section className="max-w-4xl mx-auto bg-white shadow-lg p-8 pt-4 rounded-lg">
      {/* Navigation between sections */}
      <div className="flex items-center mb-6 border-b border-gray-300">
        {["Profile", "Password", "Contact"].map((section) => (
          <div
            key={section}
            onClick={() => setActiveSection(section)}
            className={`flex-1 text-center cursor-pointer text-lg font-medium text-gray-700 py-2 
              ${
                activeSection === section
                  ? "border-b-4 border-[#387478] text-[#387478]"
                  : ""
              }`}
          >
            {section}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 p-8">
        {/* Profile Section */}
        {activeSection === "Profile" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Edit Profile
            </h2>
            <div className="flex items-center mb-6">
              <div className="relative">
                <img
                  src={profilePreview || "https://via.placeholder.com/100"}
                  alt="Profile"
                  className="w-24 h-24 rounded-full border border-gray-300 object-cover"
                />
                <label
                  htmlFor="profilePicture"
                  className="absolute bottom-0 right-0 bg-[#1E3E62] text-white p-2 rounded-full cursor-pointer shadow"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </label>
              </div>
              <input
                type="file"
                id="profilePicture"
                accept="image/*"
                className="hidden"
                onChange={handleProfilePictureChange}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-600">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={profileData.firstName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-gray-600">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={profileData.lastName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </div>
        )}

        {/* Password Section */}
        {activeSection === "Password" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Change Password
            </h2>
            <div className="mb-6">
              <label className="block text-gray-600">Password</label>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  value={profileData.password}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
                <span
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute right-3 top-3 text-gray-500 cursor-pointer"
                >
                  {passwordVisible ? <FiEye /> : <FiEyeOff />}
                </span>
              </div>
            </div>
            <div>
              <label className="block text-gray-600">Confirm Password</label>
              <div className="relative">
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  name="confirmPassword"
                  value={profileData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
                <span
                  onClick={() =>
                    setConfirmPasswordVisible(!confirmPasswordVisible)
                  }
                  className="absolute right-3 top-3 text-gray-500 cursor-pointer"
                >
                  {confirmPasswordVisible ? <FiEye /> : <FiEyeOff />}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Contact Section */}
        {activeSection === "Contact" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Update Contact Information
            </h2>
            <div>
              <label className="block text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-600">Phone</label>
              <input
                type="tel"
                name="phone"
                value={profileData.phone}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-fit bg-[#1E3E62] text-white py-3 px-2 rounded-lg font-semibold hover:bg-[#243642] transition duration-300 mx-auto"
        >
          Save Changes
        </button>
      </form>
    </section>
  );
};

export default AccountSettings;
