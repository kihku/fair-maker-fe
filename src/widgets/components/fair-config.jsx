import React, { useState } from "react";
import { getBase64, validateMessages } from "../utils";
import {
  LoadingOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
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
  Image,
} from "antd";
import { useRequest } from "ahooks";
import { citiesOfCountries } from "@/apis";
const { RangePicker } = DatePicker;

export function FairConfig({ onFinish, metadata, authToken }) {
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [cities, setCities] = useState([]);

  const [mapLoading, setMapLoading] = useState(false);
  const [bannerLoading, setBannerLoading] = useState(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const [mapImg, setMapImg] = useState([]);
  const [fileList, setFileList] = useState([]);
  const handleMapChange = (info) => {
    setMapImg(info.fileList);
    if (info.fileList[0].status === "uploading") {
      setMapLoading(true);
      return;
    }
    if (info.fileList[0].status === "done") {
      // Get this url from response in real world.
      console.log(info.fileList[0]);
      setMapLoading(false);
      setMapImg([
        {
          uid: info.fileList[0].uid,
          status: "done",
          url: info.fileList[0].response.data.imgUrl,
          name: info.fileList[0].name,
        },
      ]);
    }
  };

  const handleMapPreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const mapUploadButton = (
    <button className="border-0 bg-none" type="button">
      {mapLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="mt-[8px]">Upload</div>
    </button>
  );

  const bannerUploadButton = (
    <button className="border-0 bg-none" type="button">
      {bannerLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="mt-[8px]">Upload</div>
    </button>
  );

  const { run: runFetchCities } = useRequest(citiesOfCountries, {
    manual: true,
    onSuccess: (result, params) => {
      setCities(result.cities);
    },
  });

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
          name="event_name"
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
              options={metadata?.countries}
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
            name="street_addr"
            className="w-72 self-end"
          >
            <Input placeholder="Address Detail" />
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
          name="phone_contact"
        >
          <Input placeholder="(+38) 000000000 " />
        </Form.Item>
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
          <Select
            showSearch
            optionFilterProp="label"
            mode="multiple"
            placeholder="Please choose your product categories"
            options={metadata?.tags}
          />
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
            action={`${serverUrl}/upload`}
            headers={{ Authorization: `Bearer ${authToken}` }}
            listType="picture-card"
            fileList={mapImg}
            onChange={handleMapChange}
            onPreview={handleMapPreview}
          >
            {mapImg.length >= 1 ? null : mapUploadButton}
          </Upload>
        </Form.Item>
        <Form.Item label="Promotion pictures" name="banner">
          <Upload
            action={`${serverUrl}/upload`}
            headers={{ Authorization: `Bearer ${authToken}` }}
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={({ fileList }) => setFileList(fileList)}
          >
            {fileList.length >= 8 ? null : mapUploadButton}
          </Upload>
        </Form.Item>
        <p className="mb-4 mt-10 text-3xl font-bold dark:text-white">
          Booth Zone Information
        </p>
        <Form.List name="boothTypes">
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
