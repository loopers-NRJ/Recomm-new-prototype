"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type IconType } from "react-icons";
import { FiHome, FiUser, FiHeart, FiShoppingBag } from "react-icons/fi";

interface BottomTab {
  title: string;
  url: string;
  Icon: IconType;
}

export function BottomNavigation(): React.JSX.Element {
  const currentPage = usePathname();

  const bottomTabs: BottomTab[] = [
    { title: "home", url: "/", Icon: FiHome },
    { title: "wishlist", url: "/wishlist", Icon: FiHeart },
    { title: "bids", url: "/biddings", Icon: FiShoppingBag },
    { title: "profile", url: "/profile", Icon: FiUser },
  ];

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 h-16 bg-white drop-shadow-[0_-15px_20px_rgba(0,0,0,0.10)] md:hidden">
        <ul className="flex h-full">
          {bottomTabs.map((tab, index) => (
            <li key={index} className="flex-1">
              <Link
                href={tab.url}
                className={
                  "flex h-full w-full flex-col items-center justify-center text-xs font-medium select-none bg-white transition-all duration-300" +
                  (currentPage === tab.url
                    ? "border border-t-4 border-black"
                    : "")
                }
              >
                <tab.Icon size={"1.2rem"} />
                <span className="mt-1">{tab.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
