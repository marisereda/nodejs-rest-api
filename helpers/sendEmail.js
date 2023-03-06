const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env;

const nodemailerConfig = {
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: true,
  auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
};
const transporter = nodemailer.createTransport(nodemailerConfig, { from: "mail.nodejs@meta.ua" });

const sendEmail = async ({ email, subject, templateName, templateData }) => {
  const templatePath = path.resolve(`templates/${templateName}.ejs`);
  const letterContent = await ejs.renderFile(templatePath, templateData);
  const letter = {
    to: email,
    subject,
    text: letterContent,
    html: letterContent,
  };
  await transporter.sendMail(letter);
};

module.exports = sendEmail;
