import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Upload } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { getBase64 } from "../utils";

export function FairManagementModal() {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
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
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );
  return (
    <Form layout="vertical">
      <p className="mb-4 mt-10 text-3xl font-bold dark:text-white">
        General Information
      </p>
      <Form.Item label="Description" name="description">
        <Input.TextArea />
      </Form.Item>
      <Form.Item label="Hours" name="hours">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name="tags" label="Event Categories">
        <Select />
      </Form.Item>
      <Form.Item label="Event Map">
        <Upload
          action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
          listType="picture-card"
          onPreview={handlePreview}
          onChange={handleChange}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
      </Form.Item>
      <Form.Item label="Other resources">
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
      {/* <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item> */}
    </Form>
  );
}
