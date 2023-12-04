import Navbar from "./components/Navbar/Navbar.js";
import "./App.css";
import Footer from "./features/Pokedex/components/Footer/Footer.js";
import FooterDivider from "./features/Pokedex/components/Footer/FooterDivider.js";
import Pokedex from "./features/Pokedex/components/index.js";

function App() {
  return (
    <>
      <Navbar/>
      <Pokedex/>
      <FooterDivider/>
      <Footer/>
    </>
  );
}

export default App;
