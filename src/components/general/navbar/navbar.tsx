"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import LogIn from "./login";

export default function Navbar() {
  const [navBg, setNavBg] = React.useState(false);
  const pathname = usePathname();

  const changeNavBg = () => {
    if (window.scrollY >= 30) {
      setNavBg(true);
    } else {
      setNavBg(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener("scroll", changeNavBg);
    return () => {
      window.removeEventListener("scroll", changeNavBg);
    };
  }, []);

  const links = [
    { label: "Info", href: "/info" },
    { label: "Mappool", href: "/mappools" },
    { label: "Timeplan", href: "/schedule" },
    { label: "Spillere", href: "/players" },
    { label: "Personalet", href: "/staff" },
    { label: "Statistikk", href: "/statistics" },
  ];

  return (
    <header
      className={`bg-red-800" fixed top-0 left-0 z-50 w-full transition-all ${navBg ? "bg-navbar" : ""}`}
    >
      <nav
        className={`mx-auto flex w-[calc(100%-50px)] max-w-screen-lg items-center gap-5 transition-all ${navBg ? "h-16" : "h-32"}`}
      >
        <Link href={"/"} className="mr-auto font-bold">
          <Image
            src={"/logos/ont/new-logo.png"}
            alt="Logo"
            width={0}
            height={0}
            sizes="100vw"
            className={`transition-all ${navBg ? "w-24" : "w-36"}`}
          ></Image>
        </Link>
        <div className="flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-accent block w-28 text-center text-lg ${pathname.startsWith(link.href) ? "font-bold" : "font-semibold"}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <LogIn navBg={navBg} />
      </nav>
    </header>
  );
}
