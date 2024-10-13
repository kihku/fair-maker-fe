import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Navbar } from "@/widgets/layout";
import routes from "@/routes";
import { useLocalStorageState } from "ahooks";
import { useEffect } from "react";

function App() {
  const { pathname } = useLocation();

  const [token,] = useLocalStorageState("token");

  const local_routes = token
    ? routes.filter((route) => !["/sign-in", "/sign-up"].includes(route.path))
    : routes;

  console.log(local_routes);
  return (
    <>
      {!(pathname == "/sign-in" || pathname == "/sign-up") && (
        <div className="container absolute left-2/4 z-10 mx-auto -translate-x-2/4 p-4">
          <Navbar routes={local_routes} />
        </div>
      )}
      <Routes>
        {local_routes.map(
          ({ path, element }, key) =>
            element && <Route key={key} exact path={path} element={element} />,
        )}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </>
  );
}

export default App;
