import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path=":id" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
