
export const clickColorChange = (e, targetColor, initColor) => {

	console.log(e.target.style);
	if(e.target.style.background == targetColor) {
		console.log("if");
		e.target.style.background = initColor;
	} else {
		console.log("else");
		e.target.style.background = targetColor;
	}
}