import brevo from "@getbrevo/brevo";

const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
    brevo.TransactionalEmailsApiApiKeys.apiKey,
    process.env.BREVO_API_KEY
);

const sendOTP = async (email, otp) => {
    try {
        const sendSmtpEmail = new brevo.SendSmtpEmail();

        sendSmtpEmail.sender = {
            name: "ShelfWise Library",
            email: process.env.BREVO_SENDER_EMAIL,
        };

        sendSmtpEmail.to = [
            {
                email: email,
            },
        ];

        sendSmtpEmail.subject = "Verify your email - ShelfWise Library";

        sendSmtpEmail.htmlContent = `
      <div style="font-family: Arial, sans-serif; padding:20px;">
        <h2>ShelfWise Library</h2>

        <p>Hello,</p>

        <p>Your One-Time Password (OTP) is:</p>

        <h1 style="letter-spacing:5px;color:#2563eb;">
          ${otp}
        </h1>

        <p>This OTP is valid for <strong>10 minutes</strong>.</p>

        <p>If you did not request this OTP, you can safely ignore this email.</p>

        <hr>

        <small>© ShelfWise Library Management System</small>
      </div>
    `;

        await apiInstance.sendTransacEmail(sendSmtpEmail);

        console.log("OTP email sent successfully.");
    } catch (error) {
        console.error("Brevo API Error:");

        if (error.response) {
            console.error(error.response.text || error.response.body);
        } else {
            console.error(error);
        }

        throw error;
    }
};

export default sendOTP;