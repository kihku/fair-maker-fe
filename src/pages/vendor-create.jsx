import { registerUser } from "@/apis";
import { validateMessages } from "@/widgets/utils";
import { useRequest } from "ahooks";
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
import React from "react";
import { Footer } from "react-day-picker";

const { Title } = Typography;

export function VendorCreate() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    runRegisterUser(values);
  };

  const { run: runRegisterUser } = useRequest(registerUser, {
    manual: true,
    onSuccess: () => {},
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
                name="organizationName"
              >
                <Input placeholder="Johnny Computer" />
              </Form.Item>
              <Form.Item
                required
                label="Contact Address"
                rules={[
                  {
                    required: true,
                  },
                ]}
                name="contactAddress"
              >
                <Input placeholder="Aleksander 1B23 " />
              </Form.Item>
              <Form.Item
                required
                label="Phone number"
                rules={[
                  {
                    required: true,
                  },
                ]}
                name="contactPhone"
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
                  mode="multiple"
                  placeholder="Please choose your product categories"
                  options={[{ label: "apple", value: "apple" }]}
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
                    options={[
                      { value: "Large", label: "Large" },
                      { value: "Medium", label: "Medium" },
                    ]}
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
                  name="operationYear"
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
