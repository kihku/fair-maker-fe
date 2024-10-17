import React from "react";
import {
  Card,
  CardBody,
  Typography,
  Button,
  Input,
  Textarea,
  Checkbox,
  Carousel,
} from "@material-tailwind/react";
import { FingerPrintIcon, UsersIcon } from "@heroicons/react/24/solid";
import { PageTitle, Footer } from "@/widgets/layout";
import { FeatureCard } from "@/widgets/components";
import { featuresData, contactData } from "@/data";

export function Home() {
  const CAROUSEL_IMAGES = [
    "pic_1.jpg",
    "pic_2.jpg",
    "pic_3.jpg",
    "pic_4.jpg",
    "pic_5.jpg",
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
        <div className="absolute top-0 h-full w-full bg-black/40 bg-cover bg-center dark:bg-slate-900/40" />
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
      <section className="-mt-32 bg-white px-4 pb-20 pt-4 dark:bg-slate-900">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map(({ color, title, icon, description }) => (
              <FeatureCard
                key={title}
                color={color}
                title={title}
                icon={React.createElement(icon, {
                  className: "w-5 h-5 text-white dark:text-slate-800",
                })}
                description={description}
              />
            ))}
          </div>
          <div className="mt-32 flex flex-wrap items-center">
            <div className="mx-auto -mt-8 w-full px-4 md:w-5/12">
              <Typography
                variant="h3"
                className="mb-3 font-bold dark:text-white"
                color="blue-gray"
              >
                Why Choose BazaarHub?
              </Typography>
              <Typography className="mb-8 font-normal text-blue-gray-500 dark:text-slate-400">
                BazaarHub simplifies every aspect of market fair management into
                one efficient platform. Organizers can easily manage
                registrations, allocate booths, and monitor event performance in
                real time, all while enhancing visibility for vendors and
                customers alike. Vendors can quickly register, pay, and set up
                their stalls without any hassle. Customers benefit from easy
                event discovery, browsing vendor offerings, and planning their
                visits with ease.
                <br />
                <br />
                Join BazaarHub today for a seamless, streamlined experience that
                makes managing or attending market fairs smarter and more
                efficient for everyone involved.
              </Typography>
              <Button
                className="dark:bg-white dark:text-slate-900"
                variant="filled"
              >
                read more
              </Button>
            </div>
            <div className="mx-auto mt-16 flex w-full justify-center px-4 md:w-4/12 lg:mt-0">
              <div className="hidden h-full w-full lg:block">
                <img
                  src="/img/why_choose_us.jpg"
                  className="h-full w-full rounded-3xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="relative bg-white px-4 py-24 dark:bg-slate-900">
        <div className="container mx-auto">
          <PageTitle heading="How to become a vendor">
            <Typography
              variant="normal"
              className="font-normal dark:text-slate-400"
            >
              To apply as a vendor, start by completing the online application,
              where you'll need to provide photos of your products and booth
              design. Previous exhibitors in good standing generally have the
              first opportunity to reapply. New applicants are chosen based on
              space availability, the uniqueness of their offerings, and the
              visual appeal of their displays.
            </Typography>
          </PageTitle>
          <div className="mt-5 flex flex-row flex-wrap justify-center gap-3">
            <Button color="amber">Upcoming fairs</Button>
            <Button color="amber">More information</Button>
            <Button className="dark:bg-white dark:text-slate-800">FAQ</Button>
          </div>

          <hr className="mt-24 dark:border-slate-600" />
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
                className="dark:bg-slate-700"
                label={
                  <Typography
                    variant="small"
                    color="gray"
                    className="flex items-center font-normal dark:text-slate-400"
                  >
                    I agree the
                    <a
                      href="#"
                      className="font-medium transition-colors hover:text-gray-900 dark:text-slate-400 dark:hover:text-white"
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
