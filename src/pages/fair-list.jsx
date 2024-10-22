import { getListFair } from "@/apis";
import { FAIR_LIST } from "@/data";
import { PaymentForm } from "@/widgets/components";
import { FairCard } from "@/widgets/components/fair-card";
import { Footer } from "@/widgets/layout";
import { validateMessages } from "@/widgets/utils";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useRequest, useUpdateEffect } from "ahooks";
import {
  Button,
  Card,
  Form,
  Modal,
  Pagination,
  QRCode,
  Select,
  Tag,
  Timeline,
} from "antd";
import React, { useEffect, useState } from "react";

export function FairList() {
  const stripePromise = loadStripe("your_public_stripe_key_here");
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const [form] = Form.useForm();
  const [filterParams, setFilterParams] = useState({
    location: undefined,
    categories: [],
    page: {
      currentPage: 1,
    },
  });
  const { run: runGetList, loading: loadingList } = useRequest(() =>
    getListFair(filterParams),
  );
  useUpdateEffect(runGetList, [filterParams]);
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
          <p className="mb-4 text-base font-bold dark:text-white">
            Timeline
          </p>
          <Timeline
            mode="left"
            items={[
              {
                label: "2015-09-01",
                children: "Create Application",
              },
              {
                label: "2015-09-01 09:12:11",
                children: "Solve initial network problems",
              },
              {
                children: "Technical testing",
              },
              {
                label: "2015-09-01 09:12:11",
                children: "Network problems being solved",
              },
            ]}
          />
          {true && (
            <>
              <p className="mb-4 mt-10 text-base font-bold dark:text-white">
                Entrance QR Code
              </p>
              {/* fill qr code text here */}
              <QRCode value={"-"} />
            </>
          )}
          {true && (
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
              {[1, 2, 3, 4].map((card) => (
                <Card
                  onClick={showModal}
                  className="w-full	 hover:cursor-pointer lg:w-1/4"
                  title="Farmer market"
                  extra={<Tag color="blue">PENDING</Tag>}
                >
                  <p>Your application is being processed by the organizer</p>
                </Card>
              ))}
            </div>
          </section>
        )}

        <section className="w-full">
          <p className="mb-4 mt-10 text-3xl font-bold dark:text-white">
            Upcoming events
          </p>
          <div>
            <Form
              className=" mt-5 flex flex-wrap gap-x-5"
              validateMessages={validateMessages}
              form={form}
              layout="vertical"
              // onFinish={onFinish}
            >
              <Form.Item
                label="Categories"
                name="categories"
                className="w-[40%] lg:w-60"
              >
                <Select
                  mode="multiple"
                  placeholder="Food"
                  className="dark:text-white"
                />
              </Form.Item>
              <Form.Item
                label="Country"
                name="country"
                className="w-[40%] lg:w-60"
              >
                <Select
                  placeholder="Finland"
                  className="dark:text-white"
                ></Select>
              </Form.Item>
              <Form.Item label="City" name="city" className="w-[40%] lg:w-60">
                <Select
                  placeholder="Helsinki"
                  className="dark:text-white"
                  onChange={(location) =>
                    setFilterParams({ ...filterParams, location })
                  }
                />
              </Form.Item>
            </Form>
          </div>
          <div className="my-10 flex flex-row flex-wrap justify-center gap-5">
            <>
              {FAIR_LIST?.map(
                ({ title, description, picture, tags, location }) => (
                  <FairCard
                    color="black"
                    title={title}
                    description={description}
                    pictureUrl={picture}
                    tags={tags}
                    location={location}
                  />
                ),
              )}
            </>
          </div>
        </section>
        <div className="flex justify-center">
          <Pagination
          // onChange={(value) => {
          //   setFilterParams({
          //     ...filterParams,
          //     page: {
          //       currentPage: value,
          //     },
          //   });
          // }}
          // total={undefined}
          // pageSize={undefined}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
