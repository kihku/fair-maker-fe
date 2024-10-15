import { send_request } from "@/apis/util";

export async function getListFair(props) {
  const { page } = props;
  let data = await send_request({
    method: "POST",
    url: `/fair/list`,
    params:{
      abc: "1",
      xyz: [1,2,3,4]
    },
    body:{
      data: {
        ...props,
        page: {
          currentPage: page?.currentPage,
          pageSize: 6,
        },
      },
    },
  }
    
  );
  return data?.points;
}
