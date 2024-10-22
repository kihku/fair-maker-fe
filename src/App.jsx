import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Navbar } from "@/widgets/layout";
import routes from "@/routes";
import {
  useLocalStorageState,
  useSessionStorageState,
  useRequest,
} from "ahooks";
import React, { useState } from "react";
import { FairCreate, FairDetail, FairList, RegisterForm } from "./pages";
import { ConfigProvider, theme } from "antd";
import { getUserInfo } from "@/apis";
import { VendorCreate } from "./pages/vendor-create";
import { FairApply } from "./pages/apply-fair";

function App() {
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { pathname } = useLocation();

  const [userData, setUserData] = useSessionStorageState("userData");
  const [authToken, _] = useLocalStorageState("token");

  useRequest(getUserInfo, {
    ready: !userData && authToken,
    onSuccess: (result, params) => {
      setUserData(result);
    },
    onError: (result, params) => {
      console.log("failed");
    },
    defaultParams: [authToken],
  });

  const local_routes = userData
    ? routes.filter((route) => !["/sign-in"].includes(route.path))
    : routes;
  return (
    <>
      {!(pathname == "/sign-in" || pathname == "/register") && (
        <div className="container absolute left-2/4 z-10 mx-auto -translate-x-2/4 p-4">
          <Navbar
            isDarkMode={isDarkMode}
            onDarkModeChange={() => setIsDarkMode(!isDarkMode)}
            routes={local_routes}
          />
        </div>
      )}
      <ConfigProvider
        theme={{
          algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
        }}
      >
        <Routes>
          {local_routes.map(
            ({ path, element }, key) =>
              element && <Route key={key} path={path} element={element} />,
          )}
          <Route path="/fair-list" key="fairList" element={<FairList />} />
          <Route path="/register" key="register" element={<RegisterForm />} />
          <Route
            path="/vendor-create"
            key="vendorCreate"
            element={<VendorCreate />}
          />
          <Route
            path="/fair-detail/:eventId"
            key="fairDetail"
            element={<FairDetail />}
          />
          <Route
            path="/fair-create"
            key="fairCreate"
            element={<FairCreate />}
          />
          <Route
            path="/fair-apply/:eventId"
            key="fairApply"
            element={<FairApply />}
          />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </ConfigProvider>
    </>
  );
}

export default App;
