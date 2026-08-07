type SendPasswordResetOtpParams = {
  to: string;
  otp: string;
};

export async function sendPasswordResetOtp({
  to,
  otp,
}: SendPasswordResetOtpParams): Promise<void> {
  // Replace this with Resend, Nodemailer, or your email provider.
  console.log(`Sending password reset OTP ${otp} to ${to}`);

  /*
  Example with Resend:

  await resend.emails.send({
    from: "Your App <noreply@yourdomain.com>",
    to,
    subject: "Password Reset Verification Code",
    html: `
      <p>Your password reset verification code is:</p>
      <h1>${otp}</h1>
      <p>This code expires in 10 minutes.</p>
      <p>If you did not request this, you can ignore this email.</p>
    `,
  });
  */
}
