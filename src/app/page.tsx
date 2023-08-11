import {
  ADSection,
  ProductCard,
} from "@/components";

import { products } from "@/app/data";
import type { FC } from "react";

async function getData(): Promise<typeof products> {
  return await new Promise((resolve) =>
    setTimeout(() => {
      resolve(products);
    }, 1000)
  );
}
export const Home: FC = async () => {
  const data = await getData();

  return (
    <main className="w-full mb-40 px-3 space-y-5">
      <ADSection />

      <section className="grid grid-cols-1 md:grid-cols-4 gap-5">
      {data.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      </section>
    </main>
  );
};

export default Home;
