import { citiesOfCountries, createOrg, getOrgMetadata } from "@/apis";
import { validateMessages } from "@/widgets/utils";
import {
  useRequest,
  useSessionStorageState,
  useLocalStorageState,
} from "ahooks";
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Typography,
} from "antd";
import React, { useState } from "react";
import { Footer } from "react-day-picker";

const { Title } = Typography;

export function VendorCreate() {
  const [form] = Form.useForm();
  const [orgData, setOrgData] = useSessionStorageState("orgData");
  const [authToken, _] = useLocalStorageState("token");
  const [orgMetadata, setOrgMetadata] = useState({
    company_size: [],
    tags: [],
    countries: []
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
      <section className="relative flex justify-center gap-40 px-5 pb-32 pt-16 dark:bg-stone-900 md:px-36 lg:px-60">
        {
          <div>
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
            <Form
              validateMessages={validateMessages}
              form={form}
              layout="vertical"
              name="basic"
              onFinish={onFinish}
            >
              <Form.Item
                required
                label="Business Name"
                rules={[
                  {
                    required: true,
                  },
                ]}
                name="organization_name"
              >
                <Input placeholder="Johnny Computer" />
              </Form.Item>
              <div className="flex gap-5 align-bottom">
                <Form.Item
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  label="Contact address"
                  name="country"
                  className="w-44"
                >
                  <Select
                    showSearch
                    optionFilterProp="label"
                    placeholder="Country"
                    onSelect={(value) => {
                      runFetchCities(value);
                    }}
                    options={orgMetadata?.countries}
                  ></Select>
                </Form.Item>
                <Form.Item
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  name="city"
                  className="w-44 self-end"
                >
                  <Select
                    placeholder="City"
                    showSearch
                    optionFilterProp="label"
                    options={cities}
                  ></Select>
                </Form.Item>
                <Form.Item
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  name="contact_address"
                  className="w-72 self-end"
                >
                  <Input placeholder="Street address" />
                </Form.Item>
              </div>
              <Form.Item
                required
                label="Phone number"
                rules={[
                  {
                    required: true,
                  },
                ]}
                name="contact_phone"
              >
                <Input placeholder="(+38) 000000000 " />
              </Form.Item>
              <Form.Item
                required
                label="Email"
                rules={[
                  {
                    required: true,
                  },
                ]}
                name="email"
              >
                <Input type="email" placeholder="email@gmail.com " />
              </Form.Item>
              <Form.Item label="Type of Business" name="tags">
                <Select
                  showSearch
                  optionFilterProp="label"
                  mode="multiple"
                  placeholder="Please choose your product categories"
                  options={orgMetadata?.tags}
                />
              </Form.Item>
              <div className="flex w-full items-center gap-4">
                <Form.Item
                  label="Size"
                  required
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  name="size"
                  className="w-full"
                >
                  <Select
                    placeholder="Medium"
                    options={orgMetadata?.company_size}
                  />
                </Form.Item>
                <Form.Item
                  className="w-full"
                  label="Year of operation"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  required
                  name="years_of_operation"
                >
                  <InputNumber
                    className="w-full"
                    min={0}
                    max={10}
                    placeholder="9"
                    changeOnWheel
                  />
                </Form.Item>
              </div>
              <Form.Item name="agreeCondition" valuePropName="checked">
                <Checkbox>
                  I agree with the{" "}
                  <span>
                    <a onClick={() => {}}>Terms and Conditions </a>
                  </span>
                  of Privacy Policy
                </Checkbox>
              </Form.Item>
              <Form.Item>
                <Button
                  color="default"
                  variant="solid"
                  className="mt-5 w-full dark:hover:text-black"
                  type="primary"
                  htmlType="submit"
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        }
      </section>
    </>
  );
}
