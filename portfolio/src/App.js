import { Routes, Route } from "react-router-dom";
import './App.css';
import { Portfolio } from "./views/portfolio";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Portfolio />} />
      </Routes>
    </div>
  );
}

export default App;
