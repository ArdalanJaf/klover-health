import React from "react";
import Main from "./components/Main";
import Admin from "./components/admin/Admin";
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
          <Route path="admin" element={<Admin />} />{" "}
          {/* take to same position on main (or purchase page if we have that) */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
