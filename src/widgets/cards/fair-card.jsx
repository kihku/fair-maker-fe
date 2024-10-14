import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  IconButton,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import React from "react";

export function FairCard({
  color,
  title,
  description,
  pictureUrl,
  tags,
  location,
}) {
  return (
    <Card className="w-full max-w-[28rem] shadow-lg dark:bg-slate-800">
      <CardHeader
        floated={false}
        className="dark:shadow-none"
        color="blue-gray"
      >
        <img
          src="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          alt="ui/ux review check"
        />
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
        <IconButton
          size="sm"
          color="red"
          variant="text"
          className="!absolute right-4 top-4 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-6 w-6"
          >
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
        </IconButton>
      </CardHeader>
      <CardBody>
        <div className="mb-3 flex items-center justify-between ">
          <Typography
            variant="h5"
            color="blue-gray"
            className="font-medium dark:text-white"
          >
            {title}
          </Typography>
        </div>
        <p className="line-clamp-3 dark:text-slate-300">{description}</p>
        <p className="font-light dark:text-slate-300">
          <span className="mr-2">
            <i className="fa-solid fa-location-dot "></i>
          </span>
          {location}
        </p>
        <div className="group mt-8 inline-flex flex-wrap items-center gap-2">
          {tags?.slice(0, 3).map(({ color, name }) => (
            <div
              className={`rounded-full bg-gray-100 px-5 text-black dark:bg-slate-900 dark:text-white`}
            >
              {name}
            </div>
          ))}
          {tags?.length > 3 && (
            <Tooltip content={`And +${tags.length - 3} more`}>
              <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 px-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70 dark:bg-slate-900 dark:text-white">
                {`+${tags.length - 3}`}
              </span>
            </Tooltip>
          )}
        </div>
      </CardBody>
      <CardFooter className="pt-3">
        <Button size="lg" fullWidth={true}>
          More info
        </Button>
      </CardFooter>
    </Card>
  );
}

FairCard.defaultProps = {
  color: "black",
  location: "To be announced"
};

FairCard.propTypes = {
  color: PropTypes.oneOf([
    "blue-gray",
    "gray",
    "brown",
    "deep-orange",
    "orange",
    "amber",
    "yellow",
    "lime",
    "light-green",
    "green",
    "teal",
    "cyan",
    "light-blue",
    "blue",
    "indigo",
    "deep-purple",
    "purple",
    "pink",
    "red",
  ]),
  title: PropTypes.string.isRequired,
  description: PropTypes.node.isRequired,
  pictureUrl: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  location: PropTypes.string.isRequired,
};
