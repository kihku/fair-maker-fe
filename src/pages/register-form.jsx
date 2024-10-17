import {
  Button,
  Input,
  Select,
  Typography,
  Option,
} from "@material-tailwind/react";
import React from "react";

export function RegisterForm() {
  const [activeStep, setActiveStep] = React.useState(0);
  return (
    <>
      <div className="h-24 bg-slate-800"></div>
      <section className="relative flex justify-center gap-40 px-5 pb-32 pt-16 md:px-36 lg:px-60">
        {
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
                      First name
                    </Typography>
                    <Input
                      maxLength={5}
                      containerProps={{ className: "min-w-[72px]" }}
                      placeholder="Andy"
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
                      Last name
                    </Typography>
                    <Input
                      maxLength={4}
                      containerProps={{ className: "min-w-[72px]" }}
                      placeholder="Williams"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    Gender
                  </Typography>
                  <Select
                    //className=" !border-t-blue-gray-200 mount:!border-t-gray-900"
                    //variant="outlined"
                    label={undefined}
                    labelProps={{
                      className: 'before:mr-0 after:ml-0',
                    }}
                  >
                    <Option>Male</Option>
                    <Option>Female</Option>
                    <Option>Other</Option>
                    <Option>Not to say</Option>
                  </Select>
                </div>
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    Date of birth
                  </Typography>
                  <Input
                    placeholder="name@mail.com"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                  />
                </div>
              </div>
              <Button size="lg">Next</Button>
            </form>
          </div>
        }
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
