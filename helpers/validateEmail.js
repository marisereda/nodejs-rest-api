const emailPattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const validateEmail = function (email) {
  if (!email) {
    return true;
  }
  const regex = emailPattern;
  return regex.test(email);
};

module.exports = { emailPattern, validateEmail };
