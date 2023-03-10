import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {publicRoutes, privateRoutes} from "../router";

const AppRouter = () => {
  const isAuth = false;

  return (
    isAuth
      ?
        <Routes>
          {/*react-router-dom v6: Routes. v5: Switch */}
          { privateRoutes.map( ({path, component: Component}) =>
              <Route
                key={path}
                path={path}
                element={<Component />}
              />
            )
          }
          {/* react-router-dom v6: Route path=* v5: Redirect to */}
          <Route path="*" element={<Navigate to="/posts" replace /> } />
        </Routes>
      :
        <Routes>
          { publicRoutes.map( ({path, component: Component}) =>
              <Route
                key={path}
                path={path}
                element={<Component />}
              />
            )
          }
          <Route path="*" element={<Navigate to="/login" replace /> } />
        </Routes>
  );
};

export default AppRouter;
