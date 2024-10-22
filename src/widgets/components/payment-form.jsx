import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Input, Col, Row, Form, Button, Modal } from "antd";
import React from "react";
import { useState } from "react";
import { validateMessages } from "../utils";
export const PaymentForm = (props) => {
  const [form] = Form.useForm();
  const [isLoading, setLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    props.form.validateFields(async (err, values) => {
      if (!err) {
        setLoading(true);
        const result = await stripe.createPaymentMethod({
          type: "card",
          card: elements.getElement(CardElement),
          billing_details: {
            address: {
              city: values.city,
              line1: values.address,
              postal_code: values.zip,
              state: values.state,
            },
            email: "janedoe@example.com",
            name: values.name,
            phone: "555-555-5555",
          },
        });
        await handleStripePaymentMethod(result);
        setLoading(false);
      }
    });
  };

  const handleStripePaymentMethod = async (result) => {
    if (result.error) {
      Modal.error({
        title: "Error",
        content: result.error.message,
      });
    } else {
      const response = await fetch("api/create-customer", {
        method: "POST",
        mode: "same-origin",
        body: JSON.stringify({
          paymentMethodId: result.paymentMethod.id,
        }),
      });

      const subscription = await response.json();
      handleSubscription(subscription);
    }
  };

  const handleSubscription = (subscription) => {
    const { latest_invoice } = subscription;
    const { payment_intent } = latest_invoice;

    if (payment_intent) {
      const { client_secret, status } = payment_intent;

      if (status === "requires_action") {
        stripe.confirmCardPayment(client_secret).then(function (result) {
          if (result.error) {
            // The card was declined (i.e. insufficient funds, card has expired, etc)
            Modal.error({
              title: "Error",
              content: result.error.message,
            });
          } else {
            // Success!
            Modal.success({
              title: "Success",
            });
          }
        });
      } else {
        // No additional information was needed
        Modal.success({
          title: "Success",
        });
      }
    } else {
      console.log(`handleSubscription:: No payment information received!`);
    }
  };

  const cardOptions = {
    iconStyle: "solid",
    style: {
      base: {
        iconColor: "#1890ff",
        color: "rgba(0, 0, 0, 0.65)",
        fontWeight: 500,
        fontFamily: "Segoe UI, Roboto, Open Sans, , sans-serif",
        fontSize: "15px",
        fontSmoothing: "antialiased",
        ":-webkit-autofill": { color: "#fce883" },
        "::placeholder": { color: "#bfbfbf" },
      },
      invalid: {
        iconColor: "#ffc7ee",
        color: "#ffc7ee",
      },
    },
  };
  return (
    <Form
      validateMessages={validateMessages}
      layout="vertical"
      onSubmit={(e) => handleSubmit(e)}
      form={form}
    >
      <Form.Item
        name="name"
        rules={[{ required: true }]}
        label="Name on card"
        colon={false}
      >
        <Input placeholder="Jane Doe" />
      </Form.Item>
      <Form.Item
        label="Address"
        name="address"
        colon={false}
        rules={[{ required: true }]}
      >
        <Input placeholder="1234 Almond Ave" />
      </Form.Item>
      <Input.Group>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item
              rules={[{ required: true }]}
              name="city"
              label="City"
              colon={false}
            >
              <Input placeholder="San Bernardino" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="State"
              rules={[{ required: true }]}
              name="state"
              colon={false}
            >
              <Input placeholder="CA" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              rules={[{ required: true }]}
              name="zip"
              label="ZIP"
              colon={false}
            >
              <Input placeholder="92401" />
            </Form.Item>
          </Col>
        </Row>
      </Input.Group>
      <Form.Item label="Card" colon={false}>
        <CardElement options={cardOptions} />
      </Form.Item>
      <Button
        loading={isLoading}
        type="primary"
        htmlType="submit"
        className="checkout-button"
        disabled={!stripe}
      >
        Submit
      </Button>
    </Form>
  );
};
