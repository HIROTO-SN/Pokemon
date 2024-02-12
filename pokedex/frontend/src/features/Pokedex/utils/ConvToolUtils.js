import { typeList } from "../../../constants/UlList";

// タイプリストの背景色変換
export const setBackGroundForTypes = (typeName) => {
	const filteredType = typeList.filter(type => type.name.toLowerCase() === typeName)[0];
	if (filteredType.background	!== undefined) {
		return filteredType.background;
	}
};

// タイプリストの文字色変換
export const setFontColorForTypes = (typeName) => {
	const filteredType = typeList.filter(type => type.name.toLowerCase() === typeName)[0];
	if (filteredType.color !== undefined) {
		return filteredType.color;
	}
};

//　先頭を大文字化
export const capitalizeFirstLetter = (target) => {
	return target.charAt(0).toUpperCase() + target.slice(1);
}