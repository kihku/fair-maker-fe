import { VendorPicker } from "@/widgets/components";
import { getFairDetail, getOrganizationData } from "@/apis";
import { Footer } from "@/widgets/layout";
import { FacebookFilled, InstagramFilled } from "@ant-design/icons";
import { useLocalStorageState, useRequest } from "ahooks";
import { Button, Carousel, Tag, Typography } from "antd";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

export function FairDetail() {
  let { eventId } = useParams();

  const [authToken, _] = useLocalStorageState("token");

  const datePrintOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const { data: fairDetail } = useRequest(getFairDetail, {
    onSuccess: (result, params) => {
      console.log(result);
    },
    defaultParams: [eventId, authToken],
  });

  const { data: organizerData } = useRequest(getOrganizationData, {
    defaultParams: [eventId, authToken],
    ready: eventId,
  });
  return (
    <div className="bg-white dark:bg-stone-900">
      <div className="h-24 bg-black"></div>
      <Carousel autoplay className="relative h-fit lg:h-96">
        {fairDetail?.pictures.banner.map(({ url }) => (
          <img
            src={url}
            alt="image 1"
            className="h-[600px] w-full object-cover blur-[1px] lg:h-96"
          />
        ))}
      </Carousel>
      <div className="absolute top-24 h-[600px] w-full bg-black/50 bg-cover bg-center dark:bg-slate-900/40 lg:h-96" />
      <div className="absolute top-28 flex w-full  flex-wrap items-center justify-between gap-12 p-10 lg:px-52">
        <div>
          <p className="mb-4 text-5xl font-bold text-white">
            {fairDetail?.event_name}
          </p>
          <p className="mb-6 text-lg  font-bold text-white">
            By {fairDetail?.organizer}
          </p>
          <Typography className="text-white">
            {`${fairDetail?.street_addr}, ${fairDetail?.city}, ${fairDetail?.country}`}
          </Typography>
          <Typography className="text-white">
            {`${new Date(fairDetail?.start_date).toLocaleDateString(
              undefined,
              datePrintOptions,
            )} - ${new Date(fairDetail?.end_date).toLocaleDateString(
              undefined,
              datePrintOptions,
            )} | 
            
            ${new Date(
              fairDetail?.details.config.operation_hours[0],
            ).toLocaleTimeString("de-DE")}
            -
            ${new Date(
              fairDetail?.details.config.operation_hours[1],
            ).toLocaleTimeString("de-DE")}
            
            `}
          </Typography>
        </div>
        <div className="flex h-fit w-fit flex-col gap-3 rounded-lg bg-white px-10 py-5 dark:bg-stone-900 md:px-20">
          <p className=" text-xl font-bold dark:text-white">
            Apply to be a vendor
          </p>
          <p className="text-sm text-gray-600 dark:text-stone-300">
            About the{" "}
            <a
              className="font-bold text-blue-700 dark:text-blue-400"
              onClick={() => { }}
            >
              terms and conditions
            </a>{" "}
            of vendors
          </p>
          <Button
            type="primary"
            onClick={() => {
              window.open(`/fair-apply/${eventId}`, "_self");
            }}
          >
            Apply Now
          </Button>
          <Typography>Or book your tickets with discounted prices</Typography>
          <Button type="primary" className="bg-amber-500">
            Buy Ticket
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap gap-32 px-5 py-20 lg:flex-nowrap lg:px-52">
        <div>
          <p className="mb-4 text-3xl font-bold dark:text-white">Description</p>
          <Typography.Paragraph>{fairDetail?.description}</Typography.Paragraph>
          <p className="mb-4 mt-10 text-3xl font-bold dark:text-white">Hours</p>
          <Typography>
            <span className="font-bold">Hour:</span>
            {`
            ${new Date(
              fairDetail?.details.config.operation_hours[0],
            ).toLocaleTimeString("de-DE")}
            -
            ${new Date(
              fairDetail?.details.config.operation_hours[1],
            ).toLocaleTimeString("de-DE")}
              `}
          </Typography>
          <p className="mb-4 mt-10 text-3xl font-bold dark:text-white">
            Organizer Information
          </p>
          <Typography.Paragraph>
            Organizer name: {organizerData?.organization_name} <br></br>
            Organizer headquater:{" "}
            {`${organizerData?.contact_address}, ${organizerData?.city_label}, ${organizerData?.country_label}`}
            <br></br>
            Organizer phone contact: {organizerData?.contact_phone}
            <br></br>
            Organizer email : {organizerData?.email}
            <br></br>
            Organizer years in operation: {
              organizerData?.years_of_operation
            }{" "}
            years<br></br>
          </Typography.Paragraph>
          <p className="mb-4 mt-10 text-3xl font-bold dark:text-white">
            Vendor Map
          </p>
          <VendorPicker />
        </div>
        <div>
          <p className="mb-4 text-3xl font-bold dark:text-white">Event Map</p>
          <div className="mb-5 overflow-hidden rounded-3xl lg:w-96">
            <img src={fairDetail?.pictures.map.url}></img>
          </div>
          {/* <Typography.Paragraph>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words, consectetur, from a Lorem Ipsum passage, and
            going through the cites of the
          </Typography.Paragraph> */}
          <p className="mb-4 mt-10 text-3xl font-bold dark:text-white">Tags</p>
          {fairDetail?.tags.map(({ value, label }) => (
            <Tag color="red">{label}</Tag>
          ))}

          <p className="mb-4 mt-10 text-3xl font-bold dark:text-white">
            Share with friends
          </p>
          <div className="flex gap-2">
            <Button type="primary" shape="circle" icon={<FacebookFilled />} />
            <Button type="primary" shape="circle" icon={<InstagramFilled />} />
          </div>
        </div>
      </div>

      <div className="px-5 pb-20 lg:px-52">
        <p className="mb-4 text-3xl font-bold dark:text-white">
          Other resources
        </p>
        <div className="overflow-hidden rounded-3xl">
          <Carousel arrows>
            {fairDetail?.pictures.banner.map(({ url }) => (
              <img
                src={url}
                alt="image 1"
                className="h-[400px] w-full object-cover blur-[1px] lg:h-96"
              />
            ))}
          </Carousel>
        </div>
      </div>

      <Footer />
    </div>
  );
}
