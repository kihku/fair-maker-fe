import { Button, Form, Typography } from "antd";
import React, { useState } from "react";
import { getUserOrg } from "@/apis";
import { VendorConfig } from "./vendor-config";

export function VendorInfo({ orgData, cities, runFetchCities, orgMetadata }) {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    // runCreateOrg(values, authToken);
  };
  return (
    <>
      {!orgData ? (
        <div className="flex flex-col items-center justify-center text-center">
          <Typography.Title>You have no vendor exist</Typography.Title>
          <Button
            type="primary"
            size="large"
            onClick={() => window.open("/vendor-create")}
          >
            Create Vendor
          </Button>
          <img
            className="lg:h-96 lg:w-fit"
            src="/img/no-vendor.gif"
            alt="no vendor"
          />
        </div>
      ) : (
        <div>
          <VendorConfig
            onFinish={onFinish}
            runFetchCities={runFetchCities}
            orgMetadata={orgMetadata}
            form={form}
            cities={cities}
            action="UPDATE"
          />
        </div>
      )}
    </>
  );
}
