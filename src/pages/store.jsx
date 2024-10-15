import { } from "@/widgets/layout";
import React from "react";
import {
  IconButton,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  CardHeader,
  Card,
  CardBody,
  Alert,
} from "@material-tailwind/react";
import { Footer, Voucher } from "@/widgets/layout";
import { useRequest, useLocalStorageState } from "ahooks";
import { send_request } from "@/apis/util";

const TABLE_HEAD = ["Product Name", "Category", "Quantity", "Price"];

const TABLE_ROWS = [
  {
    name: "S-Market 10%",
    category: "Electronics",
    quantity: "1",
    price: "40",
  },
  {
    name: "Tori 20%",
    category: "Audio",
    quantity: "2",
    price: "30",
  },
  {
    name: "Oboy",
    category: "Kitchen",
    quantity: "1",
    price: "100",
  },
  {
    name: "Juhja",
    category: "Kitchen",
    quantity: "1",
    price: "129",
  },
];

export function Store() {
  const [isCartOpen, setCartOpen] = React.useState(false);
  const handleOpen = (isOpen) => setCartOpen(isOpen);

  const [token] = useLocalStorageState("token");

  if (!token) {
    window.open("/sign-in", "_self");
  }

  const [userProfile, setUserProfile] = useLocalStorageState("userData", {
    listenStorageChange: true,
  });

  const [alert, setAlert] = React.useState(false);



  React.useEffect(() => {
    setTimeout(() => {
      setAlert(false);
    }, 5000);
  }, []);

  async function getShopItems() {
    let data = await send_request("GET", "/shop", {
      Authorization: `Bearer ${token}`,
    });
    return data?.items;
  }

  async function buyItem(item_id) {
    let data = await send_request("POST", `/shop/${item_id}`, {
      Authorization: `Bearer ${token}`,
    });
    return data?.points;
  }

  const { data } = useRequest(getShopItems, { ready: token });

  const { loading, run: runBuyItem } = useRequest(buyItem, {
    manual: true,
    onSuccess: (result, params) => {
      setAlert(true);
      setUserProfile({ ...userProfile, points: result });
    },

  });

  return (
    <>
      <div className="relative flex h-96 content-center items-center justify-center pb-32 pt-16">
        <div className="absolute top-0 h-96 w-full bg-[url('/img/background-3.jpg')] bg-cover bg-center" />
        <div className="dark:bg-slate-900/60 absolute top-0 h-96 w-full bg-black/60 bg-cover bg-center" />
      </div>
      {alert && (
        <Alert className="fixed left-16 top-10 z-50 w-fit" color="green">
          You sucessfully bought a voucher
        </Alert>
      )}
      <section className="dark:bg-slate-900 -mt-32 flex justify-center bg-white px-4 pb-20 pt-4">
        <Card className="dark:bg-slate-800 w-fit max-w-[48rem] flex-row">
          <CardHeader
            shadow={false}
            floated={false}
            className="dark:bg-slate-800 m-0 w-2/5 shrink-0 rounded-r-none"
          >
            <img
              src="/img/badge.png"
              alt="card-image"
              className="h-full w-full object-cover"
            />
          </CardHeader>
          <CardBody className="dark:bg-slate-800 flex flex-col justify-center">
            <Typography
              variant="h3"
              color="blue-gray"
              className="mb-2 dark:text-white"
            >
              Green badges
            </Typography>
            <Typography
              variant="h6"
              color="blue-gray"
              className="dark:text-slate-400 mb-2"
            >
              You can use green badges to exchange vouchers
            </Typography>
            <Typography variant="h1" color="green" className="mb-2">
              {userProfile.points}
            </Typography>
          </CardBody>
        </Card>
      </section>
      {data && (
        <section className="dark:bg-slate-900">
          <div className="dark:bg-slate-900 container mx-auto">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {data.map(
                (
                  { name, description, price, rank_to_unlock, banner_pic, id },
                  index,
                ) => {
                  return (
                    <Voucher
                      className="basis-1/4"
                      name={name}
                      description={description}
                      price={price}
                      can_unlock={rank_to_unlock <= userProfile.rank}
                      banner_pic={banner_pic}
                      key={id}
                      onClick={() => runBuyItem(id)}
                    />
              );
                },
              )}
            </div>
          </div>
        </section>
      )}

      <div className="fixed bottom-10 right-10 z-20">
        <IconButton
          className="rounded-full"
          color="green"
          size="lg"
          onClick={() => handleOpen(true)}
        >
          <i class="fa-solid fa-cart-shopping text-lg"></i>
        </IconButton>
      </div>

      <div className="bg-white">
        <Footer />
      </div>
      <Dialog
        open={isCartOpen}
        handler={handleOpen}
        className="dark:bg-slate-800"
      >
        <DialogHeader className="dark:text-white">Your Inventory</DialogHeader>
        <DialogBody>
          <table className="w-full min-w-max table-auto text-left ">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th key={head} className="p-4 pt-10">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-bold leading-none dark:text-white"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map(({ name, category, quantity, price }) => {
                return (
                  <tr key={name}>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="dark:text-slate-400 font-bold"
                      >
                        {name}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        className="dark:text-slate-400 font-normal text-gray-600"
                      >
                        {category}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        className="dark:text-slate-400 font-normal text-gray-600"
                      >
                        {quantity}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        className="dark:text-slate-400 font-normal text-gray-600"
                      >
                        {price}
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="border-t border-gray-300">
              <tr>
                <td className="p-4">
                  <Typography
                    color="blue-gray"
                    variant="small"
                    className="font-bold dark:text-white"
                  >
                    Total
                  </Typography>
                </td>
                <td className="p-4"></td>
                <td className="p-4">
                  <Typography
                    color="blue-gray"
                    variant="small"
                    className="font-bold dark:text-white"
                  >
                    5
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    color="blue-gray"
                    variant="small"
                    className="font-bold dark:text-white"
                  >
                    300
                  </Typography>
                </td>
              </tr>
            </tfoot>
          </table>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => handleOpen(false)}
            className="mr-1"
          >
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
export default Store;
