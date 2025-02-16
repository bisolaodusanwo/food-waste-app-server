const nodemailer = require("nodemailer");
const keys = require("../config/keys");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: keys.emailUser,
    pass: keys.emailPass,
  },
});

/**
 * Sends an email using Gmail's SMTP.
 * @param {string} to - Recipient's email.
 * @param {string} subject - Subject line.
 * @param {string} text - Plain text body.
 * @param {string} html - HTML body.
 */
const sendEmail = async (to, subject, text, html) => {
  try {
    const mailOptions = {
      from: keys.emailUser,
      to,
      subject,
      text,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = { sendEmail };
