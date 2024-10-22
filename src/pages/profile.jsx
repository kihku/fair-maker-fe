import { Footer } from "@/widgets/layout";

import {
  useRequest,
  useSessionStorageState,
  useLocalStorageState,
} from "ahooks";
import React, { useState } from "react";
import { Avatar, Button, Tabs, Typography, Upload } from "antd";
import { PersonalInfo } from "@/widgets/components/personal-info";
import { VendorInfo } from "@/widgets/components/vendor-info";
import { citiesOfCountries, getOrgMetadata, getUserOrg } from "@/apis";
import { UploadOutlined } from "@ant-design/icons";

export function Profile() {
  const serverUrl = import.meta.env.VITE_SERVER_URL;

  const [userData, setUserData] = useSessionStorageState("userData");

  const [orgData, setOrgData] = useSessionStorageState("orgData");

  const [authToken, _] = useLocalStorageState("token");
  const [cities, setCities] = useState([]);

  const { data: orgMetadata } = useRequest(getOrgMetadata);

  const { run: runFetchCities } = useRequest(citiesOfCountries, {
    manual: true,
    onSuccess: (result, params) => {
      setCities(result.cities);
    },
  });

  useRequest(getUserOrg, {
    ready: authToken && !orgData,
    onSuccess: (result, params) => {
      setOrgData(result);
    },
    defaultParams: [authToken],
  });

  const TAB_ITEMS = [
    {
      key: "PERSONAL_INFO",
      label: "Personal Information",
      children: (
        <div className="h-[500px] bg-white dark:bg-stone-900">
          <PersonalInfo />
        </div>
      ),
    },
    {
      key: "VENDOR",
      label: "Vendor",
      children: (
        <div className="h-[500px] overflow-y-auto bg-white pr-5 dark:bg-stone-900">
          <VendorInfo
            orgData={orgData}
            cities={cities}
            runFetchCities={runFetchCities}
            orgMetadata={orgMetadata}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <section className="relative block h-[50vh]">
        <div className="bg-profile-background absolute top-0 h-full w-full scale-100 bg-[url('/img/homepage_carousel/pic_4.jpg')] bg-cover bg-center" />
        <div className="absolute top-0 h-full w-full bg-black/40 bg-cover bg-center dark:bg-slate-900/40" />
      </section>
      <section className="relative flex bg-white py-16 dark:bg-stone-900">
        <div className="relative -mt-40 mb-6 flex w-full min-w-0 flex-col break-words bg-white px-4 dark:bg-stone-900">
          <div className="container mx-auto">
            <div className="-mt-20 flex flex-col justify-between gap-10 lg:flex-row ">
              <div className="relative flex w-full basis-1/3 flex-col items-center gap-6 border border-gray-200 bg-white p-5 dark:border-stone-700 dark:bg-stone-900">
                <div className="h-40 w-40">
                  <Avatar
                    src={userData?.avatar}
                    size="large"
                    alt="Profile picture"
                    className="h-full w-full"
                  />
                </div>
                <div className="mt-2 flex flex-col text-center">
                  <Typography.Title
                    color="blue-gray"
                    className="dark:text-white"
                    level={2}
                  >
                    {userData?.first_name} {userData?.last_name}
                  </Typography.Title>
                  <Typography
                    color="gray"
                    className="!mt-0 font-normal dark:text-stone-300"
                  >
                    {userData?.email}
                  </Typography>
                  <hr className="my-3 w-full dark:border-stone-700" />
                  <Typography className="dark:text-white">
                    Fair Participated: 0
                  </Typography>
                  <hr className="my-3 w-full dark:border-stone-700" />
                  <Typography className="dark:text-white">
                    In progress Application: 0
                  </Typography>
                </div>
              </div>

              <div className="w-3/4 relative mb-10 flex grow items-center justify-between border border-gray-200 bg-white dark:border-stone-700 dark:bg-stone-900 lg:mb-0 lg:flex-col lg:px-4">
                <div className="flex w-full">
                  <div className=" w-full">
                    <Tabs defaultActiveKey="1" items={TAB_ITEMS}></Tabs>
                  </div>
                </div>
              </div>
            </div>
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
