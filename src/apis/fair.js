import { send_request } from "@/apis/util";

export async function getListFair(props) {
  const { page } = props;
  let data = await send_request({
    method: "GET",
    url: `/fair/list`,
    params: {
      data: {
        ...props,
        page: {
          currentPage: page?.currentPage,
          pageSize: 6,
        },
      },
    },
  });
  return data?.points;
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