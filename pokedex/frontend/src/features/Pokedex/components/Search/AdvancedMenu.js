import React, { useState } from "react";
import styled from "styled-components";
import MenuContent from "./MenuContent";

const AdvancedMenu = () => {
  // ↓ js ↓
  const [accordionActive, setAccordionActive] = useState(false);
  const toggleAccordion = () => {
    setAccordionActive(!accordionActive);
  };

  // ↓ CSS ↓
  const SearchPart = styled.div`
    margin: auto;
    width: 35%;
    border-bottom-right-radius: 30px;
    border-bottom-left-radius: 30px;
    background-color: #616161;
		padding-bottom: 5px;
  `;
  const AccordionSpan = styled.span`
		margin: auto;
		display: flex;
		justify-content: center;
		flex-direction: row;
		width: 90%;
		background: none;
		cursor: pointer;
  `;
	const Text = styled.span`
		color: white;
		font-size: 0.8em;
	`;
  const Cricle = styled.div`
		cursor: pointer;
		background-color: white;
		border-radius: 10px;
		margin-left: 0.5em;
		height: 1em;
		width: 1em;
	`;

	const Arrow = styled.span`
		display: inline-block;
		vertical-align: top;
		${accordionActive && "margin-top: 30%"};
		color: #616161;
		line-height: 1;
		width: 0.5em;
		height: 0.5em;
		border: 0.1em solid currentColor;
		border-left: 0;
		border-bottom: 0;
		box-sizing: border-box;
		transform: ${!accordionActive ? "translateY(-25%) rotate(135deg)" : "translateY(-25%) rotate(-45deg)"};
		transition: transform 0.3s ease;
	`;

  return (
		<div>
			<MenuContent accordionActive={accordionActive}/>
			<SearchPart>
				<AccordionSpan onClick={toggleAccordion}>
					<Text>
						{accordionActive ?
							"Hide Advanced Search" :
							"Show Advanced Search"
						}
					</Text>
					<Cricle>
						<Arrow/>
					</Cricle>
				</AccordionSpan>
			</SearchPart>
		</div>
  );
};

export default AdvancedMenu;
