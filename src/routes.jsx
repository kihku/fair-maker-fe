import { FairList, Home, Profile, SignIn, SignUp, Store } from "@/pages";
import React from "react";

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
    name: "Sign Up",
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    name: "About",
    path: "/home",
    element: <Home />,
  },
];

export default routes;
