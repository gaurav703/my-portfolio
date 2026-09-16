const nodemailer = require("nodemailer");

const { GMAIL_USER, GMAIL_APP_PASSWORD, CONTACT_TO_EMAIL } = process.env;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_APP_PASSWORD,
  },
});

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: "name, email, and message are required." });
  }

  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    return res.status(500).json({ error: "Email is not configured on the server." });
  }

  try {
    await transporter.sendMail({
      from: `"${name}" <${GMAIL_USER}>`,
      replyTo: email,
      to: CONTACT_TO_EMAIL || GMAIL_USER,
      subject: `Portfolio contact form: ${name}`,
      text: message,
      html: `<p><strong>From:</strong> ${name} (${email})</p><p>${message.replace(/\n/g, "<br/>")}</p>`,
    });
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Failed to send contact email:", err.message);
    return res.status(500).json({ error: "Failed to send message." });
  }
};
