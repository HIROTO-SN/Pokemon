import "./Navbar.css";

const Navbar = () => {
  return (
    <>
      <nav className="main">
        <li className="nav-item none"></li>
        <li className="nav-item">
          <span className="icon">
            <img src="./icons/home.png" height="30px" vspace="2px" />
          </span>
          <span className="title">Home</span>
        </li>
        <li className="nav-item">
          <span className="icon">
            <img src="./icons/pokeball.png" height="30px" vspace="2px" />
          </span>
          <span className="title">Pokédex</span>
        </li>
        <li className="nav-item">
          <span className="icon">
            <img src="./icons/gamepad.png" height="30px" vspace="2px" />
          </span>
          <span className="title">Video Games & Apps</span>
        </li>
        <li className="nav-item">
          <span className="icon">
            <img src="./icons/trading.png" height="30px" vspace="2px" />
          </span>
          <span className="title">Trading Card Game</span>
        </li>
        <li className="nav-item">
          <span className="icon">
            <img src="./icons/tv.png" height="30px" vspace="2px" />
          </span>
          <span className="title">Pokédex TV</span>
        </li>
        <li className="nav-item">
          <span className="icon">
            <img src="./icons/trophy.png" height="30px" vspace="2px" />
          </span>
          <span className="title">Play! Pokédex Events</span>
        </li>
        <li className="nav-item">
          <span className="icon">
            <img src="./icons/newspaper-folded.png" height="30px" vspace="2px" />
          </span>
          <span className="title">News</span>
        </li>
        <li className="nav-item none"></li>
      </nav>
    </>
  );
};

export default Navbar;
