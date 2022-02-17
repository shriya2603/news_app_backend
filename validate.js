export const validatePassword = function (password) {
  if (password != null && password.length >= 6 && password.length <= 12) {
    return true;
  }
  //throw new Error("Password must be between 6 to 12 characters");
};

export const validateEmail = function (email) {
  if (email == null) {
    throw new Error("Please enter a e-mail address");
  }
  let atposition = email.indexOf("@");
  let dotposition = email.lastIndexOf(".");
  if (
    atposition < 1 ||
    dotposition < atposition + 2 ||
    dotposition + 2 >= email.length
  ) {
    //throw new Error("Please enter a valid e-mail address");
  }
  return true;
};

export const validatePhoneNo = function (phoneNo) {
  if (phoneNo == null && isNaN(phoneNo)) {
    //throw new Error("Please enter a valid phone number");
  }
  return true;
};
