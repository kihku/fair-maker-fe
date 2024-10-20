import { FairConfig } from "@/widgets/components";
import { Footer } from "@/widgets/layout";
import React from "react";

export function FairCreate() {
  const onFinish = (values) => {
    console.log(JSON.stringify(values));
  };
  return (
    <div className="bg-white dark:bg-stone-900">
      <div className="h-24 bg-black"></div>
      <section className="max-w-6xl p-10 lg:px-72">
        <FairConfig onFinish={onFinish} />
      </section>

      <Footer />
    </div>
  );
}
