import { passMaxLength, passMinLength, regexPass, valid_message_passInclude, valid_message_passLength, valid_message_required } from "../../constants/ValidationMessage";

/*
 * 必須入力項目が入力されているかチェック
 * @param inputs: 入力内容 - Object
 * @param error: エラーチェック内容 - Object
 * @return newError: 入力チェック結果エラー内容 - Object
 */
export const fieldInputEmptyCheck = (inputs, error) => {
	let newError = { ...error };
	Object.entries(error).forEach((e) => {
		if (inputs.hasOwnProperty(e[0])) {
			newError[e[0]] = inputs[e[0]] == "" ? valid_message_required : "";
		}
	})
	return newError;
}


/*
 * パスワードチェック
 * @param pass: パスワード - String
 * @return newError:  入力チェック結果エラー内容 - Object
 */
export const passwordCheck = (pass) => {
	console.log("pass: " + pass);
	let newError = "";

	// 最低1つの大文字、小文字、数値、記号を含むかチェック
	newError = !regexPass.test(pass) ? valid_message_passInclude : "";
	// 文字数8文字から50文字かチェック
	newError += (!(pass.length >= passMinLength && pass.length <= passMaxLength)) && "\n" + valid_message_passLength;

	console.log("newError: " + newError);
	return newError;
}