import PropTypes from "prop-types";
import { Typography } from "@material-tailwind/react";
import React from "react";

export function PageTitle({ section, heading, children }) {
  return (
    <div className="mx-auto w-full px-4 text-center lg:w-6/12">
      <Typography variant="lead" className="font-semibold dark:text-white" color="black">{section}</Typography>
      <Typography variant="h2" color="black" className="my-3 dark:text-white">
        {heading}
      </Typography>
      <Typography variant="lead" className="text-blue-gray-500">
        {children}
      </Typography>
    </div>
  );
}

PageTitle.propTypes = {
  section: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

PageTitle.displayName = "/src/widgets/layout/page-title.jsx";

export default PageTitle;
