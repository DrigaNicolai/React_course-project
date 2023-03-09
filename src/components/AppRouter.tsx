import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import About from "../pages/About";
import Posts from "../pages/Posts";
import Error from "../pages/Error";

const AppRouter = () => {
  return (
    <Routes>
      {/* react-router-dom v6: Routes. v5: Switch */}
      <Route path="/about" element={ <About /> } />
      <Route path="/posts" element={ <Posts /> } />
      <Route path="/error" element={ <Error /> } />
      {/* react-router-dom v6: Route path=* v5: Redirect to */}
      <Route path="*" element={<Navigate to="/error" replace /> } />
    </Routes>
  );
};

export default AppRouter;
