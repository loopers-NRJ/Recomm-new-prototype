import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function WishCard({
  category,
  brand,
  model,
  status,
}: Wish): React.ReactNode {
  return (
    <Card className="flex justify-between items-center w-[350px]">
      <div className="flex flex-col gap-0">
        <CardHeader>
          <CardTitle>
            {brand} {model}
          </CardTitle>
          <CardDescription>{category}</CardDescription>
          <Badge className="select-none text-[10px] leading-0 w-fit px-2" variant={status}>
            {status}
          </Badge>
        </CardHeader>
      </div>
      <CardFooter className="flex-col items-end gap-2 p-6">
        <Button disabled={status !== "available"}>View Products</Button>
      </CardFooter>
    </Card>
  );
}

export default WishCard;
