"use client"

import Link from "next/link";
import Image from "next/image";

import { ProfileDropdown } from "@/components/profile-dropdown";
import { FeedbackModalTrigger } from "@/components/modals/feedback-modal";
import { Button } from "./ui/button";
import { SignInButton, SignedOut } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

export const Header = async () => {

  const pathname = usePathname(); 
  
  const noHeaderRoutes = ["/sign-in", "/sign-up","/main"]; 

  const isNoHeaderRoute = noHeaderRoutes.includes(pathname);
  
  return (
    <>
    {!isNoHeaderRoute && (
      <header className="sticky inset-x-0 top-0 z-20 w-full backdrop-blur-2xl">
        <nav className="animate_in mx-auto max-w-[1440px] h-16 px-4 sm:px-12 md:px-24 lg:px-28 flex items-center justify-between">
          <Link href="/">
            <Image src="/logo.svg" alt="AI logo" width={80} height={80} />
          </Link>
          <div className="flex items-center gap-1 sm:gap-2 md:gap-4 p-2">
            <SignedOut>
              <Button
                size="sm"
                variant="ghost"
                className="bg-transparent hover:bg-transparent text-zinc-200 hover:text-white"
              >
                <SignInButton />
              </Button>
            </SignedOut>
            <Link href="/pricing">
              <Button
                size="sm"
                variant="ghost"
                className="bg-transparent hover:bg-transparent text-zinc-200 hover:text-white"
              >
                Pricing
              </Button>
            </Link>
            <FeedbackModalTrigger />
          </div>
        </nav>
      </header>
    )}
  </>
  );
};
