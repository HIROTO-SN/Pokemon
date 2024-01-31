/* ログイン認証時*/ 
export const valid_message_usernameEmpty = "Please enter a username.";
export const valid_message_passwordEmpty = "Please enter a password.";

/* サインアップ時*/ 
export const valid_message_required = "This field is required.";
export const regexPass = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[.?/-])[a-zA-Z0-9.?-]$/;
export const valid_message_passInclude = "The password must include uppercase and lowercase letters, numbers, and symbols."
export const passMinLength = 8;
export const passMaxLength = 50;
export const valid_message_passLength = "The password must be between " +  passMinLength + " and " + passMaxLength + " characters."