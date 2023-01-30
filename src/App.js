import React from "react";
import Main from "./components/Main";
import Admin from "./components/admin/Admin";
import { Route, Routes, Outlet } from "react-router-dom";
import Smallprint from "./components/Smallprint";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route index element={<Main />} />
          <Route path="booked" element={<Main bookingMade={true} />} />
          <Route path="admin" element={<Admin />} />
          <Route path="letter" element={<Main gpLetter={true} />} />
          <Route path="terms" element={<Smallprint content={0} />} />
          <Route
            path="modernslaverypolicy"
            element={<Smallprint content={1} />}
          />

          <Route path="*" element={<p>Error 404, Page does not exist.</p>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
