import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Contents from "./components/Contents.js";
import Navbar from "./components/Navbar.js";

function App() {
  return (
    <Router>
      <Navbar />
      <Contents />
    </Router>
  );
}

export default App;
