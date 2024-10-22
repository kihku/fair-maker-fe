import { myOrgEvent } from "@/apis";
import { Footer } from "@/widgets/layout";
import { EditOutlined, EllipsisOutlined } from "@ant-design/icons";
import { useLocalStorageState, useRequest } from "ahooks";
import { Button, Card, Form, Modal, Select, Space, Table, Tag } from "antd";
import Meta from "antd/es/card/Meta";
import Column from "antd/es/table/Column";
import React, { useState } from "react";

export function FairManagement() {

  const [upcomingEvent, setUpcomingEvent] = useState();
  const [authToken, _] = useLocalStorageState("token");

  useRequest(myOrgEvent, {
    onSuccess: (result, params) => {
      console.log(result);
      setUpcomingEvent(result);
    },
    defaultParams: [authToken]
  });

  const [modalOpen, setModalOpen] = useState(false);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      render: () => (
        <Space
          size="middle"
          onClick={() => {
            setModalOpen(true);
          }}
        >
          <a>View</a>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];
  return (
    <div className="bg-white dark:bg-stone-900">
      <Modal
        width={900}
        centered
        title="Create Fair"
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
      >
        {/* <FairManagementModal /> */}
      </Modal>
      <div className="h-24 bg-black"></div>
      <div className="p-10 lg:px-52">
        <section>
          <p className="mb-4 mt-10 text-3xl font-bold dark:text-white">
            Your upcoming events
          </p>
          <Button className="mb-4" onClick={() => window.open("/fair-create")}>
            Create Event
          </Button>
          <Card
            style={{ width: 300 }}
            cover={
              <img
                alt="example"
                src={upcomingEvent?.pictures.banner[0].url}
              />
            }
            actions={[
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              title={upcomingEvent?.event_name}
              description={upcomingEvent?.description}
            />
          </Card>
        </section>
        <section>
          <p className="mb-4 mt-10 text-3xl font-bold dark:text-white">
            Pending Application
          </p>
          <div className="mb-5">
            <Form>
              <Form.Item label="Product categories">
                <Select
                  defaultValue="lucy"
                  style={{
                    width: 200,
                  }}
                  allowClear
                  options={[
                    {
                      value: "lucy",
                      label: "Lucy",
                    },
                  ]}
                  placeholder="select it"
                />
              </Form.Item>
            </Form>
          </div>
          <Table columns={columns} dataSource={data}>
            <Column
              title="Action"
              key="action"
              render={(_, record) => (
                <Space size="middle">
                  <a>Invite {record.lastName}</a>
                  <a>Delete</a>
                </Space>
              )}
            />
          </Table>
        </section>
      </div>
      <Footer />
    </div>
  );
}
