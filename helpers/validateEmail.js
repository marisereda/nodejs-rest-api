const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

const validateEmail = function (email) {
  const regex = emailPattern;
  return regex.test(email);
};

module.exports = { emailPattern, validateEmail };
