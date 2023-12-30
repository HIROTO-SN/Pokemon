import Navbar from "./components/Navbar/Navbar.js";
import "./App.css";
import Footer from "./features/Pokedex/components/Footer/Footer.js";
import FooterDivider from "./features/Pokedex/components/Footer/FooterDivider.js";
import Pokedex from "./features/Pokedex/components/Main.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./features/Home/Main.js";
import Animation from "./features/Animation/Main.js";
import News from "./features/News/Main.js";
import PlayEvents from "./features/PlayEvents/Main.js";
import TradingCard from "./features/TradingCard/Main.js";
import VideoGames from "./features/VideoGames/Main.js";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
        </Routes>
      </Router>
      <FooterDivider />
      <Footer />
    </>
  );
}

export default App;
