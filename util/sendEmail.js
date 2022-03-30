const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
  console.log(
    process.env.SMTP_SERVICE,
    process.env.SMPT_MAIL,
    process.env.SMTP_PASSWORD,
    "---------email cred-------------"
  );
  const transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,

    service: process.env.SMTP_SERVICE,

    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
