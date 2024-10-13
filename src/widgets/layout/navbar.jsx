import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Navbar as MTNavbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import { useLocalStorageState } from "ahooks";

import { send_request } from "@/util";

export function Navbar({ brandName, routes, action }) {
  const [openNav, setOpenNav] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleOpen = (isOpen) => setOpen(isOpen);

  const [file, setFile] = React.useState([]);
  const inputFile = React.useRef(null);

  const [,setUserProfile] = useLocalStorageState('userData');
  const [token,] = useLocalStorageState('token');

  async function getBadge() {
    if (token) {
      let data = await send_request("POST", `/add_point`, { 'Authorization': `Bearer ${token}` });

      if (data) {
        setUserProfile(data);
      }
    }
  }


  const handleChange = (e) => {
    setFile([...file, e.target.files[0]]);
  };

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 text-inherit lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {routes.map(({ name, path, icon, href, target }) => (
        <Typography
          key={name}
          as="li"
          variant="small"
          color="inherit"
          className="capitalize"
        >
          {href ? (
            <a
              href={href}
              target={target}
              className="flex items-center gap-1 p-1 font-bold"
            >
              {icon &&
                React.createElement(icon, {
                  className: "w-[18px] h-[18px] opacity-75 mr-1",
                })}
              {name}
            </a>
          ) : (
            <Link
              to={path}
              target={target}
              className="flex items-center gap-1 p-1 font-bold"
            >
              {icon &&
                React.createElement(icon, {
                  className: "w-[18px] h-[18px] opacity-75 mr-1",
                })}
              {name}
            </Link>
          )}
        </Typography>
      ))}
    </ul>
  );

  return (
    <MTNavbar color="transparent" className="p-3">
      <div className="container mx-auto flex items-center justify-between text-white">
        <Link to="/">
          <Typography className="ml-2 mr-4 cursor-pointer py-1.5 font-bold">
            {brandName}
          </Typography>
        </Link>
        <div className="hidden lg:block">{navList}</div>
        <div className="hidden gap-2 lg:flex">
          <Button
            size="sm"
            onClick={() => {
              document.documentElement.classList.toggle("dark");
            }}
            className="hidden lg:inline-block"
          >
            Toggle Dark mode
          </Button>
          {React.cloneElement(action, {
            className: "hidden lg:inline-block",
            onClick: () => handleOpen(true),
          })}
        </div>
        <IconButton
          variant="text"
          size="sm"
          color="white"
          className="ml-auto text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon strokeWidth={2} className="h-6 w-6" />
          ) : (
            <Bars3Icon strokeWidth={2} className="h-6 w-6" />
          )}
        </IconButton>
      </div>
      <Dialog
        open={open}
        handler={handleOpen}
        size="xs"
        className="dark:bg-slate-800"
      >
        <DialogHeader className="dark:text-white">
          Upload your "Green Proof" here
        </DialogHeader>
        <DialogBody className="flex justify-center">
          <input
            type="file"
            ref={inputFile}
            onChange={handleChange}
            id="upload-photo"
          />
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => handleOpen(false)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            className=" dark:text-slate-900"
            variant="gradient"
            color="green"
            onClick={() => {
              handleOpen(false);
              getBadge();
            }}
          >
            <span>Submit</span>
          </Button>
        </DialogFooter>
      </Dialog>
      <MobileNav
        className="rounded-xl bg-white px-4 pb-4 pt-2 text-blue-gray-900"
        open={openNav}
      >
        <div className="container mx-auto">
          {navList}
          {React.cloneElement(action, {
            className: "w-full block",
            onClick: () => handleOpen(true),
          })}
        </div>
      </MobileNav>
    </MTNavbar>
  );
}

Navbar.defaultProps = {
  brandName: "Bazaar Hub",
  action: (
    <a>
      <Button color="green" variant="gradient" size="sm" fullWidth>
        Get green badge
      </Button>
    </a>
  ),
};

Navbar.propTypes = {
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  action: PropTypes.node,
};

Navbar.displayName = "/src/widgets/layout/navbar.jsx";

export default Navbar;
