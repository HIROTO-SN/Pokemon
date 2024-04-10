/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";

const ContentMainHello = () => {
  /***** CSS ******/
  const TD = styled.td`
    font-size: 86px;
    line-height: 86px;
    text-align: right;
  `;

  const IMG = styled.img`
    display: block;
    margin: 0;
    padding: 0;
    height: 4px !important;
    line-height: 4px !important;
    font-size: 4px !important;
		width: auto;
  `;

  /***** JSX ******/
  return (
    <TD>
      <IMG
        src="https://ci3.googleusercontent.com/meips/ADKq_NZQybB8NNMrNiIkvJRnW8YWkdlte1Xk3jTwUjpYodGEHSVX1NYKYeSKeYKF90YCx5GOnrfFHeZx-hewufqZKfXM6tPqLy4Gd8Xt_xRL4peJWm80=s0-d-e1-ft#https://assets.pokemon.com/static2/_ui/img/mail/pikachu-2.gif"
        alt="Pikachu"
        border="0"
      ></IMG>
    </TD>
  );
};

export default ContentMainHello;
