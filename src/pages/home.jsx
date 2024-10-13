import React from "react";
import {
  Card,
  CardBody,
  Typography,
  Button,
  Input,
  Textarea,
  Checkbox,
  Carousel
} from "@material-tailwind/react";
import { FingerPrintIcon, UsersIcon } from "@heroicons/react/24/solid";
import { PageTitle, Footer } from "@/widgets/layout";
import { FeatureCard } from "@/widgets/cards";
import { featuresData, teamData, contactData } from "@/data";

export function Home() {
  return (
    <>
      <div className="relative flex h-screen content-center items-center justify-center pb-32 pt-16">
        {/* <div className="absolute top-0 h-full w-full bg-[url('/img/background-3.jpg')] bg-cover bg-center" /> */}
        <div className="absolute top-0 h-full w-full">
          <Carousel className="rounded-xl">
            <img
              src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
              alt="image 1"
              className="h-full w-full object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
              alt="image 2"
              className="h-full w-full object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
              alt="image 3"
              className="h-full w-full object-cover"
            />
          </Carousel>
        </div>
        <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center dark:bg-slate-900/60" />
        <div className="max-w-8xl container relative mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
              <Typography
                variant="h1"
                color="white"
                className="mb-6 font-black"
              >
                Empowering a Greener Tomorrow, One Step at a Time.
              </Typography>
              <Typography variant="lead" color="white" className="opacity-80">
                Your Essential Companion for Building a Greener Future.
                Empowering individuals to make eco-friendly choices, reduce
                their carbon footprint, and create a sustainable environment for
                generations to come.
              </Typography>
              <Button
                variant="gradient"
                size="lg"
                className="mt-8 h-28 rounded-full px-12 text-2xl dark:text-slate-900"
                color="green"
                onClick={() => window.open("/sign-in", "_self")}
              >
                Start Greenify today
              </Button>
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
                  className: "w-5 h-5 text-white",
                })}
                description={description}
              />
            ))}
          </div>
          <div className="mt-32 flex flex-wrap items-center">
            <div className="mx-auto -mt-8 w-full px-4 md:w-5/12">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-gray-900 p-2 text-center shadow-lg dark:bg-white">
                <FingerPrintIcon className="h-8 w-8 text-white dark:text-slate-900" />
              </div>
              <Typography
                variant="h3"
                className="mb-3 font-bold dark:text-white"
                color="blue-gray"
              >
                Our Vision:
              </Typography>
              <Typography className="mb-8 font-normal text-blue-gray-500 dark:text-slate-400">
                At Greenify, we envision a future where sustainable living is
                second nature. We strive to foster a community where every
                individual can make a tangible impact, leading to a greener,
                cleaner planet. Through education, action, and rewarding
                positive behaviors, we aim to make environmental responsibility
                accessible to everyone.
                <br />
                <br />
                Join Greenify today and start turning your actions into
                meaningful rewards. Together, we can create a sustainable future
                for generations to come!
              </Typography>
              <Button
                className="dark:bg-white dark:text-slate-900"
                variant="filled"
              >
                read more
              </Button>
            </div>
            <div className="mx-auto mt-24 flex w-full justify-center px-4 md:w-4/12 lg:mt-0">
              <div className="hidden h-full w-full lg:block">
                <img
                  src="/img/team-work.jpeg"
                  className="h-full w-full rounded-3xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="relative bg-white px-4 py-24 dark:bg-slate-900">
        <div className="container mx-auto">
          <Card className="rounded-lg shadow-2xl shadow-gray-500/10">
            <CardBody className="px-8 text-center dark:bg-slate-800">
              <PageTitle section="Co-Working" heading="Together we can">
                <Typography
                  variant="h5"
                  className="font-normal dark:text-slate-400"
                >
                  We collaborate with a network of eco-conscious businesses,
                  recycling centers, and environmental organizations to offer a
                  wide variety of reward vouchers and opportunities. By working
                  together, we aim to build a strong community dedicated to
                  preserving our planet.
                </Typography>
              </PageTitle>
              <div className="mx-auto mb-48 mt-20 grid max-w-5xl grid-cols-1 gap-16 dark:bg-slate-800 md:grid-cols-2 lg:grid-cols-3">
                {contactData.map(({ title, icon, description }) => (
                  <Card
                    key={title}
                    color="transparent"
                    shadow={false}
                    className="text-center text-blue-gray-900"
                  >
                    <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full bg-blue-gray-900 shadow-lg shadow-gray-500/20 dark:bg-white">
                      {React.createElement(icon, {
                        className: "w-5 h-5 text-white dark:text-slate-800",
                      })}
                    </div>
                    <Typography
                      variant="h5"
                      color="blue-gray"
                      className="mb-2 dark:text-white"
                    >
                      {title}
                    </Typography>
                    <Typography className="font-normal text-blue-gray-500 dark:text-slate-400">
                      {description}
                    </Typography>
                  </Card>
                ))}
              </div>
            </CardBody>
          </Card>
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
                color="green"
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
