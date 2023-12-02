import React from 'react';
import styled from "styled-components";
import Block1_1 from './Column1-blocks/Block1_1';
import Block1_2 from './Column1-blocks/Block1_2';
import Block1_3 from './Column1-blocks/Block1_3';

const Column1 = () => {

	const Block = styled.div`
		clear: both;
		display: block;
		width: 100%;
		float: left;
		position: relative;
		margin: 1em 0 0 0;
	`;

	return (
		<>
			<Block><Block1_1/></Block>
			{/* <Block><Block1_2/></Block> */}
			{/* <Block><Block1_3/></Block> */}
		</>
	)
}

export default Column1