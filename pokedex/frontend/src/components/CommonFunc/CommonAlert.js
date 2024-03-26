import { passMaxLength, passMinLength, regexEmailProblem, regexEmailValid, regexPass, valid_message_emailNoValid, valid_message_emailWithProblem, valid_message_passInclude, valid_message_passLength, valid_message_required } from "../../constants/ValidationMessage";

/**
 * 必須入力項目が入力されているかチェック
 * @param {Object} inputs: 入力内容 
 * @param {Object} error: エラーチェック内容
 * @return {Object} newError: 入力チェック結果エラー内容
 * @return {Boolean} errorExists : エラーがあったかどうか
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
 * @return errStr:  入力チェック結果エラー内容 - String
 */
export const passwordCheck = (pass) => {
	let errStr = "";

	// 最低1つの大文字、小文字、数値、記号を含むかチェック
	errStr = !regexPass.test(pass) ? valid_message_passInclude : "";
	// 文字数8文字から50文字かチェック
	errStr += (!(pass.length >= passMinLength && pass.length <= passMaxLength)) ? "\n" + valid_message_passLength : "";

	return errStr;
}

/**
 * メールアドレスチェック
 * @param email: メールアドレス - String
 * @param flg: 純粋なメールアドレス or 確認用メールアドレス を区別する - Boolean
 * @return errStr:  入力チェック結果エラー内容 - String
 */
export const emailCheck = (email, flg = true) => {
	let errStr = "";

	// メールアドレスの形式チェック
	if (!regexEmailValid.test(email)) {
		// 半角英数字記号1文字以上 + @ + 半角英数字1文字以上 + . + 半角英数字2文字以上
		errStr = valid_message_emailNoValid;
	} else if (!regexEmailProblem.test(email) && flg) {
		// アドレスの形式は不正ではないが、
		// @の左側にメールアドレスに使用できない文字が使用されている、または5文字以下
		errStr = valid_message_emailWithProblem;
	} 
	return errStr;
}