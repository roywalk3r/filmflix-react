import "./App.css";
import Home from "./components/Home/Home";
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
        {/* <Route path="/movies" element={<MovieDetails />} /> */}
        <Route index element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
