import {
  Avatar,
  Typography,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
} from "@material-tailwind/react";
import { MapPinIcon, BriefcaseIcon } from "@heroicons/react/24/solid";
import { Footer } from "@/widgets/layout";
import { chartConfig } from "@/data";
import Spline from "@splinetool/react-spline";

import { useLocalStorageState, useRequest } from "ahooks";
import { send_request } from "@/util";
import React from "react";

const TABLE_HEAD = ["User", "Rank", "Stars Earned"];

const rank_to_text = {
  1: "Rookie",
  2: "Cadet",
  3: "Warrior",
  4: "Champion",
  5: "Legend",
};

export function Profile() {
  const [token] = useLocalStorageState("token");
  const [userProfile] = useLocalStorageState("userData", {
    listenStorageChange: true,
  });
  const [avatar] = useLocalStorageState("avatar");

  if (!token) {
    window.open("/sign-in", "_self");
  }

  async function getLeaderboard() {
    let data = await send_request("GET", "/leaderboard", {
      Authorization: `Bearer ${token}`,
    });

    let leaderboard = data?.leaderboard.map((entry) => {
      return { ...entry, rank: rank_to_text[entry.rank] };
    });

    return leaderboard;
  }

  const { data, error, loading } = useRequest(getLeaderboard, { ready: token });

  return (
    <>
      <section className="relative block h-[50vh]">
        <div className="bg-profile-background absolute top-0 h-full w-full scale-100 bg-[url('/img/background-3.jpg')] bg-cover bg-center" />
        <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center dark:bg-slate-900/60" />
      </section>
      <section className="relative bg-white py-16 dark:bg-slate-900">
        <div className="relative -mt-40 mb-6 flex w-full min-w-0 flex-col break-words bg-white px-4 dark:bg-slate-900">
          <div className="container mx-auto">
            <div className="flex flex-col justify-between lg:flex-row">
              <div className="relative flex items-start gap-6">
                <div className="-mt-20 w-40">
                  <Avatar
                    src={avatar}
                    alt="Profile picture"
                    variant="circular"
                    className="h-full w-full"
                  />
                </div>
                <div className="mt-2 flex flex-col">
                  <Typography
                    variant="h4"
                    color="blue-gray"
                    className="dark:text-white"
                  >
                    {userProfile.full_name}
                  </Typography>
                  <Typography
                    variant="paragraph"
                    color="gray"
                    className="!mt-0 font-normal dark:text-white"
                  >
                    {userProfile.email}
                  </Typography>
                </div>
              </div>

              <div className="mb-10 mt-10 flex flex-wrap items-center justify-between lg:-mt-5 lg:mb-0 lg:flex-col lg:justify-end lg:px-4">
                <div className="flex justify-start pt-4 lg:pt-8">
                  <div className="mr-4 p-3 text-center">
                    <Typography
                      variant="lead"
                      color="blue-gray"
                      className="font-bold uppercase dark:text-white"
                    >
                      {userProfile.points}
                    </Typography>
                    <Typography
                      variant="small"
                      className="font-semibold text-blue-gray-500 dark:text-slate-400"
                    >
                      Green Badges
                    </Typography>
                  </div>
                  <div className="mr-4 p-3 text-center">
                    <Typography
                      variant="lead"
                      color="blue-gray"
                      className="font-bold uppercase dark:text-white"
                    >
                      {userProfile.total_points}
                    </Typography>
                    <Typography
                      variant="small"
                      className="font-semibold text-blue-gray-500 dark:text-slate-400"
                    >
                      Life-time Badges
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
            <div className="container mt-4 space-y-2">
              <div className="flex items-center gap-2">
                <MapPinIcon className="-mt-px h-4 w-4 text-blue-gray-500 dark:text-white" />
                <Typography className="font-medium text-blue-gray-500 dark:text-white">
                  {userProfile.city}, {userProfile.country}
                </Typography>
              </div>
              <div className="flex items-center gap-2">
                <BriefcaseIcon className="-mt-px h-4 w-4 text-blue-gray-500 dark:text-white" />
                <Typography className="font-medium text-blue-gray-500 dark:text-white">
                  {rank_to_text[userProfile.rank]}
                </Typography>
              </div>
              <Typography className="font-medium text-blue-gray-500 dark:text-slate-400 lg:absolute lg:mr-96">
                Nature has always been my safe haven. Whether it’s the calming
                sound of the waves crashing on the shore or the crisp, fresh air
                of a mountain hike, being outdoors makes me feel alive and
                connected. I find beauty in the little things—like the way
                sunlight filters through the trees or the way flowers bloom in
                vibrant colors. I’m passionate about living sustainably and
                doing my part to protect this incredible planet. Volunteering
                for conservation projects brings me joy, and I love learning
                from the wisdom of nature. When I’m not out exploring new
                trails, you’ll find me practicing yoga under a canopy of trees,
                drawing landscapes, or planning my next adventure to some
                remote, untouched corner of the world. My dream? To keep
                growing, learning, and living in harmony with the earth.
              </Typography>
            </div>
          </div>
          {/* ------TREE HERE */}
          <div className="mt-10 h-full lg:mt-14">
            <Spline scene="https://prod.spline.design/1vZlowhn6xIzlpor/scene.splinecode" />
          </div>
          {/* ------TREE HERE */}

          <div className="mx-2 flex flex-col gap-8 px-4 lg:mx-48 lg:-mt-5 lg:flex-row ">
            <Card className="flex-1 dark:bg-slate-800">
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="flex w-96 flex-col gap-4 rounded-none md:flex-row md:items-center"
              >
                <div>
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="dark:text-white"
                  >
                    Monthly activities
                  </Typography>
                  <Typography
                    color="gray"
                    className="mt-1 font-normal dark:text-white"
                  >
                    See information about all members
                  </Typography>
                </div>
              </CardHeader>
            </Card>

            <Card className="h-1/3 flex-1 overflow-y-auto dark:bg-slate-800">
              <CardHeader
                floated={false}
                shadow={false}
                className="rounded-none"
              >
                <div className="flex items-center justify-between gap-8 dark:bg-slate-800">
                  <div>
                    <Typography
                      variant="h5"
                      color="blue-gray"
                      className="dark:text-white"
                    >
                      Country Leaderboard
                    </Typography>
                    <Typography
                      color="gray"
                      className="mt-1 font-normal dark:text-white"
                    >
                      The best green warriors accross {userProfile.country}
                    </Typography>
                  </div>
                </div>
              </CardHeader>
              <CardBody className="px-0">
                <table className="mt-4 w-full min-w-max table-auto text-left ">
                  <thead>
                    <tr>
                      {TABLE_HEAD.map((head) => (
                        <th
                          key={head}
                          className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 dark:bg-slate-800"
                        >
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold leading-none opacity-70 dark:text-slate-400"
                          >
                            {head}
                          </Typography>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map(
                      ({ total_points, full_name, rank, id }, index) => {
                        const isLast = index === data.length - 1;
                        const classes = isLast
                          ? "p-4"
                          : "p-4 border-b border-blue-gray-50";

                        return (
                          <tr key={full_name}>
                            <td className={classes}>
                              <div className="flex items-center gap-3">
                                <div className="flex flex-col">
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal dark:text-white"
                                  >
                                    {full_name}
                                  </Typography>
                                </div>
                              </div>
                            </td>
                            <td className={classes}>
                              <div className="flex flex-col">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal dark:text-white"
                                >
                                  {rank}
                                </Typography>
                              </div>
                            </td>
                            <td className={classes}>
                              <div className="flex flex-col">
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal dark:text-white"
                                >
                                  {total_points}
                                </Typography>
                              </div>
                            </td>
                          </tr>
                        );
                      },
                    )}
                  </tbody>
                </table>
              </CardBody>
              <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4 dark:border-slate-400">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal dark:text-white"
                >
                  Page 1 of 10
                </Typography>
                <div className="flex gap-2">
                  <Button
                    variant="outlined"
                    size="sm"
                    className="dark:bg-white dark:text-slate-800"
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outlined"
                    size="sm"
                    className="dark:bg-white dark:text-slate-800"
                  >
                    Next
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
      <div className="bg-white">
        <Footer />
      </div>
    </>
  );
}

export default Profile;
