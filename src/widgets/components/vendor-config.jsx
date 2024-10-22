import { Button, Checkbox, Form, Input, InputNumber, Select } from "antd";
import React from "react";
import { validateMessages } from "../utils";
import PropTypes from "prop-types";
export function VendorConfig({
  onFinish,
  runFetchCities,
  orgMetadata,
  form,
  cities,
  action,
  orgData
}) {
  return (
    <div>
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
          <Input placeholder="Johnny Computer" defaultValue={orgData?.organization_name}/>
        </Form.Item>
        <div className="flex flex-wrap gap-x-5 align-bottom">
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
              defaultValue={orgData?.country}
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
              defaultValue={orgData?.city}
            />
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
            <Input placeholder="Street address" defaultValue={orgData?.contact_address}/>
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
          <Input placeholder="(+38) 000000000 " defaultValue={orgData?.contact_phone}/>
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
          <Input type="email" placeholder="email@gmail.com " defaultValue={orgData?.email}/>
        </Form.Item>
        <Form.Item label="Type of Business" name="tags">
          <Select
            showSearch
            optionFilterProp="label"
            mode="multiple"
            placeholder="Please choose your product categories"
            options={orgMetadata?.tags}
            defaultValue={orgData?.tags.map( ({value, label})=>value )}
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
            <Select placeholder="Medium" options={orgMetadata?.company_size} defaultValue={orgData?.size}/>
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
              defaultValue={orgData?.years_of_operation}
            />
          </Form.Item>
        </div>
        {action === "CREATE" && (
          <Form.Item name="agreeCondition" valuePropName="checked">
            <Checkbox>
              I agree with the
              <span>
                <a onClick={() => {}}>Terms and Conditions </a>
              </span>
              of Privacy Policy
            </Checkbox>
          </Form.Item>
        )}
        {action === "CREATE" && (
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
        )}
      </Form>
    </div>
  );
}
VendorConfig.propTypes = {
  action: PropTypes.oneOf(["UPDATE", "CREATE"]),
  orgData: PropTypes.object
};
