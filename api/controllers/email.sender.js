const nodemailer = require(`nodemailer`);
require("dotenv").config();

exports.sendEmail = (req, res) => {
  const { email, message } = req.body;
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  var mailOptions = {
    from: { email },
    to: process.env.EMAIL,
    subject: "Sending Email using Node.js",
    text: { message },
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      res.status(201).send({ message: `email sent successfuly` });
    }
  });
};
