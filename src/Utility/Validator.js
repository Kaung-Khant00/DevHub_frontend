/* this function if the password has at least 8 characters, at least one uppercase letter, at least one lowercase letter, at least one number, and at least one special character :):) */
export function isStrongPassword(password) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return regex.test(password);
}
