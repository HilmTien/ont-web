"use client";

import { ChevronDown } from "@/components/icons/chevrondown";
import { ChevronUp } from "@/components/icons/chevronup";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dialog } from "radix-ui";
import React from "react";
import LogIn from "./login";

interface NavbarProps {
  latestStage?: number;
}

export default function Navbar({ latestStage }: NavbarProps) {
  const [navBg, setNavBg] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  const changeNavBg = () => {
    if (window.scrollY >= 30) {
      setNavBg(true);
    } else {
      setNavBg(false);
    }
  };

  React.useEffect(() => {
    changeNavBg();
    window.addEventListener("scroll", changeNavBg);
    return () => {
      window.removeEventListener("scroll", changeNavBg);
    };
  }, []);

  const links = [
    { label: "Info", href: `/info` },
    { label: "Mappool", href: `/mappools/${latestStage || ""}` },
    { label: "Timeplan", href: `/schedule/${latestStage || ""}` },
    { label: "Spillere", href: `/players` },
    { label: "Personalet", href: `/staff` },
    { label: "Statistikk", href: `/statistics/${latestStage || ""}` },
  ];

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all ${navBg ? "bg-navbar border-accent border-b-2" : "border-accent border-b-0"}`}
    >
      <nav
        className={`pointer-events-auto mx-auto flex w-[calc(100%-50px)] max-w-screen-lg items-center gap-5 transition-all ${navBg ? "h-16" : "h-32"}`}
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
        <div className="hidden items-center lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-accent block w-28 text-center text-lg ${pathname.startsWith(link.href.split("/").slice(0, 2).join("/")) ? "font-bold" : "font-semibold"}`}
            >
              {link.label}
            </Link>
          ))}
          <LogIn navBg={navBg} isMobile={false} />
        </div>
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger asChild>
            <button onClick={() => setNavBg(true)}>
              <ChevronDown
                className={`size-12 cursor-pointer lg:hidden ${open ? "hidden" : ""}`}
              />
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-75" />
            <Dialog.Content
              onInteractOutside={() => changeNavBg()}
              className="z-50 lg:hidden"
            >
              <div className="bg-card fixed top-16 w-full">
                <Dialog.Title className="m-3 flex flex-col gap-2">
                  <LogIn navBg={true} isMobile={true} />
                </Dialog.Title>
                <div className="bg-content flex flex-col gap-2 p-3">
                  {links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => {
                        setOpen(false);
                        changeNavBg();
                      }}
                      className={`hover:bg-navbar block w-full rounded-md py-1 pl-3 ${pathname.startsWith(link.href.split("/").slice(0, 2).join("/")) ? "font-bold" : "font-semibold"}`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
              <Dialog.Close asChild>
                <button onClick={() => changeNavBg()}>
                  <ChevronUp className="fixed top-2 right-6 z-50 size-12 cursor-pointer" />
                </button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </nav>
    </header>
  );
}
