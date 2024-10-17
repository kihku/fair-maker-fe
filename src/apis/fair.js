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
