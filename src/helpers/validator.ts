import { Admin_users } from "../entity/admin_users";

const Validators = (args: Admin_users): string => {
  const uppercaseRegExp = /(?=.*?[A-Z])/;
  const lowercaseRegExp = /(?=.*?[a-z])/;
  const digitsRegExp = /(?=.*?[0-9])/;
  const specialCharRegExp = /(?=.*?[#?!@_$%^&*-])/;
  const spacesRegExp = /^.+\s.+$/g;

  const errors = [
    "Username must have at least 6 characters",
    "Password must have at least 8 characters",
    "Role must be selected",
    "Username must not have empty spaces",
    "Password must not have empty spaces",
    "Password must have atleast 1 number, special character(#?!@$%^&*-_), uppercase and lowercase letter",
  ];

  const username = args.username.trim()
  const password = args.password.trim()

  const spacesUsername = spacesRegExp.test(username);
  const spacesPassword = spacesRegExp.test(password);
  const uppercasePassword = uppercaseRegExp.test(password);
  const lowercasePassword = lowercaseRegExp.test(password);
  const digitsPassword = digitsRegExp.test(password);
  const specialCharPassword = specialCharRegExp.test(password);

  let error =
  username.length < 6
      ? errors[0]
      : spacesUsername
      ? errors[3]
      : password.length < 8
      ? errors[1]
      : spacesPassword
      ? errors[4]
      : (!uppercasePassword || !lowercasePassword || !digitsPassword || !specialCharPassword)
      ? errors[5]
      : args.roles.length === 0
      ? errors[2]
      : "";

  return error;
};

export default Validators;
