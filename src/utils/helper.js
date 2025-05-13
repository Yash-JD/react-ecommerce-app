import Cookies from "js-cookie";

export const validateEmail = (email) => {
  // check if it contains more than one @
  if (email.indexOf("@") != email.lastIndexOf("@")) return false;

  // check if it contains more than one . after @
  const index = email.indexOf("@");
  const domain = email.slice(index + 1);
  if (domain.indexOf(".") != domain.lastIndexOf(".")) return false;

  // check if it contains capital letters or numbers in domain
  if (/[A-Z]/.test(email) || /[0-9]/.test(domain)) return false;

  //check if email contains any other special characters other than @ and .
  if (
    email.split("").some((x) => {
      return '!#$%^&*(),?":{}|<>'.includes(x);
    })
  )
    return false;
  else return true;
};

export const validatePassword = (password) => {
  // check if it contains atlease capital letters
  if (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    password.split("").some((x) => {
      return '!#$%^&*(),?":{}|<>@.'.includes(x);
    })
  )
    return true;
  else return false;
};

export const getCookie = () => {
  return Cookies.get("userToken");
};
