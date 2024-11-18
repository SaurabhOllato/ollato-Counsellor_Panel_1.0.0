import React from "react";
import PropTypes from "prop-types";
import "./Notification.css";

const Notification = ({ message, type }) => {
  if (!message) return null; // Render nothing if no message is provided

  return (
    <div
      className={`notification ${
        type === "success" ? "notification-success" : "notification-error"
      }`}
    >
      <span className="icon">
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
            fill={type === "success" ? "#00B078" : "#D9534F"}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.1203 6.78954C14.3865 7.05581 14.3865 7.48751 14.1203 7.75378L9.12026 12.7538C8.85399 13.02 8.42229 13.02 8.15602 12.7538L5.88329 10.4811C5.61703 10.2148 5.61703 9.78308 5.88329 9.51682C6.14956 9.25055 6.58126 9.25055 6.84753 9.51682L8.63814 11.3074L13.156 6.78954C13.4223 6.52328 13.854 6.52328 14.1203 6.78954Z"
            fill="white"
          />
        </svg>
      </span>
      <span>{message}</span>
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string.isRequired, // Notification message
  type: PropTypes.oneOf(["success", "error"]), // Notification type: "success" or "error"
};

export default Notification;
