import React, { useState } from "react";
import { getBase64, validateMessages } from "../utils";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Select,
  Space,
  TimePicker,
  Upload,
} from "antd";
const { RangePicker } = DatePicker;

export function FairConfig({ onFinish }) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const [mapFile, setMapFile] = useState([]);
  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-2",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-3",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-4",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <button className="border-0 bg-none" type="button">
      <PlusOutlined />
      <div className="mt-[8px]">Upload</div>
    </button>
  );
  return (
    <div>
      <Form
        layout="vertical"
        validateMessages={validateMessages}
        onFinish={onFinish}
      >
        <p className="mb-4 mt-10 text-3xl font-bold dark:text-white">
          General Information
        </p>
        <p className="mb-4 text-base dark:text-stone-300">
          Overview information for market fair
        </p>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          label="Name"
          name="name"
        >
          <Input />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          label="Description"
          name="description"
        >
          <Input.TextArea />
        </Form.Item>
        <div className="flex gap-5 align-bottom">
          <Form.Item
            rules={[
              {
                required: true,
              },
            ]}
            label="Location"
            name="city"
            className="w-44"
          >
            <Select placeholder="City"></Select>
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
              },
            ]}
            name="address"
            className="w-72 self-end"
          >
            <Input placeholder="Address Detail" />
          </Form.Item>
        </div>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          label="Dates"
          name="dates"
        >
          <RangePicker />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          label="Operation Hours"
          name="operationHours"
        >
          <TimePicker.RangePicker />
        </Form.Item>
        <Form.Item name="tags" label="Event Categories">
          <Select />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          label="Event Map"
          name="eventMap"
        >
          <Upload
            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
            listType="picture-card"
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {mapFile.length >= 1 ? null : uploadButton}
          </Upload>
        </Form.Item>
        <Form.Item label="Other resources" name="otherResouces">
          <Upload
            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>
        </Form.Item>
        <p className="mb-4 mt-10 text-3xl font-bold dark:text-white">
          Vendor Zone Information
        </p>
        <Form.List name="vendorTypes">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} align="center" className="mb-3 flex flex-wrap">
                  <Form.Item
                    label="Zone"
                    {...restField}
                    name={[name, "zone"]}
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input placeholder="Riverside vendor" />
                  </Form.Item>
                  <Form.Item
                    label="Price"
                    {...restField}
                    name={[name, "price"]}
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input placeholder="500 Euros" />
                  </Form.Item>
                  <Form.Item
                    label="Description"
                    {...restField}
                    name={[name, "description"]}
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input.TextArea placeholder="Enter vendor zone description" />
                  </Form.Item>
                  <Form.Item
                    label="Booth Code"
                    {...restField}
                    name={[name, "booth"]}
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                    className="w-72"
                  >
                    <Select
                      placeholder="Enter your Booth Code"
                      mode="tags"
                    //   tokenSeparators={[","]}
                    />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add vendor
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <p className="mb-4 mt-10 text-3xl font-bold dark:text-white">
          Vendor Document Configuration
        </p>
        <p className="mb-4 text-base dark:text-stone-300">
          Configurate all necessary documents for vendor applications, ensuring
          compliance with the market fair's requirements.
        </p>
        <Form.List name="documentConfigs">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} align="center" className="mb-3 flex flex-wrap">
                  <Form.Item
                    label="Name"
                    {...restField}
                    name={[name, "name"]}
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input placeholder="Riverside vendor" />
                  </Form.Item>
                  <Form.Item
                    label="Description"
                    {...restField}
                    name={[name, "description"]}
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input.TextArea placeholder="Enter vendor zone description" />
                  </Form.Item>
                  <Form.Item
                    label="Require document"
                    name={[name, "isRequired"]}
                    initialValue={false}
                  >
                    <Checkbox>Require</Checkbox>
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add Document
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
