import nodemailer from "nodemailer";

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, SMTP_FROM } =
  process.env;

if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD || !SMTP_FROM) {
  throw new Error("Missing SMTP environment variables.");
}

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT ?? 587),
  secure: false,

  auth: {
    user: SMTP_USER,
    pass: SMTP_PASSWORD,
  },
});

type SendOtpEmailProps = {
  email: string;
  otp: string;
};

export async function sendPasswordResetOtp({ email, otp }: SendOtpEmailProps) {
  // Useful while debugging
  await transporter.verify();

  console.log("SMTP connection authenticated successfully");

  await transporter.sendMail({
    from: SMTP_FROM,
    to: email,
    subject: "Password Reset Verification Code",

    text: `
Your password reset verification code is:

${otp}

This code expires in 10 minutes.

If you did not request a password reset, you can ignore this email.
    `,

    html: `
      <div style="font-family: Arial, sans-serif">
        <h2>Password Reset</h2>

        <p>
          Your password reset verification code is:
        </p>

        <div
          style="
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 8px;
            margin: 24px 0;
          "
        >
          ${otp}
        </div>

        <p>
          This code expires in <strong>10 minutes</strong>.
        </p>

        <p>
          If you did not request a password reset,
          you can safely ignore this email.
        </p>
      </div>
    `,
  });
}
