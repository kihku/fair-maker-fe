import { Footer } from "@/widgets/layout";
import {
  BuildingLibraryIcon,
  CogIcon,
  LockClosedIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import {
  Button,
  Input,
  Step,
  Stepper,
  Typography,
} from "@material-tailwind/react";
import React from "react";

export function RegisterForm() {
  const [activeStep, setActiveStep] = React.useState(0);
  return (
    <>
      <div className="h-24 bg-slate-800"></div>
      <section className="relative flex justify-center gap-40 px-5 pb-32 pt-16 md:px-36 lg:px-96">
        <div>
          <Typography variant="h2" color="blue-gray" className="font-bold">
            Welcome to Bazaar Hub!
          </Typography>
          <Typography variant="h3" color="amber" className="font-medium">
            Ready to get started?
          </Typography>
          <form className="mt-5 flex flex-col gap-4">
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                Your Email
              </Typography>
              <Input
                type="email"
                placeholder="name@mail.com"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>

            <div>
              <div className="mb-4 flex items-center gap-4">
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    Expires
                  </Typography>
                  <Input
                    maxLength={5}
                    containerProps={{ className: "min-w-[72px]" }}
                    placeholder="00/00"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    CVC
                  </Typography>
                  <Input
                    maxLength={4}
                    containerProps={{ className: "min-w-[72px]" }}
                    placeholder="000"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>
              </div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                Holder Name
              </Typography>
              <Input
                placeholder="name@mail.com"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            <Button size="lg">Next</Button>
          </form>
        </div>
        <div className="hidden h-full w-2/5 lg:block">
          <img
            src="/img/pattern.jpg"
            className="h-[500px] w-full rounded-3xl object-cover"
          />
        </div>
      </section>
    </>
  );
}
