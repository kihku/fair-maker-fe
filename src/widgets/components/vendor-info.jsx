import { Button, Typography } from "antd";
import React, { useState } from "react";

export function VendorInfo() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
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
  );
}
