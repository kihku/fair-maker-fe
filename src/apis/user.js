import { send_request } from "./util";

export async function registerUser(props) {
  let data = await send_request({
    method: "POST",
    url: `/user/register`,
    params: {
      abc: "1",
      xyz: [1, 2, 3, 4],
    },
    body: {
      data: {
        ...props,
      },
    },
  });
  return data;
}
