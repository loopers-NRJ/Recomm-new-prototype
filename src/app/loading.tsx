import { type FC } from "react";
import { Skeleton } from "@/components/ui/skeleton";
// import { ADSection } from "@/components";

export const loading: FC = () => {
  return (
    <main className="w-full mb-40 px-3 space-y-5">
      {/* <ADSection></ADSection> */}
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="card relative border border-muted-background overflow-hidden rounded-md min-h-[250px] max-w-xl">
          <Skeleton className="product-image -z-10 absolute top-0 left-0 h-32 w-full" />
          <Skeleton className="user-image z-10 absolute top-2 right-2 w-10 aspect-square rounded-full" />

          <div className="details grid gap-2 mt-32 p-3 bg-card h-full w-full">
            <Skeleton className="w-full h-5"></Skeleton>
            <Skeleton className="w-full h-5"></Skeleton>
            <Skeleton className="w-full h-5"></Skeleton>

            <h1 className="count-down grid grid-cols-4 gap-5 my-3">
              <Skeleton className="aspect-video rounded-lg"></Skeleton>
              <Skeleton className="aspect-video rounded-lg"></Skeleton>
              <Skeleton className="aspect-video rounded-lg"></Skeleton>
              <Skeleton className="aspect-video rounded-lg"></Skeleton>
            </h1>
          </div>
        </div>
      ))}
    </main>
  );
};

export default loading;
