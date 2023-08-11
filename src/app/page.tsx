import { ADSection, ProductList } from "@/components";

export default function Home(): React.JSX.Element {
  return (
    <main className="w-full mb-40 px-3">
      <ADSection />
      <ProductList />
    </main>
  );
}