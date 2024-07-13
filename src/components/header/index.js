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
export default function Header({ user, profileInfo }) {
  const menuItems = [
    {
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
      label: "Jobs",
      path: "/jobs",
      show: user,
    },
    {
      label: "Membership",
      path: "/membership",
      show: user,
    },
    {
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
              <h3>JOBSCO</h3>
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
          JOBSCO
        </Link>
        <nav className="ml-auto  hidden lg:flex gap-6">
          {menuItems.map((item) =>
            item.show ? (
              <Link
                href={item.path}
                key={item.label}
                className="flex w-full items-center px-2 text-lg font-semibold rounded-md"
              >
                {item.label}{" "}
              </Link>
            ) : null
          )}
          <div className="pr-4 flex items-center">
            <UserButton />
          </div>
        </nav>
      </header>
    </div>
  );
}
