import "./App.css";
import Home from "./components/Home/Home";
import LandingPage from "./components/LandingPage/LandingPage";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import Navbar from "./components/NavBar/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchMovie from "./components/SearchMovie/SearchMovie";
import Movies from "./components/Movies/Movies";
import Kids from "./components/Kids/Kids";
import TvShows from "./components/TvShows/TvShows";
import TvShowDetails from "./components/TvShowDetails/TvShowDetails";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/tv/:id" element={<TvShowDetails />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/search" element={<SearchMovie />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/kids" element={<Kids />} />
        <Route path="/tv_shows" element={<TvShows />} />
      </Routes>
    </Router>
  );
}

export default App;
