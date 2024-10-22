import { citiesOfCountries, createOrg, getOrgMetadata } from "@/apis";
import { VendorConfig } from "@/widgets/components";
import {
  useRequest,
  useSessionStorageState,
  useLocalStorageState,
} from "ahooks";
import { Form, Typography } from "antd";
import React, { useState } from "react";
const { Title } = Typography;

export function VendorCreate() {
  const [form] = Form.useForm();
  const [orgData, setOrgData] = useSessionStorageState("orgData");
  const [authToken, _] = useLocalStorageState("token");
  const [orgMetadata, setOrgMetadata] = useState({
    company_size: [],
    tags: [],
    countries: [],
  });
  const [cities, setCities] = useState([]);

  const onFinish = (values) => {
    runCreateOrg(values, authToken);
  };

  const { run: runCreateOrg } = useRequest(createOrg, {
    manual: true,
    onSuccess: (result, params) => {
      setOrgData(result);
      window.open("/profile", "_self");
    },
  });

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

  return (
    <>
      <div className="h-24 bg-black"></div>
      <section className="relative flex w-full flex-col justify-center px-5 pb-32 pt-16 dark:bg-stone-900 md:px-5 lg:w-[80%] lg:px-44">
        <Title
          style={{
            margin: 0,
            marginBottom: 5,
          }}
        >
          Vendor information
        </Title>
        <Title
          level={3}
          color="amber"
          className="font-medium"
          style={{
            margin: 0,
            marginBottom: 20,
          }}
        >
          Ready to get started?
        </Title>
        <VendorConfig
          cities={cities}
          form={form}
          onFinish={onFinish}
          runFetchCities={runFetchCities}
          orgMetadata={orgMetadata}
          action="CREATE"
        />
      </section>
    </>
  );
}
