/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const ProfileImage = ({ name, src }) => {
  /***** Definition ******/
  const cssObj = useCssProfileImaeg();

  return (
    <div css={cssObj.pokeProfile}>
      <img src={src} css={cssObj.imgProfile} alt={name} />
    </div>
  );
};

/**
 * CSS定義
 */
const useCssProfileImaeg = () => {
  const pokeProfile = css`
    background-color: #f2f2f2;
    border-radius: 5px;
    position: relative;
    display: block;
    float: left;
    width: 100%;
  `;
  const imgProfile = () => css`
    float: left;
    width: 100%;
    padding-bottom: 30px;
  `;

  return {
    pokeProfile,
    imgProfile,
  };
};

export default ProfileImage;
