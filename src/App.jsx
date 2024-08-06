import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Splash from "./pages/Splash";
import Home2 from "./pages/Home2";
import Option from "./pages/Option";
import Star from "./pages/Star";
import DetailedInfo from "./pages/DetailedInfo";
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
            <Route path="/home" element={<Home2 />} />
            <Route path="/star" element={<Star />} />
            <Route path="/:id" element={<DetailedInfo />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
