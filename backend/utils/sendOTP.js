import { BrevoClient } from "@getbrevo/brevo";

const brevo = new BrevoClient({
    apiKey: process.env.BREVO_API_KEY,
});

const sendOTP = async (email, otp) => {
    try {
        await brevo.transactionalEmails.sendTransacEmail({
            sender: {
                name: "ShelfWise Library",
                email: process.env.BREVO_SENDER_EMAIL,
            },

            to: [
                {
                    email,
                },
            ],

            subject: "Verify your Email",

            htmlContent: `
      <div style="font-family:Arial,sans-serif">
        <h2>ShelfWise Library</h2>

        <p>Your OTP is:</p>

        <h1>${otp}</h1>

        <p>This OTP is valid for 10 minutes.</p>
      </div>
      `,
        });

        console.log("OTP email sent successfully.");
    } catch (error) {
        console.error("Brevo API Error:", error);

        throw error;
    }
};

export default sendOTP;