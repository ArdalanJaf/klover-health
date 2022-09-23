import React from "react";
import Main from "./components/Main";
import GlobalStyles from "./components/styles/GlobalStyles";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="success" element={<p>payment sucess</p>} />
          <Route path="cancel" element={<p>payment cancelled</p>} />{" "}
          {/* take to same position on main (or purchase page if we have that) */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
