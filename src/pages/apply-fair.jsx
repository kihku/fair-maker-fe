import { createFair, getFairDetail, getOrgMetadata } from "@/apis";
import { FairConfig, showNotice } from "@/widgets/components";
import { FairApplication } from "@/widgets/components/fair-application";
import { Footer } from "@/widgets/layout";
import { useLocalStorageState, useRequest } from "ahooks";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

const utilityOptions = ['Electricity', 'Water', 'Internet'];

export function FairApply() {
  let { eventId } = useParams();
  const [authToken, _] = useLocalStorageState("token");

  const { data: fairDetail } = useRequest(getFairDetail, {
    onSuccess: (result, params) => {
      console.log(result);
    },
    defaultParams: [eventId, authToken],
  });

  const { run: runSubmit } = useRequest(createFair, {
    manual: true,
    onSuccess: (result, params) => {
      console.log(result);
      showNotice("success");
    },
  });

  const onFinish = (values) => {
    
    console.log(JSON.stringify(values));
    //runSubmit(payload, authToken);
  };

  const [orgMetadata, setOrgMetadata] = useState({
    company_size: [],
    tags: [],
  });

  useRequest(getOrgMetadata, {
    onSuccess: (result, params) => {
      setOrgMetadata(result);
    },
  });

  return (
    <div className="bg-white dark:bg-stone-900">
      <div className="h-24 bg-black"></div>
      <section className="max-w-6xl p-10 lg:px-72">
        <FairApplication
          onFinish={onFinish}
          metadata={orgMetadata}
          authToken={authToken}
          fairDetail={fairDetail}
          utilityOptions={utilityOptions}
        />
      </section>

      <Footer />
    </div>
  );
}
