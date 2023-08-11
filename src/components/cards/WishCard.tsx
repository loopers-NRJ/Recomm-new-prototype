import { Button } from "@/components/ui/button";
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
        </CardHeader>
      </div>
      <CardFooter className="p-6">
        <Button disabled={status !== "available"}>View Products</Button>
      </CardFooter>
    </Card>
  );
}

export default WishCard;
