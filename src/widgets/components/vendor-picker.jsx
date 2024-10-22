import { Popover } from "antd";
import React from "react";

export function VendorPicker() {
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
      { label: "2B", status: "RESERVED" },
      { label: "2C", status: "VACANT" },
      { label: "2D", status: "RESERVED" },
      { label: "2A", status: "VACANT" },
    ],
  ];
  function content({ status }) {
    return status;
  }
  return (
    <>
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
