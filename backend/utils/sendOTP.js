import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.BREVO_SMTP_LOGIN,
        pass: process.env.BREVO_SMTP_KEY,
    },
});

const sendOTP = async (email, otp) => {
    try {
        await transporter.sendMail({
            from: `"ShelfWise Library" <${process.env.BREVO_SENDER_EMAIL}>`,
            to: email,
            subject: "Verify your email - ShelfWise Library",
            html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>ShelfWise Library</h2>
          <p>Your OTP is:</p>
          <h1 style="letter-spacing:4px;">${otp}</h1>
          <p>This OTP is valid for 10 minutes.</p>
          <p>If you did not request this OTP, please ignore this email.</p>
        </div>
      `,
        });

        console.log("OTP email sent successfully.");
    } catch (error) {
        console.error("Brevo SMTP Error:", error);
        throw error;
    }
};

export default sendOTP;