import { getListFair } from "@/apis";
import { FAIR_LIST } from "@/data";
import { FairCard } from "@/widgets/cards/fair-card";
import { Pagination } from "@/widgets/cards/pagination";
import { Footer } from "@/widgets/layout";
import { Select, Typography, Option, Spinner } from "@material-tailwind/react";
import { useRequest, useUpdateEffect } from "ahooks";
import React, { useEffect, useState } from "react";

export function FairList() {
  const [filterParams, setFilterParams] = useState({
    location: undefined,
    categories: [],
    page: {
      currentPage: 1,
    }
  });
  const { run: runGetList, loading: loadingList } = useRequest(() =>
    getListFair(filterParams),
  );
  useUpdateEffect(runGetList, [filterParams]);
  return (
    <>
      <div className="h-24 bg-slate-800"></div>
      <div className="relative flex min-h-screen px-5 pb-32 pt-16 dark:bg-slate-900  lg:px-32">
        <section className="w-full">
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
                  onChange={(location) =>
                    setFilterParams({ ...filterParams, location })
                  }
                >
                  <Option value="option1">Material Tailwind HTML</Option>
                  <Option value="option2">Material Tailwind React</Option>
                  <Option value="option3">Material Tailwind Vue</Option>
                  <Option value="option4">Material Tailwind Angular</Option>
                  <Option value="option5">Material Tailwind Svelte</Option>
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
            {loadingList ? (
              <Spinner className="h-12 w-12 justify-self-center" />
            ) : (
              <>
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
                <div className="flex justify-center">
                  <Pagination
                    onChange={(value) => {
                      setFilterParams({
                        ...filterParams,
                        page: {
                          currentPage: value,
                        },
                      });
                    }}
                    total={undefined}
                    pageSize={undefined}
                  />
                </div>
              </>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
