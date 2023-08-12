import { ProductCard } from "@/components";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { products, categories } from "@/data";

import { getServerSession } from "next-auth/next";

import type { FC } from "react";
import type { Session } from "next-auth";

async function getData(): Promise<typeof products> {
  return await new Promise((resolve) =>
    setTimeout(() => {
      resolve(products);
    }, 1000)
  );
}

const Home: FC = async () => {
  const data = await getData();

  let session: Session | null = null;

  try {
    session = await getServerSession();
    // console.log(session);
  } catch (err) {
    console.log("error");
  }

  return (
    <>
      {/* <ManageSwipe /> */}
      <main className="w-full mb-40 px-3">
        {session?.user !== null && (
          <h1 className="text-xl font-semibold text-primary">
            Hello, {session?.user?.name}
          </h1>
        )}
        {/* <ADSection /> */}
        <h1 className="text-xl text-primary font-semibold mb-2 mt-10">
          Browse by Categories
        </h1>
        <section className="browse-section flex gap-3 overflow-scroll h-10">
          {categories.map((name, i) => (
            <Button key={i} variant="default" className="h-full">
              {name}
            </Button>
          ))}
        </section>

        <h1 className="text-xl text-primary font-semibold mb-2 mt-10">
          Search Products
        </h1>
        <div className="search-bar flex gap-3">
          <Input
            type="search"
            inputMode="search"
            placeholder="Search..."
            className="md:w-[100px] lg:w-[300px]"
          />
          <Button variant={"default"}>GO</Button>
        </div>

        <h1 className="text-xl text-primary font-semibold mb-2 mt-10">
          Top Live Biddings
        </h1>
        <section className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      </main>
    </>
  );
};

export default Home;
