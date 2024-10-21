import { Button, Typography } from "antd";
import React, { useState } from "react";
import { useSessionStorageState, useRequest, useLocalStorageState } from "ahooks";
import { getUserOrg } from "@/apis";

export function VendorInfo({orgData}) {
  const [modalOpen, setModalOpen] = useState(false);

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
        <Typography.Title>
          Company name: {orgData?.organization_name}
        </Typography.Title>
      )}
    </>
  );
}
