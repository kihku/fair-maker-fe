import {
  Button,
  Checkbox,
  Divider,
  Form,
  Input,
  Select,
  Slider,
  Space,
  Upload,
} from "antd";
import { getBase64, validateMessages } from "../utils";
import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";

export function FairApplication({
  onFinish,
  metadata,
  authToken,
  fairDetail,
  utilityOptions,
}) {
  const serverUrl = import.meta.env.VITE_SERVER_URL;

  const [checkedList, setCheckedList] = useState([]);
  const onChange = (list) => {
    setCheckedList(list);
  };
  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? utilityOptions : []);
  };

  const checkAll = utilityOptions.length === checkedList.length;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < utilityOptions.length;

  return (
    <div>
      <Form
        layout="vertical"
        validateMessages={validateMessages}
        onFinish={onFinish}
      >
        <p className="mb-4 mt-10 text-3xl font-bold dark:text-white">
          Product Information
        </p>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          label="Product description"
          name="product_description"
        >
          <Input.TextArea placeholder="Brief description about your product" />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          label="Product price range (€)"
          name="price_range"
          initialValue={[30, 50]}
        >
          <Slider
            range
            marks={{
              100: { label: <strong className="w-24">100+</strong> },
              0: { label: <strong>0</strong> },
            }}
          />
        </Form.Item>
        <Form.Item
          label="Special features of your product"
          name="product_features"
        >
          <Input.TextArea placeholder="Highlights of your product (Organic, Local, Artisan, ...)" />
        </Form.Item>
        <p className="mb-4 mt-10 text-3xl font-bold dark:text-white">
          Booth Preferences
        </p>
        <Form.Item
          label="Booth Zone"
          name="booth_zone"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="Booth zone"
            showSearch
            optionFilterProp="label"
            options={fairDetail?.details.config.booth_types.map(
              ({ zone, price }) => ({
                label: `Zone ${zone} - ${price} €/m2`,
                value: zone,
              }),
            )}
          ></Select>
        </Form.Item>
        <p className="mb-4 mt-10 text-2xl font-bold dark:text-white">
          Required utilities
        </p>
        <Checkbox
          indeterminate={indeterminate}
          onChange={onCheckAllChange}
          checked={checkAll}
        >
          Check all
        </Checkbox>
        <hr className="my-2 w-[300px]" />
        <Checkbox.Group
          options={utilityOptions}
          value={checkedList}
          onChange={onChange}
        />

        <p className="mb-4 mt-10 text-3xl font-bold dark:text-white">
          Documents
        </p>

        <Form.List name="documents">
          {(fields) => (
            <>
              {fairDetail?.details.config.document_config.map(
                ({ name, isRequired, desciption }) => (
                  <Space
                    key={name}
                    style={{
                      display: "flex",
                      marginBottom: 6,
                    }}
                    align="baseline"
                  >
                    <Form.Item
                      label={name}
                      name={[name, "next-entry"]}
                      rules={[
                        {
                          required: { isRequired },
                          message: "File is required",
                        },
                      ]}
                    >
                      <Upload
                        action={`${serverUrl}/upload`}
                        headers={{ Authorization: `Bearer ${authToken}` }}
                        maxCount={1}
                      >
                        <Button icon={<UploadOutlined />}>
                          Click to Upload
                        </Button>
                      </Upload>
                    </Form.Item>
                  </Space>
                ),
              )}
            </>
          )}
        </Form.List>

        <p className="mb-4 mt-10 text-3xl font-bold dark:text-white">
          More information
        </p>
        <Form.Item label="Additional Information" name="additional_information">
          <Input.TextArea placeholder="Tell us more about your business. You can write anything here to make yourself standout" />
        </Form.Item>

        <Form.Item>
          <Button className="w-full" type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
