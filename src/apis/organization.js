import { send_request } from "./util";

export async function createOrg(props, token) {
    let data = await send_request({
      method: "POST",
      url: `/org/`,
      body: {
        data: {
          ...props,
        },
      },
      token: token
    });
    return data?.data;
  }


export async function getUserOrg(token) {
    let data = await send_request({
      method: "GET",
      url: `/org/`,
      token: token
    });
    return data?.data;
  }


export async function getOrgMetadata(){
    let data = await send_request({
        method: "GET",
        url: `/metadata/org/`,
      });
      return data?.data;
}