document.getElementById("payment-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const cardholderName = document.getElementById("cardholder-name").value;
    const cardNumber = document.getElementById("card-number").value;
    const expiryDate = document.getElementById("expiry-date").value;
    const cvv = document.getElementById("cvv").value;

    // Display loading spinner
    const loading = document.getElementById("loading");
    const message = document.getElementById("message");
    loading.style.display = "block";
    message.innerHTML = "";

    // Encrypt sensitive data
    const paymentData = {
        cardholderName,
        cardNumber,
        expiryDate,
        cvv,
    };

    const encryptedData = CryptoJS.AES.encrypt(
        JSON.stringify(paymentData),
        "secure-key"
    ).toString();

    // Send to backend
    try {
        const response = await fetch("https://backend-getway-92448bc220e7.herokuapp.com/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ data: encryptedData }),
        });

        const result = await response.json();
        loading.style.display = "none";
        message.innerHTML = `<p>${result.message}</p>`;
    } catch (error) {
        loading.style.display = "none";
        message.innerHTML = `<p style="color: red;">An error occurred. Please try again.</p>`;
    }
}