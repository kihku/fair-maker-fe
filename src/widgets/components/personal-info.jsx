import { Button, DatePicker, Form, Input, Select } from "antd";
import React from "react";
import { validateMessages } from "../utils";
import { useSessionStorageState } from "ahooks";
import dayjs from 'dayjs';

export function PersonalInfo() {
  const [form] = Form.useForm();
  const [userData, _] = useSessionStorageState("userData");



  return (
    <Form
      className="dark:bg-stone-900"
      validateMessages={validateMessages}
      form={form}
      layout="vertical"
      name="basic"
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        rules={[
          {
            required: true,
            message: "Please input your Email!",
          },
        ]}
        name="email"
      >
        <Input
          type="email"
          placeholder="name@mail.com"
          defaultValue={userData?.email}
        />
      </Form.Item>
      <div>
        <div className="flex items-center gap-4">
          <Form.Item
            className="w-full"
            label="First Name"
            rules={[
              {
                required: true,
              },
            ]}
            name="firstName"
          >
            <Input placeholder="Andy" defaultValue={userData?.first_name}/>
          </Form.Item>
          <Form.Item
            className="w-full"
            label="Last Name"
            rules={[
              {
                required: true,
              },
            ]}
            name="lastName"
          >
            <Input placeholder="Williams" defaultValue={userData?.last_name}/>
          </Form.Item>
        </div>
        <Form.Item
          label="Gender"
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
            options={[
              {
                value: "MALE",
                label: "Male",
              },
              {
                value: "FEMALE",
                label: "Female",
              },
            ]}
            defaultValue={userData?.gender}
          ></Select>
        </Form.Item>
        <Form.Item
          label="Date of birth"
          name="dob"
          rules={[
            {
              required: true,
            },
          ]}
          initialValue={dayjs(userData?.birth_date)}
        >
          <DatePicker className="w-full" format={"DD/MM/YYYY"} />
        </Form.Item>
      </div>
      <div className="flex w-full items-center gap-4">
        <Form.Item
          label="Country"
          rules={[
            {
              required: true,
            },
          ]}
          name="country"
          className="w-full"
        >
          <Select
            placeholder="Latvia"
            options={[{ value: "FIN", label: "Finland" }]}
            defaultValue={userData?.country}
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
          name="city"
        >
          <Select
            placeholder="Liepāja"
            options={[{ value: "LAH", label: "Lahti" }]}
            defaultValue={userData?.city}
          />
        </Form.Item>
      </div>
      <div className="flex">
        <Button>Save</Button>
      </div>
    </Form>
  );
}
