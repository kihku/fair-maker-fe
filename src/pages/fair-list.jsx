import { FAIR_LIST } from "@/data";
import { FairCard } from "@/widgets/cards/fair-card";
import { Pagination } from "@/widgets/cards/pagination";
import { Footer } from "@/widgets/layout";
import { Input, Select, Typography, Option } from "@material-tailwind/react";
import React from "react";

export function FairList() {
  return (
    <>
      <div className="h-24 bg-slate-800"></div>
      <div className="relative flex min-h-screen px-5 pb-32 pt-16 dark:bg-slate-900  lg:px-32">
        <section>
          <Typography variant="h1" className="capitalize dark:text-white">
            Upcoming fairs
          </Typography>
          <div>
            <form className=" mt-5 flex flex-wrap gap-4">
              <div className="min-w-[50px] lg:w-80">
                <Select
                  label="Location"
                  color="amber"
                  className="dark:text-white"
                >
                  <Option>Material Tailwind HTML</Option>
                  <Option>Material Tailwind React</Option>
                  <Option>Material Tailwind Vue</Option>
                  <Option>Material Tailwind Angular</Option>
                  <Option>Material Tailwind Svelte</Option>
                </Select>
              </div>

              <div className="min-w-[50px] lg:w-80">
                <Select
                  label="Categories"
                  color="amber"
                  className="dark:text-white"
                >
                  <Option>Material Tailwind HTML</Option>
                  <Option>Material Tailwind React</Option>
                  <Option>Material Tailwind Vue</Option>
                  <Option>Material Tailwind Angular</Option>
                  <Option>Material Tailwind Svelte</Option>
                </Select>
              </div>
              <div className="min-w-[50px] lg:w-80">
                <Select
                  label="Location"
                  color="amber"
                  className="dark:text-white"
                >
                  <Option>Material Tailwind HTML</Option>
                  <Option>Material Tailwind React</Option>
                  <Option>Material Tailwind Vue</Option>
                  <Option>Material Tailwind Angular</Option>
                  <Option>Material Tailwind Svelte</Option>
                </Select>
              </div>
            </form>
          </div>
          <div className="my-10 flex flex-row flex-wrap justify-center gap-5">
            {FAIR_LIST?.map(
              ({ title, description, picture, tags, location }) => (
                <FairCard
                  color="black"
                  title={title}
                  description={description}
                  pictureUrl={picture}
                  tags={tags}
                  location={location}
                />
              ),
            )}
          </div>
          <div className="flex justify-center">
            <Pagination />
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
