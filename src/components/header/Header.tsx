import Image from "next/image";
import Link from "next/link";
import { FiHome, FiUser, FiHeart, FiShoppingBag } from "react-icons/fi";

export function Header(): React.JSX.Element {
  return (
    <nav className="sticky top-0 flex p-2 w-full justify-center md:justify-between">
      <Image src="/recomm.svg" width={100} alt="logo" height={50} />
      <ul className="links hidden md:flex gap-10">
        <Link href="/" className="link-item flex gap-1">
          <FiHome size={"1.2rem"} />
        </Link>
        <Link href="/wishlist" className="link-item flex gap-1">
          <FiHeart size={"1.2rem"} />
        </Link>
        <Link href="/bids" className="link-item flex gap-1">
          <FiShoppingBag size={"1.2rem"} />
        </Link>
        <Link href="/profile" className="link-item flex gap-1">
          <FiUser size={"1.2rem"} />
        </Link>
      </ul>
    </nav>
  );
}
