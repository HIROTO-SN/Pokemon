import Navbar from "./components/Navbar/Navbar.js";
import "./App.css";
import Footer from "./features/Pokedex/components/Footer/Footer.js";
import FooterDivider from "./features/Pokedex/components/Footer/FooterDivider.js";
import Pokedex from "./features/Pokedex/components/index.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./features/Home/Main.js";
import Animation from "./features/Animation/Main.js";
import News from "./features/News/Main.js";
import PlayEvents from "./features/PlayEvents/Main.js";
import TradingCard from "./features/TradingCard/Main.js";
import VideoGames from "./features/VideoGames/Main.js";
import Login from "./components/Login/Login.js";
import Backtotop from "./components/BackToTop/Backtotop.js";
import Head from "./components/Head/Head.js";
import { LoginProvider } from "./contexts/LoginContext.js";
import Profile from "./components/Profile/Profile.js";

function App() {
  return (
    <LoginProvider>
      {/* <Head /> */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/pokedex" element={<Pokedex />}></Route>
          <Route path="/pokemon-video-games" element={<VideoGames />}></Route>
          <Route path="/pokemon-tcg" element={<TradingCard />}></Route>
          <Route path="/animation" element={<Animation />}></Route>
          <Route path="/play-pokemon" element={<PlayEvents />}></Route>
          <Route path="/pokemon-news" element={<News />}></Route>
        </Routes>
      </Router>
      <Backtotop />
      <FooterDivider />
      <Footer />
    </LoginProvider>
  );
}

export default App;
