const getRazorpayInstance = (options) => {
  if (window.Razorpay) {
    return new window.Razorpay(options);
  }
  throw new Error("Razorpay SDK not loaded");
};

export default getRazorpayInstance;
