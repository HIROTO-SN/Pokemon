/* ログイン認証時*/
export const valid_message_usernameEmpty = "Please enter a username.";
export const valid_message_passwordEmpty = "Please enter a password.";

/* サインアップ時*/
export const valid_message_birthdayNoValid = "Enter a valid birthday.";
export const valid_message_required = "This field is required.";
export const valid_message_username =
  "Your Pokémon Trainer Club username must be between 6 and 16 characters.";
export const valid_message_screenName =
  "The length must be between 3 and 15 characters.";
export const regexPass =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!-/:-@[-`{-~])[!-~]{8,}$/;
export const valid_message_passInclude =
  "The password must include uppercase and lowercase letters, numbers, and symbols.";
export const passMinLength = 8;
export const passMaxLength = 50;
export const valid_message_passLength =
  "The passwsord must be between " +
  passMinLength +
  " and " +
  passMaxLength +
  " characters.";
export const valid_message_passNoMatch = "The password entries do not match.";
export const valid_message_emailNoMatch = "The email addresses didn't match.";
export const regexEmailValid =
  /^[!-?A-~]+@{1}[A-Za-z0-9]+[.]{1}[A-Za-z0-9]{2,}$/;
export const valid_message_emailNoValid = "Enter a valid email address.";
export const regexEmailProblem = /^[A-Za-z0-9_.-]{6,}@[!-~]+$/;
export const valid_message_emailWithProblem =
  "There is a problem with your email address. Please verify that it is spelled correctly. If it is not, please correct it and try again. If you already have a Pokémon Trainer Club account with this email address, please use the Forgot Password Tool to find your account.";
export const available_message = [
  {
    name: "username",
		valid: "This username is available.",
    invalid: "Username is invalid.",
    exists: "Username already exists. Please try the following:",
  },
  {
    name: "screenName",
		valid: "This screen name is available.",
    invalid: "Invalid screen name.",
    exists: "This screen name already exists. Please try the following:",
  },
];

// メールアクティベーションページ
export const REGEX_ACTIVATION = [
  {
    REGEX: /@/,
    MSG: "'@' symbol requreid"
  },
  {
    REGEX: /^[!-?A-~]{1,}@/,
    MSG: "Characters required beofre '@' symbol"
  },
  {
    REGEX: /@[!-?A-~]{1,}/,
    MSG: "Characters required after '@' symbol"
  },
  {
    REGEX: /^(?!(.*@){3}).*$/,
    MSG: "More than two '@' symbol found"
  },
];
  