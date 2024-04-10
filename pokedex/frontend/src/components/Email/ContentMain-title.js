/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";

const ContentMainTitle = () => {
  /***** CSS ******/
	const TD = styled.td`
		font-size: 86px;
		line-height: 86px;
	`;

	const td2 = css`
		text-align: right;
	`

  const A = styled.a`
    height: 86px;
    color: #15c;
  `;
  const IMG = styled.img`
    display: block;
    margin: 0;
    padding: 0;
    height: 86px;
		width: auto;
  `;

  /***** JSX ******/
  return (
    <>
      <TD>
        <A href="http://pokemon.com" alt="Pokémon Logo" border="0">
          <IMG
            src="https://ci3.googleusercontent.com/meips/ADKq_Naidx619QahOuH1S8bTOlU_WHJ3yl3XcDVskfRklPwiJR7snLF9eR-JcZjcMrDiaoj2LT_2-SjTKPWOwBPoRdY2LHzp-gHtYVhebA4Eig=s0-d-e1-ft#https://assets.pokemon.com/static2/_ui/img/mail/logo.gif"
            alt="Pokémon Logo"
            border="0"
          ></IMG>
        </A>
      </TD>
      <TD css={td2}>
        <IMG
          src="https://ci3.googleusercontent.com/meips/ADKq_NZQsCmF3gTDWgSvJQsvmHtMr5Dkv6cWVhT-dhoiBJPVTHKqBp5OF3VnILfRMkhIxuQ5MWaAAuBIpnedLDdU6a8qwfVWZqHQuOYiYTfWSpa122Lt=s0-d-e1-ft#https://assets.pokemon.com/static2/_ui/img/mail/pikachu-1.gif"
          alt="Pikachu"
          border="0"
        ></IMG>
      </TD>
    </>
  );
};

export default ContentMainTitle;
