import { FairList, Home, Profile, SignIn, SignUp, Store } from "@/pages";
import React from "react";
import { RegisterForm } from "./pages/register-form";

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
  {
    name: "Register form",
    path: "/register",
    element: <RegisterForm />,
  },
];

export default routes;
