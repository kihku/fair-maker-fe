import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  CardFooter,
} from "@material-tailwind/react";

export function Voucher({
  name,
  description,
  price,
  can_unlock,
  banner_pic,
  onClick,
}) {
  return (
    <Card
      className={`w-full max-w-[48rem] flex-row ${
        can_unlock ? "cursor-pointer hover:animate-bounce" : undefined
      }`}
      color="green"
      onClick={onClick}
    >
      {!can_unlock && (
        <div className="absolute z-20 grid h-full w-full content-center justify-center rounded-xl bg-black object-cover opacity-60">
          <Typography variant="h4" color="white" className="bottom-1.5  mb-2">
            Rank up to unlock
          </Typography>
        </div>
      )}
      <CardHeader
        shadow={false}
        floated={false}
        className="m-0 w-2/5 shrink-0 rounded-r-none  "
      >
        <>
          <img
            src={banner_pic}
            alt="card-image"
            className="h-full w-full object-cover"
          />
        </>
      </CardHeader>
      <CardBody>
        <Typography variant="h4" color="blue-gray" className="mb-2">
          {name}
        </Typography>
        <Typography color="gray" className="mb-8 font-normal">
          {description}
        </Typography>
        <Typography variant="h6" color="blue-gray" className="mb-4 uppercase">
          {price} badges
        </Typography>
      </CardBody>
    </Card>
  );
}

export default Voucher;
