import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendOTP = async (email, otp) => {
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Your OTP Code",
        html: `
            <h2>Your OTP is: ${otp}</h2>
            <p>This OTP is valid for 10 minutes.</p>
        `,
    });
};

export default sendOTP;