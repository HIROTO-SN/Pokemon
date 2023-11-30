import React from 'react';
import styled from "styled-components";

const Column1 = () => {

	const Block = styled.div`
		clear: both;
		display: block;
		width: 100%;
		float: left;
		position: relative;
		vertical-align: baseline;
	`;
	const h4 = {
		float: "left",
    marginRight: "-100%",
    width: "45.22%"
	};
	const help = {
		float: "left",
    marginRight: "-100%",
    width: "49.22%",
    marginLeft: "50.7825%",
		fontSize: "90%"
	};

	return (
		<>
			<Block>
				<h4 style={h4}>Type & Weakness</h4>
				<div style={help}>
					<span>
						<strong>T</strong> = Type
					</span>
					<span>
						<strong>W</strong> = Weakness
					</span>
				</div>
				<div></div>
			</Block>
		</>
	)
}

export default Column1