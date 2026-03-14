const SibApiV3Sdk = require("sib-api-v3-sdk");

// In-memory OTP store
const otpStore = new Map();

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function storeOTP(email, otp) {
  otpStore.set(email, { otp, expiresAt: Date.now() + 5 * 60 * 1000 });
}

function verifyOTP(email, otp) {
  const record = otpStore.get(email);
  if (!record) return false;
  if (Date.now() > record.expiresAt) { otpStore.delete(email); return false; }
  if (record.otp !== otp) return false;
  otpStore.delete(email);
  return true;
}

async function sendOTPEmail(email, otp, name) {
  console.log("📧 Sending OTP to:", email);
  console.log("✅ OTP is:", otp);

  const defaultClient = SibApiV3Sdk.ApiClient.instance;
  const apiKey = defaultClient.authentications['api-key'];
  apiKey.apiKey = process.env.BREVO_API_KEY;

  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  await apiInstance.sendTransacEmail({
    sender: { email: process.env.EMAIL_FROM, name: "Public Space" },
    to: [{ email }],
    subject: "Your Login OTP — Public Space",
    htmlContent: `
      <div style="font-family:sans-serif;max-width:400px;margin:auto;padding:24px;border:1px solid #e5e7eb;border-radius:12px;">
        <h2 style="color:#1d4ed8">🔐 Login Verification</h2>
        <p>Hi <strong>${name}</strong>,</p>
        <p>You're logging in via <strong>Google Chrome</strong>. Use the OTP below:</p>
        <div style="font-size:36px;font-weight:bold;letter-spacing:8px;color:#1d4ed8;padding:16px 0">${otp}</div>
        <p style="color:#6b7280;font-size:13px">Valid for <strong>5 minutes</strong>. Do not share it.</p>
      </div>
    `
  });
}

module.exports = { generateOTP, storeOTP, verifyOTP, sendOTPEmail };
