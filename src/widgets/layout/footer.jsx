import PropTypes from "prop-types";
import { Typography, IconButton } from "@material-tailwind/react";
import React from "react";

const year = new Date().getFullYear();

export function Footer({ title, description, socials, menus }) {
  return (
    <footer>
      <div className="relative bg-slate-800 px-4 pb-6 pt-8 dark:bg-slate-800">
        <div className="container mx-auto">
          <div className="flex flex-wrap pt-6 text-center lg:text-left">
            <div className="w-full px-4 lg:w-6/12">
              <Typography
                variant="h4"
                className="mb-4 text-white"
                color="blue-gray"
              >
                {title}
              </Typography>
              <Typography className="bg:text-white font-normal text-blue-gray-200 lg:w-2/5">
                {description}
              </Typography>
              <div className="mx-auto mb-8 mt-6 flex justify-center gap-2 md:mb-0 lg:justify-start">
                {socials.map(({ color, name, path }) => (
                  <a
                    key={name}
                    href={path}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconButton
                      color="white"
                      className="rounded-full bg-transparent shadow-none"
                    >
                      <Typography color={color}>
                        <i className={`fa-brands fa-${name}`} />
                      </Typography>
                    </IconButton>
                  </a>
                ))}
              </div>
            </div>
            <div className="mx-auto mt-12 grid w-max grid-cols-2 gap-24 lg:mt-0">
              {menus.map(({ name, items }) => (
                <div key={name}>
                  <Typography
                    variant="small"
                    className="mb-2 block font-medium uppercase text-white"
                  >
                    {name}
                  </Typography>
                  <ul className="mt-3">
                    {items.map((item) => (
                      <li key={item.name}>
                        <Typography
                          as="a"
                          href={item.path}
                          target="_blank"
                          rel="noreferrer"
                          variant="small"
                          className="mb-2 block font-normal text-blue-gray-200 hover:text-blue-gray-100 dark:text-slate-400"
                        >
                          {item.name}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#00babc] p-2 text-center">
        <Typography variant="small">
          © 2024 BazaarHub. Information contained in this website is the
          property of the BazaarHub
        </Typography>
      </div>
    </footer>
  );
}

Footer.defaultProps = {
  title: "BazaarHub",
  description: "The Future of Seamless Market Fair Management",
  socials: [],
  menus: [
    {
      name: "Others",
      items: [{ name: "About Us", path: "/about-us" }],
    },
    {
      name: "other resources",
      items: [
        {
          name: "MIT License",
          path: "https://github.com/creativetimofficial/material-tailwind/blob/main/LICENSE.md?ref=mtk",
        },
        {
          name: "Contribute",
          path: "https://github.com/creativetimofficial/material-tailwind/blob/main/CONTRIBUTING.md?ref=mtk",
        },
        {
          name: "Change Log",
          path: "https://github.com/creativetimofficial/material-tailwind/blob/main/CHANGELOG.md?ref=mtk",
        },
        {
          name: "Template",
          path: "https://creative-tim.com/contact-us?ref=mtk",
        },
      ],
    },
  ],
};

Footer.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  socials: PropTypes.arrayOf(PropTypes.object),
  menus: PropTypes.arrayOf(PropTypes.object),
};

Footer.displayName = "/src/widgets/layout/footer.jsx";

export default Footer;
