import { send_request } from "@/apis/util";

export async function getListFair(props, token) {
  const { page } = props;
  let data = await send_request({
    method: "GET",
    url: `/event/`,
    params: {
      ...props,
      currentPage: page?.currentPage,
      pageSize: 6,
      page: undefined
    },
    token
  });
  return data;
}


export async function createFair(payload, token){
  let data = await send_request({
    method: "POST",
    url: '/event/',
    body: {
      data: payload
    },
    token
  });
  return data?.data;
}

export async function myOrgEvent(token){
  let data = await send_request({
    method: "GET",
    url: '/org/event/',
    token
  });
  return data?.data;
}


export async function getFairDetail(eventId, token){
  let data = await send_request({
    method: "GET",
    url: `/event/${eventId}`,
    token
  });
  return data?.data;
}

export async function applyFair(eventId, payload, token){
  let data = await send_request({
    method: "POST",
    url: `/event/${eventId}/apply`,
    body: {
      data: {
        application_data: payload
      }
    },
    token
  });
  return data?.data;
}

export async function fairApplications(eventId, token){
  let data = await send_request({
    method: "GET",
    url: `/event/${eventId}/application`,
    token
  });
  return data?.data;
}

export async function updateApplicationStatus(eventId, applicationId, status, token){
  if (!eventId){
    return undefined;
  }
  let data = await send_request({
    method: "POST",
    url: `/event/${eventId}/application/${applicationId}`,
    body: {
      data: {
        status
      }
    },
    token
  });
  return data?.data;
}