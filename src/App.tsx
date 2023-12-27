import "./App.css";
import Home from "./components/Home/Home";
import LandingPage from "./components/LandingPage/LandingPage";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import Navbar from "./components/NavBar/NavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
