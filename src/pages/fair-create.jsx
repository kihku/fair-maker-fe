import { createFair, getOrgMetadata } from "@/apis";
import { FairConfig, showNotice } from "@/widgets/components";
import { Footer } from "@/widgets/layout";
import { useLocalStorageState, useRequest } from "ahooks";
import React, { useState } from "react";

export function FairCreate() {

  const [authToken, _] = useLocalStorageState("token");
  const {run: runSubmit} = useRequest(createFair, {
    manual: true,
    onSuccess: (result, params) => {
      console.log(result);
      showNotice("success");
      window.open("/fair-management","_self");
    }
  })


  const onFinish = (values) => {
    let eventMap = {url: values.eventMap.file.response.data.imgUrl};
    let banner = [];

    for (let image of values.banner.fileList){
      if (image.response.success){
        banner.push({url : image.response.data.imgUrl})
      }
    }

    delete values.eventMap;
    delete values.banner;

    let details = {config : {
      booth_types: values.boothTypes,
      document_config: values.documentConfigs,
      operation_hours: values.operationHours
    }};

    delete values.boothTypes;
    delete values.documentConfigs;
    delete values.operationHours;

    let payload = {
      ...values,
      pictures: {
        map: eventMap,
        banner: banner,
        event: []
      },
      details: details,
      start_date: values.dates[0],
      end_date: values.dates[1]
    }
    console.log(JSON.stringify(payload));
    runSubmit(payload, authToken);
  };

  const [orgMetadata, setOrgMetadata] = useState({company_size: [], tags: []});
  

  useRequest(getOrgMetadata, {
    onSuccess: (result, params) => {
      setOrgMetadata(result);
    },
  });

  return (
    <div className="bg-white dark:bg-stone-900">
      <div className="h-24 bg-black"></div>
      <section className="max-w-6xl p-10 lg:px-72">
        <FairConfig onFinish={onFinish} metadata={orgMetadata} authToken={authToken}/>
      </section>

      <Footer />
    </div>
  );
}
