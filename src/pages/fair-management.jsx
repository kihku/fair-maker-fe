import { fairApplications, myOrgEvent, updateApplicationStatus } from "@/apis";
import { showNotice } from "@/widgets/components";
import { Footer } from "@/widgets/layout";
import { STATUS_TO_TEXT } from "@/widgets/utils";
import { EditOutlined, EllipsisOutlined } from "@ant-design/icons";
import { useLocalStorageState, useRequest } from "ahooks";
import { Button, Card, Form, Modal, Select, Space, Table, Tag, Typography } from "antd";
import Meta from "antd/es/card/Meta";
import Column from "antd/es/table/Column";
import React, { useState } from "react";

export function FairManagement() {
  const [authToken, _] = useLocalStorageState("token");
  const [selectedApplication, setSelectedApplication] = useState({});

  const { data: upcomingEvent } = useRequest(myOrgEvent, {
    ready: authToken,
    defaultParams: [authToken]
  })

  const { data: applications } = useRequest(fairApplications, {
    ready: upcomingEvent,
    defaultParams: [upcomingEvent?.id, authToken]
  })

  const {run: runUpdateApplicationStatus} = useRequest(updateApplicationStatus, {
    manual: true,
    onSuccess: (result, params) => {
      showNotice("success");
      console.log(result);
    }
  })

  const [modalOpen, setModalOpen] = useState(false);
  const columns = [
    {
      title: "Vendor Name",
      dataIndex: "applicant_name",
      key: "vendor_name",
    },
    {
      title: "Product",
      dataIndex: ["application_data","product_description"],
      key: "product",
    },
    {
      title: "Address",
      key: "address",
      render: (_, record) => (
        `${record.applicant_address}, ${record.applicant_city_label}, ${record.applicant_country_label}`
      )
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (_, {status}) => (
        <Tag color={STATUS_TO_TEXT[status][0]}>{STATUS_TO_TEXT[status][1]}</Tag>
      )
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space
          size="middle"
          onClick={() => {
            setModalOpen(true);
            setSelectedApplication(record);
            console.log(selectedApplication);;
          }}
        >
          <a>View</a>
        </Space>
      ),
    },
  ];
  return (
    <div className="bg-white dark:bg-stone-900">
      <Modal
        width={900}
        centered
        title="Create Fair"
        open={modalOpen}
        onOk={() => {setModalOpen(false); runUpdateApplicationStatus(upcomingEvent?.id, selectedApplication?.id, "APPROVE", authToken)}}
        onCancel={() => setModalOpen(false)}
        okText="Approve"
      >
        <Typography>Business name: {selectedApplication?.applicant_name}</Typography>
        <Typography>Business address: {`${selectedApplication?.applicant_address}, ${selectedApplication?.applicant_city_label}, ${selectedApplication?.applicant_country_label}`}</Typography>
        <Typography>Business email: {selectedApplication?.applicant_email}</Typography>
        <Typography>Business contact phone: {selectedApplication?.applicant_phone}</Typography>
        <Typography>Product: {selectedApplication?.application_data?.product_description}</Typography>
        <Typography>Price range: From {selectedApplication?.application_data?.price_range[0]} to {selectedApplication?.application_data?.price_range[1]} euro</Typography>
        <Typography>Utilities {selectedApplication?.application_data?.utilities.join(', ')}</Typography>
        
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
          {upcomingEvent && (
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
          )}

        </section>
        <section>
          <p className="mb-4 mt-10 text-3xl font-bold dark:text-white">
            Pending Application
          </p>
          {applications && (
            <Table columns={columns} dataSource={applications}>
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
          )

          }
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

        </section>
      </div>
      <Footer />
    </div>
  );
}
