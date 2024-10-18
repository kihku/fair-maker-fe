import { citiesOfCountries, registerUser, userMetaData } from "@/apis";
import { validateMessages } from "@/widgets/utils";
import { useRequest, useSessionStorageState, useLocalStorageState } from "ahooks";
import { Button, DatePicker, Form, Input, Select, Typography } from "antd";
import React, { useState } from "react";

const { Title } = Typography;

export function RegisterForm() {
  const [userData, setUserData] = useSessionStorageState("userData");
  const [userToken, setUserToken] = useSessionStorageState("googleToken");
  const [cities, setCities] = useState([]);
  const [authToken, setAuthToken] = useLocalStorageState("token");
  
  const [form] = Form.useForm();

  const onFinish = (values) => {
    runRegisterUser({...values, google_token: userToken, age: 25});
  };

  const { run: runRegisterUser } = useRequest(registerUser, {
    manual: true,
    onSuccess: (result, params) => {
      setUserData(result.data);
      setUserToken("");
      setAuthToken(result.token);
      window.open("/profile", "_self");
    },
  });

  const {run: runFetchCities} = useRequest(citiesOfCountries, {
    manual: true,
    onSuccess: (result, params) => {
      setCities(result.cities);
    }
  })

  const {data: formMetaData} = useRequest(userMetaData);

  if (userData){
    window.open("/profile", "_self");
  } else if (!userToken){
    window.open("/sign-in", "_self");
  }

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
              Welcome to Bazaar Hub!
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
                label="Email"
                rules={[
                  {
                    required: true,
                    message: "Please input your Email!",
                  },
                ]}
                name="email"
              >
                <Input type="email" placeholder="name@mail.com" />
              </Form.Item>
              <div>
                <div className="flex items-center gap-4">
                  <Form.Item
                    className="w-full"
                    label="First Name"
                    required
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                    name="first_name"
                  >
                    <Input placeholder="Andy" />
                  </Form.Item>
                  <Form.Item
                    className="w-full"
                    label="Last Name"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                    required
                    name="last_name"
                  >
                    <Input placeholder="Williams" />
                  </Form.Item>
                </div>
                <Form.Item
                  label="Gender"
                  required
                  name="gender"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select
                    allowClear
                    placeholder="Please select"
                    options={formMetaData?.gender}
                  ></Select>
                </Form.Item>
                <Form.Item
                  label="Date of birth"
                  required
                  name="birth_date"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <DatePicker className="w-full" format={"DD/MM/YYYY"} />
                </Form.Item>
              </div>
              <div className="flex w-full items-center gap-4">
                <Form.Item
                  label="Country"
                  required
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  name="country"
                  className="w-full"
                >
                  <Select
                    placeholder="Finland"
                    onSelect={(value) => {runFetchCities(value)}}
                    options={formMetaData?.countries}
                  />
                </Form.Item>
                <Form.Item
                  className="w-full"
                  label="City"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  required
                  name="city"
                >
                  <Select
                    placeholder="Liepāja"
                    options={cities}
                  />
                </Form.Item>
              </div>
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
        <div className="hidden h-full w-2/5 lg:block">
          <img
            src="/img/pattern.jpg"
            className="h-[500px] w-full rounded-3xl object-cover"
          />
        </div>
      </section>
    </>
  );
}
