const nodemailer = require("nodemailer");

// Define a function for sending email verification
const emailverification = (email, otp) => {
  // Create a nodemailer transporter with Gmail service
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER,
      pass: process.env.APP_PASSWORD,
    },
  });

  const template = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Welcome to Carrer-Connect</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                        margin: 0;
                        padding: 0;
                        background-color: #f4f4f4;
                    }
                    .container {
                        max-width: 600px;
                        margin: 30px auto;
                        padding: 20px;
                        background-color: #fff;
                        border-radius: 8px;
                        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                    }
                    h1 {
                        color: #333;
                        text-align: center;
                    }
                    p {
                        color: #666;
                        margin-bottom: 20px;
                    }
                    .otp {
                        font-size: 24px;
                        font-weight: bold;
                        color: #007bff;
                        text-align: center;
                    }
                    .footer {
                        margin-top: 20px;
                        text-align: center;
                        color: #999;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Welcome to MeloVibe!</h1>
                    <p>Dear User,</p>
                    <p>We are delighted to welcome you to MeloVibe, your new music companion.</p>
                    <p>To complete your registration, please use the OTP provided below:</p>
                    <p class="otp">${otp}</p>
                    <p>If you have any questions or need assistance, feel free to contact us.</p>
                    <p>Best Regards,<br/>The MeloVibe Team</p>
                </div>
            </body>
            </html>
        `;

  // Define the email options
  const mailOption = {
    from: {
      name: "MeloVibe",
      address: "haaniashraf1234@gmail.com",
    },
    to: email,
    subject: "Verify OTP",
    html:template,
    text: `Your OTP is ${otp}`,
  };

  // Define an async function to send the email
  const sendMail = async (transporter, mailOption) => {
    try {
      // Use the transporter to send the email with specified mail options
      await transporter.sendMail(mailOption);
    } catch (error) {
      console.log(`Error occurred while sending email: ${error}`);
    }
  };
  // Call the sendMail function with the transporter and mail options
  sendMail(transporter, mailOption);
};

module.exports = { emailverification };
