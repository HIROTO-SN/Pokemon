import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import styled from "styled-components";

const AdvancedMenu = () => {
  // ↓ js ↓
  const [accordionActive, setAccordionActive] = useState(false);
  const toggleAccordion = () => {
    setAccordionActive(!accordionActive);
  };

  // ↓ CSS ↓
  const Main = styled.div`
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
	`;
  const IconLabel = styled.label`
		padding: 5px;
		cursor: pointer;
		margin-left: 5px;
		border-radius: 50%;
		background-color: white;
		height: 10px;
		width: 10px;
	`;

  return (
    <Main>
      <AccordionSpan onClick={toggleAccordion}>
				<Text>
					{accordionActive ?
						"Hide Advanced Search" :
						"Show Advanced Search"
				  }
				</Text>
				<IconLabel>
					<IoIosArrowDown/>
				</IconLabel>
			</AccordionSpan>
    </Main>
  );
};

export default AdvancedMenu;
