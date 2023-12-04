import Hamburger from "./NavContent/Hamburger";
import PrimaryNav from "./NavContent/PrimaryNav";
import "./Navbar.css";

const Navbar = () => {
  return (
      <nav className="main">
        <div className="blocker"></div>
        <Hamburger/>
        <PrimaryNav/>
      </nav>
  );
};

export default Navbar;
