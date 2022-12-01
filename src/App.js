import React from "react";
import Main from "./components/Main";
import Admin from "./components/admin/Admin";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="booked" element={<Main bookingMade={true} />} />
          {/* <Route path="cancel" element={<p>payment cancelled</p>} />{" "} */}
          <Route path="admin" element={<Admin />} />{" "}
        </Routes>
      </Router>
    </>
  );
}

export default App;
