const OtpModal = ({
  otp,
  setOtp,
  handleOtpVerification,
  setOtpModal,
  isVerifying,
}) => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
    <div className="bg-white p-6 rounded-md shadow-lg w-11/12 md:w-1/3">
      <h3 className="text-xl text-center mb-4">Enter OTP</h3>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md mb-4"
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
);

export default OtpModal;
