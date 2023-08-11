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

const WishIt: FC = () => {
  return (
    <main>
      <AddWish></AddWish>
      <div className="list space-y-3">
        {Wishes.map((wish) => (
          <WishCard key={wish.id} {...wish} />
        ))}
      </div>
    </main>
  );
};


export default WishIt;
