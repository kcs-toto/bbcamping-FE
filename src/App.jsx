import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Splash from "./pages/Splash";
import Home from "./pages/Home";
import Option from "./pages/Option";
import Star from "./pages/Star";
import './App.css'

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="content">
          <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/option" element={<Option />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/home" element={<Home />} />
            <Route path="/star" element={<Star />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
