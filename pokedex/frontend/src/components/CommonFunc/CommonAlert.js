import { valid_message_required } from "../../constants/ValidationMessage";

/*
 * 必須入力項目が入力されているかチェック
 * inputs: 入力内容： Object
 * error: エラーチェック内容）: Object
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