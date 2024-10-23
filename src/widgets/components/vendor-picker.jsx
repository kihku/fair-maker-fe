import { Button, Modal, Popover } from "antd";
import React, { useState } from "react";

export function VendorPicker() {
  const [open, setOpen] = useState(false);
  const PLAN = [
    [
      { label: "1A", status: "RESERVED" },
      { label: "1B", status: "RESERVED" },
      { label: "1C", status: "VACANT" },
      { label: "1A", status: "RESERVED" },
      { label: "1B", status: "RESERVED" },
      { label: "1C", status: "VACANT" },
    ],
    [
      { label: "2A", status: "VACANT" },
      { label: "2B", status: "RESERVED", owner: "Hochwald" },
      { label: "2C", status: "VACANT" },
      { label: "2D", status: "RESERVED" },
      { label: "2A", status: "VACANT" },
    ],
  ];
  function content({ status, owner }) {
    if (owner) {
      return `${status} by ${owner}`;
    }
    return status;
  }
  return (
    <>
      <Modal
        centered
        open={open}
        title="Vendor Information"
        onCancel={() => setOpen(false)}
        footer={[
          <Button key="back" onClick={() => setOpen(false)}>
            Back
          </Button>,
        ]}
      >
        <p className="mb-5 text-xl font-bold">General Information</p>
        <div className="flex gap-5">
          <div className="h-28 w-28 overflow-hidden rounded-lg bg-blue-gray-200">
            <img
              className="h-28 w-full"
              src="/img/products/mock-logo.jpeg"
            ></img>
          </div>
          <div className="w-2/3">
            <p>
              <span className="font-bold">Vendor Name:</span> Hochwald
            </p>
            <p>
              <span className="font-bold">Year of operation:</span> 8
            </p>
            <p>
              <span className="font-bold">Description:</span> a trusted brand
              that offers a variety of high-quality dairy products like milk,
              cream, butter, and yogurt. Known for using fresh ingredients and
              sustainable practices, Hochwald combines traditional farming with
              modern techniques to deliver great taste and quality. Their
              products are a favorite in many homes and businesses worldwide.
            </p>
          </div>
        </div>
        <p className="text-xl font-bold">Products</p>
        <div className="flex flex-wrap gap-5">
          {[
            {
              imageUrl: "/img/products/product-1.png",
              productName: "Chocolate Shake",
            },
            {
              imageUrl: "/img/products/product-2.jpeg",
              productName: "Milk Shake",
            },
            {
              imageUrl: "/img/products/product-3.jpg",
              productName: "Candy",
            },
          ].map(({ imageUrl, productName }) => (
            <div className="flex flex-col items-center">
              <div className="mt-5 h-28 w-28 overflow-hidden rounded-lg bg-blue-gray-200">
                <img src={imageUrl} />
              </div>
              <p className="font-semibold">{productName}</p>
            </div>
          ))}
        </div>
      </Modal>
      <div className="flex flex-wrap gap-20">
        <div className="flex flex-col gap-20">
          <div className={`flex flex-col gap-2`}>
            {PLAN?.map((row) => (
              <div className="flex gap-2">
                {row.map((booth) => (
                  <Popover
                    placement="top"
                    title="Booth Info"
                    content={() => content(booth)}
                  >
                    <div
                      className={` h-14 w-14 cursor-pointer content-center rounded-lg active:bg-blue-500 ${
                        booth.status === "RESERVED"
                          ? "bg-blue-gray-100"
                          : "bg-lime-300"
                      } text-center`}
                      onClick={() => setOpen(true)}
                    >
                      <p className="font-bold"> {booth.label}</p>
                    </div>
                  </Popover>
                ))}
              </div>
            ))}
          </div>
          <div className={`flex flex-col-reverse gap-2`}>
            {PLAN?.map((row) => (
              <div className="flex gap-2">
                {row.map((booth) => (
                  <Popover
                    placement="top"
                    title="Booth Info"
                    content={() => content(booth)}
                  >
                    <div
                      className={` h-14 w-14 cursor-pointer content-center rounded-lg active:bg-blue-500 ${
                        booth.status === "RESERVED"
                          ? "bg-blue-gray-100"
                          : "bg-lime-300"
                      } text-center`}
                    >
                      <p className="font-bold"> {booth.label}</p>
                    </div>
                  </Popover>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className={`flex flex-row gap-2`}>
          {PLAN?.map((row) => (
            <div className="flex flex-col gap-2">
              {row.map((booth) => (
                <Popover
                  placement="top"
                  title="Booth Info"
                  content={() => content(booth)}
                >
                  <div
                    className={`h-14 w-14 cursor-pointer content-center rounded-lg active:bg-blue-500 ${
                      booth.status === "RESERVED"
                        ? "bg-blue-gray-100"
                        : "bg-lime-300"
                    } text-center`}
                    onClick={() => setOpen(true)}
                  >
                    <p className="font-bold"> {booth.label}</p>
                  </div>
                </Popover>
              ))}
            </div>
          ))}
        </div>
        <div className={`flex flex-row-reverse gap-2`}>
          {PLAN?.map((row) => (
            <div className="flex flex-col gap-2">
              {row.splice(1).map((booth) => (
                <Popover
                  placement="top"
                  title="Booth Info"
                  content={() => content(booth)}
                >
                  <div
                    className={`h-14 w-14 cursor-pointer content-center rounded-lg active:bg-blue-500 ${
                      booth.status === "RESERVED"
                        ? "bg-blue-gray-100"
                        : "bg-lime-300"
                    } text-center`}
                    onClick={() => setOpen(true)}
                  >
                    <p className="font-bold"> {booth.label}</p>
                  </div>
                </Popover>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
