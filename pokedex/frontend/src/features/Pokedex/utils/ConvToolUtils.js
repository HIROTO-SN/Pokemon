import { typeList } from "../../../constants/ul_list/pokedexList";

/**
 * タイプリストの背景色変換
 * @param {String} typeName - タイプ名
 * @return {String} filteredType.background - 背景色
 */
export const setBackGroundForTypes = (typeName) => {
	const filteredType = typeList.filter(type => type.name.toLowerCase() === typeName)[0];
	if (filteredType !== void 0) {
		return filteredType.background;
	}
};

/**
 * タイプリストの文字色変換
 * @param {String} typeName - タイプ名
 * @return {String} filteredType.color - 文字色
 */
export const setFontColorForTypes = (typeName) => {
	const filteredType = typeList.filter(type => type.name.toLowerCase() === typeName)[0];
	if (filteredType !== void 0) {
		return filteredType.color;
	}
};

/**
 * 先頭を大文字化
 * @param {String} target - 対象文字列
 * @return {String} 先頭を大文字にした文字列
 */
export const capitalizeFirstLetter = (target) => {
	return target.charAt(0).toUpperCase() + target.slice(1);
}

/**
 * 先頭を大文字化
 * @param {String} target - 対象文字列
 * @param {String} start - 開始位置
 * @param {String} end - 終了位置
 * @return {String} 対象文字までを抽出した文字列
 */
export const extractString = (target, start, end) => {
	return target.indexOf(end) !== -1 ? 
			target.substring(start, target.indexOf(end))
		: target ;
}


/**
 * 対象位置までスクロール
 */
export const scrollToTarget = (id) => {
	document.getElementById(id).scrollIntoView({
		behavior: 'smooth'
	});
}
