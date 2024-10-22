import { FairList, Home, Profile, SignIn } from "@/pages";
import React from "react";
import { RegisterForm } from "./pages/register-form";
import { FairManagement } from "./pages/fair-management";

export const routes = [
  {
    name: "home",
    path: "/home",
    element: <Home />,
  },
  {
    name: "profile",
    path: "/profile",
    element: <Profile />,
  },
  {
    name: "Sign In",
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    name: "About",
    path: "/home",
    element: <Home />,
  },
  {
    name: "Fair Management",
    path: "/fair-management",
    element: <FairManagement />,
  },
];

export default routes;
