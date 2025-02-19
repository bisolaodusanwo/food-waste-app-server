const Contact = require("../models/Contact");
const { sendEmail } = require("../services/emailService");

exports.createContact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const contact = new Contact({ name, email, subject, message });
    await contact.save();

    const adminEmail = "admin@example.com";
    const emailSubject = `New Contact Inquiry: ${subject}`;
    const emailText = `You have received a new inquiry from ${name} (${email}). Message: ${message}`;
    const emailHtml = `<p>You have received a new inquiry from <strong>${name}</strong> (${email}).</p><p>Subject: ${subject}</p><p>Message: ${message}</p>`;
    await sendEmail(adminEmail, emailSubject, emailText, emailHtml);

    res.status(201).json({
      message: "Contact inquiry received successfully",
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

exports.getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ data: contacts });
  } catch (error) {
    next(error);
  }
};
