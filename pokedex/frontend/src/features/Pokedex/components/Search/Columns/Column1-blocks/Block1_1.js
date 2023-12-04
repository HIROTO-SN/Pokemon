import React from "react";

const Block1_1 = () => {

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
    <div>
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
    </div>
  );
};

export default Block1_1;
