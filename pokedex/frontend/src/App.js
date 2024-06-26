import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Backtotop from "./components/BackToTop/Backtotop.js";
import Login from "./components/Login/Login.js";
import Signup from "./components/Login/SingupAccount/Signup.js";
import Navbar from "./components/Navbar/Navbar.js";
import Profile from "./components/Profile/Profile.js";
import { LoadContextProvider } from "./contexts/LoadContext.js";
import { LoginProvider } from "./contexts/LoginContext.js";
import Animation from "./features/Animation/Main.js";
import Home from "./features/Home/Main.js";
import News from "./features/News/Main.js";
import PlayEvents from "./features/PlayEvents/Main.js";
import PokemonDetails from "./features/Pokedex/components/Details/PokemonDetails.js";
import Footer from "./features/Pokedex/components/Footer/Footer.js";
import FooterDivider from "./features/Pokedex/components/Footer/FooterDivider.js";
import Pokedex from "./features/Pokedex/components/index.js";
import { DetailProvider } from "./features/Pokedex/contexts/DetailContext.js";
import TradingCard from "./features/TradingCard/Main.js";
import VideoGames from "./features/VideoGames/Main.js";

function App() {
  return (
    <LoginProvider>
      <LoadContextProvider>
        {/* <Head /> */}
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" />
            <Route path="/login" element={<Login />}></Route>
            <Route path="/verifyaccount/:pageNo" element={<Signup />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/pokedex" element={<Pokedex />}></Route>
            <Route
              path="/pokedex/:pokemonName"
              element={
                <DetailProvider>
                  <PokemonDetails />
                </DetailProvider>
              }
            />
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
      </LoadContextProvider>
    </LoginProvider>
  );
}

export default App;
