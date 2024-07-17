"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { AlignJustify } from "lucide-react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Label } from "@/components/ui/label";
export default function Header({ user, profileInfo }) {
  const menuItems = [
    {
      icon: "/house.svg",
      label: "Home",
      path: "/",
      show: true,
    },
    {
      label: "Login",
      path: "/sign-in",
      show: !user,
    },
    {
      label: "Register",
      path: "/sign-up",
      show: !user,
    },

    {
      label: "Activity",
      path: "/activity",
      show: profileInfo?.role === "candidate",
    },
    {
      icon: "/briefcase.svg",
      label: "Jobs",
      path: "/jobs",
      show: user,
    },
    {
      icon: "star.svg",
      label: "Premium",
      path: "/membership",
      show: user,
    },
    {
      icon: "/bookmark.svg",
      label: "Account",
      path: "/account",
      show: user,
    },
  ];
  return (
    <div className="shadow-md">
      <header className="flex h-16 w-full shrink-0 items-center">
        <Sheet>
          <SheetTrigger asChild>
            {/* meg kell adni  az asChild propot, hogy a SheetTrigger komponens gyermekei megjelenjenek   */}
            <Button variant="outline" className="border-none lg:hidden">
              <AlignJustify className="h-6 w-6" />
              <span className="sr-only">Toggle Navigation </span>
              {/* csak felolvasásra szolgáló szöveg */}
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <Link className="mr-6 hidden lg:flex" href="#">
              <h3>KONDOR</h3>
            </Link>
            <div className="grid gap-2 py-6">
              <UserButton />
              {menuItems.map((item) =>
                item.show ? (
                  <Link
                    href={item.path}
                    key={item.label}
                    className="flex w-full items-center py-2 text-lg font-semibold"
                  >
                    {item.label}{" "}
                  </Link>
                ) : null
              )}
            </div>
          </SheetContent>
        </Sheet>
        <Link className="hidden lg:flex mr-6 pl-4" href={"/"}>
          <img src="/images/kondor-vector.png" alt="logo" className="h-6 " />
        </Link>
        <nav className="ml-auto  hidden lg:flex gap-4 mr-5">
          {menuItems.map((item) =>
            item.show ? (
              <Link
                href={item.path}
                key={item.label}
                className="flex w-full items-center px-2 text-lg font-semibold rounded-md"
              >
                <div className="flex flex-col justify-center items-center mt-2">
                  <img src={item?.icon} className="h-5" />
                  <p className="text-xs font-normal pt-1">{item.label} </p>
                </div>
              </Link>
            ) : null
          )}
          <div className=" flex justify-center ">
            <div className="mt-2 flex flex-col justify-center items-center">
              <UserButton
                id="me"
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-5 h-5",
                  },
                }}
              ></UserButton>
              {user ? (
                <Label htmlFor="me" className="text-xs  pt-1">
                  Profile
                </Label>
              ) : null}
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
