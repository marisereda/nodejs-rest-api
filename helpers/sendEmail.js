const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async ({ email, verificationToken }) => {
  const letter = {
    to: email,
    from: "marina.gorb@gmail.com",
    subject: "Registration confirmation",
    text: `<p>Please <a href='http://localhost:3000/api/users/verify/${verificationToken}'>confirm</a> your email.</p>`,
    html: `<p>Please <a href='http://localhost:3000/api/users/verify/${verificationToken}'>confirm</a> your email.</p>`,
  };

  try {
    await sgMail.send(letter);
    console.log("Email was sent successfully");
  } catch (error) {
    console.log(error.message);
    throw new Error("Sendgrid is not available.");
  }
};

module.exports = sendEmail;
