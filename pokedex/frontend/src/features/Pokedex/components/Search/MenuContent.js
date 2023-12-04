import React from 'react';
import styled from "styled-components";
import Column1 from './Columns/Column1';
import Column2 from './Columns/Column2';

const MenuContent = ( {accordionActive} ) => {

	const Menu = styled.div`
		display: ${!accordionActive ? "none" : "table"}; 
		height: ${!accordionActive ? "0px" : "400px"};
		background-color: #616161;
		color: white;
		margin: 0;
		padding: 0;
		border: 0;
		font: inherit;
		vertical-align: baseline;
		
		div:nth-child(1) {
			margin-left: 15.5525%;
			float: left;
			margin-right: -100%;
			width: 37.22%;
			text-align: left;
		}
		div:nth-child(2) {
			margin-left: 54.7525%;
			float: left;
			margin-right: -100%;
			width: 29.71%;
			text-align: left;
		} 
	`;

return (
		<Menu>
			<Column1/>
			<Column2/>
		</Menu>
	)
}

export default MenuContent