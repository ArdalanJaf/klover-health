import React from "react";
import Main from "./components/Main";
import Admin from "./components/admin/Admin";
import { Route, Routes, Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route index element={<Main />} />
          <Route path="booked" element={<Main bookingMade={true} />} />
          <Route path="admin" element={<Admin />} />
          <Route path="*" element={<p>404 baby</p>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
