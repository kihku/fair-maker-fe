import { Home, Profile, SignIn, SignUp, Store } from "@/pages";

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
    name: "Store",
    path: "/store",
    element: <Store/>,
  },
  {
    name: "About",
    path: "/home",
    element: <Home/>,
  },
];

export default routes;
