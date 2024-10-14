import { send_request } from "@/util";

export async function getListFair(props) {
  const { page } = props;
  let data = await send_request(
    "POST",
    `/fair/list`,
    {
      // Authorization: `Bearer ${token}`,
    },
    {
      data: {
        ...props,
        page: {
          currentPage: page?.currentPage,
          pageSize: 6,
        },
      },
    },
  );
  return data?.points;
}
