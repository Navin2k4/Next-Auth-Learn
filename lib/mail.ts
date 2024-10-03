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


export const sendPasswordResetEmail = async (email:string, token:string)=>{
  const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;
  await resend.emails.send({
    from: "UrbanUplift@resend.dev",
    to: email,
    subject: "Reset your password",
    html: `
            <h1>Reset your password</h1>
            <p>To reset your password for Urban Uplift, please click the link below:</p>
            <a href="${resetLink}" target="_blank">Reset Password By clicking here</a>
            <p>If you didn't request this reset, please ignore this email.</p>
        `,
  });
}
