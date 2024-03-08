/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Modal from "react-modal";
import { IoCloseSharp } from "react-icons/io5";

/**
 * ★Component★
 * エラー時のモーダルウィンドウ
 */
const ErrorModal = ({ modalIsOpen, setModalIsOpen }) => {
  /***** Definition ******/
  const c = useCssModal();
  const modalStyle = {
    overlay: {
      top: 0,
      left: 0,
      backgroundColor: "rgba(0,0,0,0.85)",
      zIndex: 16,
    },
    content: {
      padding: 0,
      display: "block",
      top: "120px",
      margin: "0 auto",
      backgroundColor: "white",
      borderRadius: "10px",
      height: "300px",
      maxWidth: "500px",
      zIndex: 50,
      width: "100%",
    },
  };

  return (
    <Modal isOpen={modalIsOpen} style={modalStyle} onRequestClose={() => setModalIsOpen(false)}>
      <div css={c.modal_container}>
        <a css={c.close_mark} onClick={() => setModalIsOpen(false)}></a>
      </div>
      <div css={c.modal_body}>
				<IoCloseSharp css={c.modal_big_icon}/>
        <p css={c.modal_emphasis_text}>
          We're sorry, but we can't process your request.
        </p>
        <p>We can't sign you up for emails right now.</p>
        <p>
          You can visit <a href="https://www.pokemon.com/us/">pokemon.com</a>{" "}
          for the latest Pokémon news or contact Customer&nbsp;Support&nbsp;
          <a href="https://support.pokemon.com/hc/en-us/articles/20573695697428">
            here
          </a>
          .
        </p>
      </div>
    </Modal>
  );
};

/**
 * CSS定義
 */
const useCssModal = () => {
  const modal_container = css`
    display: flex;
    justify-content: end;
  `;

  const close_mark = css`
    color: grey;
    width: 40px;
    height: 40px;
    cursor: pointer;
    display: flex !important;
    justify-content: center;
    align-items: center;

    :before {
      content: "x";
      font-family: "icons";
      display: inline-block;
      vertical-align: middle;
      line-height: 1;
      font-weight: normal;
      font-style: normal;
    }
  `;

	const modal_big_icon = css`
		color: red;
		font-family: "icons";
    display: inline-block;
    vertical-align: middle;
    line-height: 1;
    font-weight: normal;
    font-style: normal;
    text-decoration: inherit;
    text-transform: none;
    text-rendering: auto;
		font-size: 5.4rem;
	`;

  const modal_body = css`
		text-align: center;
    padding: 1rem;
		& p {
      color: #919191;
      font-family: "Roboto", arial, sans-serif;
      font-size: 100%;
      font-weight: 500;
      line-height: 125%;
      margin: 0.5em 0;
    }
	`;
  const modal_emphasis_text = css`
		padding-bottom: 1.5rem;
    font-weight: 600;
	
	`;
  return {
    modal_container,
    close_mark,
    modal_emphasis_text,
    modal_big_icon,
    modal_body,
  };
};

export default ErrorModal;
