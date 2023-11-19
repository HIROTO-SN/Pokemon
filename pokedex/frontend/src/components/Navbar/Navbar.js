import "./Navbar.css";

const Navbar = ({initialURL, handlePrevPage, handleNextPage, nextURL, prevURL}) => {
  
  const scrollOnTop = () => {
    window.scroll({top: 0, behavior: 'instant'});
  }
	
	return (
    <>
      <nav>ポケモン図鑑
			</nav>
			<div className="btn">
				{prevURL !== initialURL && prevURL !== null && (<button className="btn-mae" onClick={()=> {handlePrevPage(); scrollOnTop();}}>前へ</button>)}
				{nextURL !== null && (<button onClick={()=> {handleNextPage(); scrollOnTop();}}>次へ</button>)}
			</div>
    </>
  );
};

export default Navbar;
