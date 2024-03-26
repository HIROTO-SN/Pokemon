/**
 * 必須入力項目が入力されているかチェック
 * @param {String} date: 入力日付 
 * @return {String} : 〇〇〇〇/〇〇/〇〇の形式に変換された日付
 */
export const getFullDate = (date) => {
	const year = date.getFullYear().toString().padStart(4, '0');
	let month = (date.getMonth() + 1).toString().padStart(2, '0');
	let day = date.getDate().toString().padStart(2, '0');

	return year + "/" + month + "/" + day;
}

/**
 * 半角変換
 * @param {String} str: 変換対象文字列
 * @return {String} : 半角変換された文字列
 */
export const toHalfWidth = (str) => {
	return str.replace(/[！-～]/g, function(s) {
    return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
  });
}

/**
 * UUIDを構築
 * @return {String} : ランダムな16進数で構築されたUUID
 */
export const generateUUID = () => {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0,
        v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}