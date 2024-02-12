/**
 * Searchボタン押下時共通処理
 */
export const clickSearchHandler = () => {
	console.log("clicksearchHandler");
	const element = document.getElementById("result");
	element.scrollIntoView({  
		behavior: 'smooth'  
	});
}