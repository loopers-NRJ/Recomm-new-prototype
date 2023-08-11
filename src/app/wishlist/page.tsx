import WishCard from "@/components/cards/WishCard";
import AddWish from "@/components/forms/AddWish";
import { type FC } from "react";


const Wishes: Wish[] = [
  {
    id: 1,
    category: "Mobiles",
    brand: "Nothing",
    model: "Phone 1",
    status: "available",
  },
  {
    id: 2,
    category: "Mobiles",
    brand: "Apple",
    model: "iPhone 12",
    status: "pending",
  },
  {
    id: 3,
    category: "Cars",
    brand: "Tesla",
    model: "Model S",
    status: "pending",
  },
];

export const WishIt: FC = () => {
  return (
    <>
      <AddWish></AddWish>
      <div className="list mt-7 space-y-3">
        {Wishes.map((wish) => (
          <WishCard key={wish.id} {...wish} />
        ))}
      </div>
    </>
  );
};


export default WishIt;
