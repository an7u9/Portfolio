const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the main HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "portfolio.html"));
});

// Email sending endpoint
app.post("/api/send-email", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // TLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // must be App Password
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      // subject: `Portfolio Contact: ${subject}`,
      html: `
    <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f4f4f4" style="font-family: Arial, sans-serif; padding:20px;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" style="border-radius:8px; padding:20px;">
            <tr>
              <td>
                <!-- Heading -->
                <h2 style="color:#a70000; margin:0 0 20px 0;">New Contact Form Submission</h2>

                <!-- Content Box -->
                <table width="100%" cellpadding="10" cellspacing="0" border="0" bgcolor="#e0f7fa" style="border-radius:8px;">
                  <tr><td><p style="margin:0;"><strong>Name:</strong> ${name}</p></td></tr>
                  <tr><td><p style="margin:0;"><strong>Email:</strong> ${email}</p></td></tr>
                  <tr><td><p style="margin:0;"><strong>Message:</strong></p></td></tr>
                  <tr>
                    <td>
                      <table width="100%" cellpadding="10" cellspacing="0" border="0" bgcolor="#ffffff" style="border:1px solid #ddd; border-radius:4px;">
                        <tr>
                          <td style="font-size:14px; color:#333;">
                            ${message.replace(/\n/g, "<br>")}
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

                <!-- Footer -->
                <p style="color:#170069; font-size:12px; margin-top:20px; text-align:center;">
                  This message was sent from your portfolio contact form.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    `,
      replyTo: email,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);

    res.status(200).json({
      success: true,
      message: "Email sent successfully!",
    });
  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send email. Please try again later.",
    });
  }
});

// Serve static files (after API routes to avoid conflicts)
app.use(express.static(path.join(__dirname)));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Portfolio server running on http://localhost:${PORT}`);
  console.log(`Email service configured for: ${process.env.EMAIL_USER}`);
});

module.exports = app;
