/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const ProfileImage = () => {
	/***** Definition ******/
	const cssObj = useCssPagination();

	/* ★ 後で消すテストデータ */
	const pic_list = [
		{ name: "Venusaur", src: "../test/003.png", disp: true },
		{ name: "Mega Venusaur", src: "../test/003_f2.png", disp: false },
		{ name: "Gigantamax Venusaur", src: "../test/003_f3.png", disp: false },
	]

	return (
		<div css={cssObj.pokeProfile}>
			{pic_list.map((pic) => (
				<img key={pic.name + "_pic"} src={pic.src} css={cssObj.imgProfile(pic.disp)} alt={pic.name}/>
			))}
		</div>
	)
}

/**
 * CSS定義
 */
const useCssPagination = () => {
	const pokeProfile = css`
		background-color: #F2F2F2;
    border-radius: 5px;
    position: relative;
		display: block;
    float: left;
    width: 100%;
	`
	const imgProfile = (disp) => css`
    display: ${disp ? "block" : "none"};
		opacity: ${disp ? 1 : 0};
		float: left;
    width: 100%;
    padding-bottom: 30px;
	`

	return {
		pokeProfile,
		imgProfile,
	}
}

export default ProfileImage