import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;
  await resend.emails.send({
    from: "UrbanUplift@resend.dev",
    to: email,
    subject: "Verify your email address",
    html: `
            <h1>Verify your email address</h1>
            <p>To complete your registration for Urban Uplift, please click the link below:</p>
            <a href="${confirmLink}" target="_blank">Verify Email By clicking here</a>
            <p>If you didn't request this verification, please ignore this email.</p>
        `,
  });
};
