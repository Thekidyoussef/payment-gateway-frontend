// script.js

// Replace this with your live Heroku backend URL
const backendURL = "https://backend-getway-92448bc220e7.herokuapp.com/";

// Function to handle form submission
async function handlePayment(event) {
  event.preventDefault();

  // Collect form data
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const amount = document.getElementById("amount").value;

  // Create a payment request object
  const paymentData = {
    name,
    email,
    amount,
  };

  try {
    // Send payment data to the backend
    const response = await fetch(`${backendURL}/process-payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    });

    const result = await response.json();

    if (response.ok) {
      // Payment was successful
      alert(`Payment successful! Transaction ID: ${result.transactionId}`);
    } else {
      // Handle errors from the backend
      alert(`Payment failed: ${result.message}`);
    }
  } catch (error) {
    // Handle network or other errors
    console.error("Error processing payment:", error);
    alert("An error occurred while processing your payment. Please try again.");
  }
}

// Attach event listener to the form
document
  .getElementById("payment-form")
  .addEventListener("submit", handlePayment);
