import React, { useRef } from "react";
import {
  Typography,
  Button,
  Input,
  Textarea,
  Checkbox,
  Carousel,
} from "@material-tailwind/react";
import { PageTitle, Footer } from "@/widgets/layout";
import { FeatureCard } from "@/widgets/components";
import { featuresData } from "@/data";
import { Collapse } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { useIsVisible } from "@/widgets/hooks";

export function Home() {
  const ref1 = useRef();
  const isVisible1 = useIsVisible(ref1);
  const ref2 = useRef();
  const isVisible2 = useIsVisible(ref2);

  const CAROUSEL_IMAGES = [
    "pic_1.jpg",
    "pic_3.jpg",
    "pic_4.jpg",
    "pic_5.jpg",
  ];
  const getItems = (panelStyle) => [
    {
      key: "1",
      label: (
        <p className="text-base font-bold">What is Bazaar Hub used for?</p>
      ),
      children: (
        <p>
          BazaarHub is an application designed to simplify and streamline the
          management of market fairs. It serves three main user groups:
          <br />
          <span className="font-bold"> • Organizers:</span> BazaarHub allows
          market fair organizers to easily set up and manage events. They can
          register events, handle vendor sign-ups, manage logistics, and
          communicate with participants in a smooth, organized manner.
          <br />
          <span className="font-bold">• Vendors:</span> Vendors can use
          BazaarHub to browse available market fairs, register for vendor slots,
          and secure spots at events. This makes the process of participating in
          fairs more convenient and transparent.
          <br />
          <span className="font-bold">• Customers:</span> Customers can explore
          upcoming market fairs, view event details, and discover which vendors
          or products will be available at each event. This helps them stay
          informed and plan their visits accordingly.
        </p>
      ),
      style: panelStyle,
    },
    {
      key: "2",
      label: (
        <p className="text-base font-bold">
          How does Fair Management software help organize successful events?
        </p>
      ),
      children: (
        <p>
          Fair Management software can benefit event planners in many ways.
          Experience the advantages of Fair Management Platform:
          <br />
          <span className="font-bold"> • Time-saving:</span> Automate tasks and
          streamline processes with a single tool, eliminating the need for
          multiple platforms.
          <br />
          <span className="font-bold">• Enhanced attendee engagement:</span>
          Interact with attendees through various channels for a more immersive
          experience. Personalized customization: Tailor your event website,
          app, and forms to your preferences.
          <br />
          <span className="font-bold">• Data-driven insights:</span> Access
          in-depth reports and analytics to make informed decisions
        </p>
      ),
      style: panelStyle,
    },
    {
      key: "3",
      label: (
        <p className="text-base font-bold">
          How do I get updates or notifications about market events?
        </p>
      ),
      children: (
        <p>
          Once you're registered, you can opt in to receive real-time
          notifications via email or in-app alerts for event updates, vendor
          information, and other important details.
        </p>
      ),
      style: panelStyle,
    },
    {
      key: "4",
      label: (
        <p className="text-base font-bold">
          How do I contact support if I have any issues?
        </p>
      ),
      children: (
        <p>
          If you encounter any issues, you can reach Bazaar Hub's customer
          support through the "Contact us" section on website. Our support team
          is available to assist with any questions or technical problems.
        </p>
      ),
      style: panelStyle,
    },
  ];
  return (
    <>
      <div className="relative flex h-screen content-center items-center justify-center pb-32 pt-16">
        {/* <div className="absolute top-0 h-full w-full bg-[url('/img/background-3.jpg')] bg-cover bg-center" /> */}
        <div className="absolute top-0 h-full w-full">
          <Carousel
            className="rounded-xl"
            navigation={() => <></>}
            prevArrow={() => <></>}
            nextArrow={() => <></>}
            autoplay
            loop
          >
            {CAROUSEL_IMAGES.map((picName) => (
              <img
                src={`/img/homepage_carousel/${picName}`}
                alt="image 1"
                className="h-full w-full object-cover"
              />
            ))}
          </Carousel>
        </div>
        <div className="absolute top-0 h-full w-full bg-black/40 bg-cover bg-center dark:bg-stone-900/40" />
        <div className="max-w-8xl container relative mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
              <Typography
                variant="h1"
                color="white"
                className="mb-6 font-black"
              >
                The Future of Seamless Market Fair Management
              </Typography>
              <Typography variant="lead" color="white" className="opacity-80">
                At BazaarHub, we believe in making market fairs effortless for
                organizers, vendors, and customers alike. Whether you’re
                organizing a large-scale event or running a local pop-up, our
                platform is designed to simplify the process every step of the
                way.
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <section className="-mt-32 bg-white px-4 pb-20 pt-4 dark:bg-stone-900">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map(({ color, title, icon, description }) => (
              <FeatureCard
                key={title}
                color={color}
                title={title}
                icon={React.createElement(icon, {
                  className: "w-5 h-5 text-white dark:text-stone-800",
                })}
                description={description}
              />
            ))}
          </div>
          <div className="mt-32 flex flex-wrap items-center">
            <div
              ref={ref2}
              className={`transition-opacity duration-1000 ease-in ${
                isVisible2 ? "opacity-100" : "opacity-0"
              } mx-auto -mt-8 w-full px-4 md:w-5/12`}
            >
              <Typography
                variant="h3"
                className="mb-3 font-bold dark:text-white"
                color="blue-gray"
              >
                Simple and Dynamic Fair Event Creation
              </Typography>
              <Typography className="mb-8 font-normal text-blue-gray-500 dark:text-stone-400">
                BazaarHub simplifies every aspect of market fair management into
                one efficient platform. Organizers can easily manage
                registrations, allocate booths, and monitor event performance in
                real time, all while enhancing visibility for vendors and
                customers alike. Vendors can quickly register, pay, and set up
                their stalls without any hassle. Customers benefit from easy
                event discovery, browsing vendor offerings, and planning their
                visits with ease.
                <br />
              </Typography>
            </div>
            <div className="mx-auto mt-16 flex w-full justify-center px-4 md:w-5/12 lg:mt-0">
              <div className="h-full w-full overflow-hidden rounded-2xl shadow-md lg:block">
                <video
                  src="/video/fair-create.mp4"
                  width="1000"
                  height="1000"
                  muted
                  // controls="controls"
                  autoPlay={true}
                  loop={true}
                />
              </div>
            </div>
          </div>
          <div className="mt-32 flex flex-col-reverse flex-wrap items-center lg:flex-row">
            <div className="mx-auto mt-16 flex w-full justify-center px-4 md:w-5/12 lg:mt-0">
              <div className="h-full w-full overflow-hidden rounded-2xl shadow-md lg:block">
                <video
                  src="/video/fair-create.mp4"
                  width="1000"
                  height="1000"
                  muted
                  // controls="controls"
                  autoPlay={true}
                  loop={true}
                />
              </div>
            </div>
            <div
              ref={ref1}
              className={`mx-auto -mt-8 w-full px-4 transition-opacity duration-1000 ease-in md:w-5/12 ${
                isVisible1 ? "opacity-100" : "opacity-0"
              }`}
            >
              <Typography
                variant="h3"
                className="mb-3 font-bold dark:text-white"
                color="blue-gray"
              >
                Effortless and Seamless Event Management
              </Typography>
              <Typography className="mb-8 font-normal text-blue-gray-500 dark:text-stone-400">
                Streamlines the entire market fair planning process, making it
                easy for organizers to manage events without the usual hassle.
                With an intuitive interface, organizers can quickly create and
                manage market fairs, handle vendor registrations, and coordinate
                event logistics. The platform offers automated scheduling,
                real-time updates, and communication tools, ensuring smooth
                coordination between vendors, customers, and event staff.
                Instant notifications and integrated calendars allow organizers
                to make adjustments on the go, providing a seamless experience
                from event setup to execution.
                <br />
              </Typography>
            </div>
          </div>
        </div>
      </section>
      <section className="relative bg-white px-4 py-24 dark:bg-stone-900">
        <div className="container mx-auto">
          <PageTitle heading="Frequently Asked Questions" />
          <Collapse
            bordered={false}
            defaultActiveKey={["1"]}
            expandIcon={({ isActive }) => (
              <CaretRightOutlined rotate={isActive ? 90 : 0} />
            )}
            // style={{ background: token.colorBgContainer }}
            className="mx-auto mt-4 bg-white dark:bg-stone-900 dark:text-white lg:w-[800px]"
            items={getItems()}
          />
          <div className="mt-5 flex flex-row flex-wrap justify-center gap-3">
            <Button color="amber" onClick={() => window.open("/sign-in")}>
              Join us today
            </Button>
          </div>

          <hr className="mt-24 dark:border-stone-600" />
          <div className="mt-24 ">
            <PageTitle section="Contact Us" heading="Want to work with us?">
              Complete this form and we will get back to you in 24 hours.
            </PageTitle>
            <form className="mx-auto mt-12 w-full lg:w-5/12">
              <div className="mb-8 grid gap-y-4">
                <Input
                  size="lg"
                  label="Full Name"
                  className="dark:text-white dark:focus:!border-white dark:focus:border-t-white"
                />
                <Input
                  size="lg"
                  label="Email Address"
                  className="dark:text-white dark:focus:!border-white"
                />
                <Textarea
                  className="dark:text-white dark:focus:!border-white "
                  size="lg"
                  label="Message"
                  rows={8}
                />
              </div>
              <Checkbox
                className="dark:bg-stone-700"
                label={
                  <Typography
                    variant="small"
                    color="gray"
                    className="flex items-center font-normal dark:text-stone-400"
                  >
                    I agree the
                    <a
                      href="#"
                      className="font-medium transition-colors hover:text-gray-900 dark:text-stone-400 dark:hover:text-white"
                    >
                      &nbsp;Terms and Conditions
                    </a>
                  </Typography>
                }
                containerProps={{ className: "-ml-2.5" }}
              />
              <Button
                disabled
                variant="gradient"
                size="lg"
                className="mt-8"
                fullWidth
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>
      <div className="bg-white">
        <Footer />
      </div>
    </>
  );
}

export default Home;
