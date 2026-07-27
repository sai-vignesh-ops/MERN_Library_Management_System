import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendOTP = async (email, otp) => {
    try {
        const { data, error } = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: "Your OTP Code",
            html: `
                <h2>Your OTP is: ${otp}</h2>
                <p>This OTP is valid for 10 minutes.</p>
            `,
        });

        if (error) {
            console.error("Resend Error:", error);
            throw new Error(error.message);
        }

        console.log("Email sent successfully:", data);
    } catch (err) {
        console.error("sendOTP Error:", err);
        throw err;
    }
};

export default sendOTP;