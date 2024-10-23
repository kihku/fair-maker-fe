import { citiesOfCountries, getListFair, getOrgMetadata, getUserOrg, orgApplication } from "@/apis";
import { FAIR_LIST } from "@/data";
import { PaymentForm } from "@/widgets/components";
import { FairCard } from "@/widgets/components/fair-card";
import { Footer } from "@/widgets/layout";
import { STATUS_TO_TEXT, validateMessages } from "@/widgets/utils";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  Button,
  Card,
  Empty,
  Form,
  Modal,
  Pagination,
  QRCode,
  Select,
  Tag,
  Timeline,
} from "antd";
import { useLocalStorageState, useRequest, useSessionStorageState, useUpdateEffect } from "ahooks";
import React, { useEffect, useState } from "react";

export function FairList() {
  const stripePromise = loadStripe("your_public_stripe_key_here");
  const [orgData, setOrgData] = useSessionStorageState("orgData", { listenStorageChange: true });

  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const [form] = Form.useForm();
  const [authToken, _] = useLocalStorageState("token");
  useRequest(getUserOrg, {
    ready: authToken && !orgData,
    onSuccess: (result, params) => {
      setOrgData(result);
      runFetchCities(result?.country);
    },
    defaultParams: [authToken],
  });
  const [filterParams, setFilterParams] = useState({
    city: undefined,
    country: undefined,
    tags: undefined,
    page: {
      currentPage: 1,
    },
  });
  const [pageInfo, setPage] = useState();
  const { run: runGetList, loading: loadingList } = useRequest(
    () => getListFair(filterParams, authToken),
    {
      onSuccess: (result, params) => {
        console.log(result);
        const { data, page } = result;
        setFairList(data);
        setPage(page);
      },
    },
  );
  useUpdateEffect(runGetList, [filterParams, authToken]);
  const [orgMetadata, setOrgMetadata] = useState({
    company_size: [],
    tags: [],
    countries: [],
  });
  const [cities, setCities] = useState([]);
  useRequest(getOrgMetadata, {
    onSuccess: (result, params) => {
      setOrgMetadata(result);
    },
  });
  const { run: runFetchCities } = useRequest(citiesOfCountries, {
    manual: true,
    onSuccess: (result, params) => {
      setCities(result.cities);
    },
  });
  const [fairList, setFairList] = useState([]);

  const { data: applications } = useRequest(orgApplication, {
    ready: (orgData && authToken),
    defaultParams: [orgData?.id, authToken]
  })

  const [selectedStatus, setSelectedStatus] = useState("IN_PROGRESS");

  return (
    <>
      <Modal
        centered
        open={open}
        title="Application Information"
        onCancel={() => setOpen(false)}
        footer={[
          <Button key="back" onClick={() => setOpen(false)}>
            Back
          </Button>,
        ]}
      >
        <div className="pt-5">
          <p className="mb-4 text-base font-bold dark:text-white">Timeline</p>
          <Timeline
            mode="left"
            items={[
              {
                label: "2015-09-01",
                children: "Application Received",
              },
              {
                label: "2015-09-01 09:12:11",
                children: "Application Approved",
              },
              {
                children: "Booth Assigned, Payment Requested",
              },
              {
                label: "2015-09-01 09:12:11",
                children: "Payment received, ",
              },
            ]}
          />
          {(selectedStatus == "FINALIZED") && (
            <>
              <p className="mb-4 mt-10 text-base font-bold dark:text-white">
                Entrance QR Code
              </p>
              {/* fill qr code text here */}
              <QRCode value={"-"} />
            </>
          )}
          {(selectedStatus == "APPROVE") && (
            <>
              <p className="mb-1 mt-10 text-base font-bold dark:text-white">
                Payment
              </p>
              <p className="mb-4 text-base dark:text-white">
                Choose your payment method
              </p>
              <Elements stripe={stripePromise}>
                <PaymentForm />
              </Elements>
            </>
          )}
        </div>
      </Modal>
      <div className="h-24 bg-black"></div>
      <div className="relative flex min-h-screen flex-col px-5 pb-32 pt-16 dark:bg-stone-900  lg:px-32">
        {true && (
          <section>
            <p className="mb-4 mt-10 text-3xl font-bold dark:text-white">
              Your applications
            </p>
            <div className="flex w-full flex-wrap gap-5">

              {applications && (
                applications.map(({ event_name, status }) => (
                  <Card
                    onClick={() => {showModal(); setSelectedStatus(status); console.log(selectedStatus)}}
                    className="w-full	 hover:cursor-pointer lg:w-1/2"
                    title={event_name}
                    extra={<Tag color={STATUS_TO_TEXT[status][0]}>{STATUS_TO_TEXT[status][1]}</Tag>}
                  >
                    <p>Your application is being processed by the organizer</p>
                  </Card>
                ))
              )}
            </div>
          </section>
        )}

        <section className="w-full">
          <p className="mb-4 mt-10 text-3xl font-bold dark:text-white">
            Upcoming events
          </p>
          <div>
            <form className=" mt-5 flex flex-wrap gap-4">
              <Select
                allowClear
                showSearch
                optionFilterProp="label"
                placeholder="Country"
                className="min-w-[200px] dark:text-white lg:w-40"
                options={orgMetadata?.countries}
                onChange={(country) => {
                  setFilterParams({ ...filterParams, country });
                  runFetchCities(country);
                }}
              />
              <Select
                allowClear
                showSearch
                optionFilterProp="label"
                placeholder="City"
                className="min-w-[200px] dark:text-white lg:w-40"
                options={cities}
                onChange={(city) => setFilterParams({ ...filterParams, city })}
              />
              <Select
                allowClear
                showSearch
                optionFilterProp="label"
                placeholder="Categories"
                options={orgMetadata?.tags}
                className="min-w-[200px] dark:text-white lg:w-80"
                onChange={(tags) => setFilterParams({ ...filterParams, tags })}
              />
            </form>
          </div>
          <div className="my-10 flex flex-row flex-wrap gap-5">
            {fairList?.length > 0 ? (
              fairList.map(
                ({
                  event_name: title,
                  description,
                  pictures,
                  tags,
                  city,
                  country,
                  street_addr,
                  id,
                }) => (
                  <FairCard
                    color="black"
                    title={title}
                    description={description}
                    pictureUrl={pictures.banner[0].url}
                    tags={tags}
                    location={`${street_addr}, ${city}, ${country}`}
                    id={id}
                  />
                ),
              )
            ) : (
              <Empty className="w-full" />
            )}
          </div>
        </section>
        <div className="flex justify-center">
          <Pagination
            onChange={(value) => {
              setFilterParams({
                ...filterParams,
                page: {
                  currentPage: value,
                },
              });
            }}
            total={pageInfo?.total}
            pageSize={pageInfo?.pageSize}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
