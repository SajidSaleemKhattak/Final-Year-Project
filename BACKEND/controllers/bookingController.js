const nodemailer = require("nodemailer");
const User = require("../models/User");

exports.sendBookingEmail = async (req, res) => {
  const { lawyerId, userName, userEmail } = req.body;

  try {
    const lawyer = await User.findById(lawyerId);
    if (!lawyer || !lawyer.email) {
      return res.status(404).json({ error: "Lawyer not found" });
    }

    // Setup Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "sajidsaleemkhattack@gmail.com", // replace with your app email
        pass: "ivuq vdfx naaw pmua ", // replace with your app password / app password if using Gmail
      },
    });

    const mailOptions = {
      from: `"Lawyer Booking" <sajidsaleemkhattack@gmail.com>`,
      to: lawyer.email,
      subject: "New Booking Request",
      html: `
        <h2>You have a new booking request</h2>
        <p><strong>Name:</strong> ${userName}</p>
        <p><strong>Email:</strong> ${userEmail}</p>
        <p>Please contact the client to proceed with the booking.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email sent to lawyer successfully" });
  } catch (error) {
    console.error("Error sending booking email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
};
