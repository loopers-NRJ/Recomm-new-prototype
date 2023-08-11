import { type FC } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const loading: FC = () => {
  return (
    <>
      <div className="card relative shadow-md shadow-slate-300 overflow-hidden rounded-md min-h-[250px] max-w-xl hover:shadow-lg cursor-pointer">
        <Skeleton className="product-image -z-10 absolute top-0 left-0 h-32 object-cover w-full" />
        <Skeleton className="user-image z-10 absolute top-2 right-2 w-10 rounded-full aspect-square object-cover" />

        <div className="details grid mt-32 p-3 bg-card h-full w-full">
          <Skeleton className="w-full h-5"></Skeleton>
          <Skeleton className="w-full h-5"></Skeleton>
          <Skeleton className="w-full h-5"></Skeleton>

          <div className="countdown my-3">
            <h1 className="digits grid grid-flow-col grid-cols-4 gap-5 text-center text-2xl font-semibold">
              <Skeleton className="bg-primary text-primary-foreground p-2 rounded-lg"></Skeleton>
              <Skeleton className="bg-primary text-primary-foreground p-2 rounded-lg"></Skeleton>
              <Skeleton className="bg-primary text-primary-foreground p-2 rounded-lg"></Skeleton>
              <Skeleton className="bg-primary text-primary-foreground p-2 rounded-lg"></Skeleton>
            </h1>
          </div>
        </div>
      </div>

      <div className="card relative shadow-md shadow-slate-300 overflow-hidden rounded-md min-h-[250px] max-w-xl hover:shadow-lg cursor-pointer">
        <Skeleton className="product-image -z-10 absolute top-0 left-0 h-32 object-cover w-full" />
        <Skeleton className="user-image z-10 absolute top-2 right-2 w-10 rounded-full aspect-square object-cover" />

        <div className="details grid mt-32 p-3 bg-card h-full w-full">
          <Skeleton className="w-full h-5"></Skeleton>
          <Skeleton className="w-full h-5"></Skeleton>
          <Skeleton className="w-full h-5"></Skeleton>

          <div className="countdown my-3">
            <h1 className="digits grid grid-flow-col grid-cols-4 gap-5 text-center text-2xl font-semibold">
              <Skeleton className="bg-primary text-primary-foreground p-2 rounded-lg"></Skeleton>
              <Skeleton className="bg-primary text-primary-foreground p-2 rounded-lg"></Skeleton>
              <Skeleton className="bg-primary text-primary-foreground p-2 rounded-lg"></Skeleton>
              <Skeleton className="bg-primary text-primary-foreground p-2 rounded-lg"></Skeleton>
            </h1>
          </div>
        </div>
      </div>

      <div className="card relative shadow-md shadow-slate-300 overflow-hidden rounded-md min-h-[250px] max-w-xl hover:shadow-lg cursor-pointer">
        <Skeleton className="product-image -z-10 absolute top-0 left-0 h-32 object-cover w-full" />
        <Skeleton className="user-image z-10 absolute top-2 right-2 w-10 rounded-full aspect-square object-cover" />

        <div className="details grid mt-32 p-3 bg-card h-full w-full">
          <Skeleton className="w-full h-5"></Skeleton>
          <Skeleton className="w-full h-5"></Skeleton>
          <Skeleton className="w-full h-5"></Skeleton>

          <div className="countdown my-3">
            <h1 className="digits grid grid-flow-col grid-cols-4 gap-5 text-center text-2xl font-semibold">
              <Skeleton className="bg-primary text-primary-foreground p-2 rounded-lg"></Skeleton>
              <Skeleton className="bg-primary text-primary-foreground p-2 rounded-lg"></Skeleton>
              <Skeleton className="bg-primary text-primary-foreground p-2 rounded-lg"></Skeleton>
              <Skeleton className="bg-primary text-primary-foreground p-2 rounded-lg"></Skeleton>
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default loading;
