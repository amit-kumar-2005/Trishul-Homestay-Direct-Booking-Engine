
import nodemailer from "nodemailer";

const createTransporter = () => {
  const { EMAIL_USER, EMAIL_APP_PASSWORD } = process.env;

  if (!EMAIL_USER || !EMAIL_APP_PASSWORD) {
    throw new Error("Email configuration is missing in environment variables");
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_APP_PASSWORD.replace(/\s/g, ""),
    },
  });
};

// Send Password Reset Email
export const sendPasswordResetEmail = async (email, resetUrl) => {
  const transporter = createTransporter();

  await transporter.sendMail({
    from: `"Trishul Homestay" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Reset Your Trishul Homestay Password",
    text: `
Hello,

We received a request to reset your Trishul Homestay account password.

Click the link below to reset your password:

${resetUrl}

This link will expire in 15 minutes.

If you did not request a password reset, please ignore this email.

Regards,
Trishul Homestay Team
    `,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; color: #333;">
        <h2 style="color: #2563eb;">Trishul Homestay</h2>

        <h3>Password Reset Request</h3>

        <p>Hello,</p>

        <p>
          We received a request to reset your Trishul Homestay
          account password.
        </p>

        <p style="margin: 28px 0;">
          <a
            href="${resetUrl}"
            style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;"
          >
            Reset Password
          </a>
        </p>

        <p>This link will expire in <strong>15 minutes</strong>.</p>

        <p>
          If you did not request a password reset, please ignore
          this email.
        </p>

        <p>Regards,<br />Trishul Homestay Team</p>
      </div>
    `,
  });
};
