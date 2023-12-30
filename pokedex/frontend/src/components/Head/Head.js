import React from "react";
import { Helmet } from 'react-helmet';

const Head = () => {
  return (
		<Helmet>
			<link
				rel="stylesheet"
				href="https://use.fontawesome.com/releases/v5.12.1/css/all.css"
			/>
			<title>Pokédex | Pokemon.com</title>
		</Helmet>
  );
};

export default Head;
