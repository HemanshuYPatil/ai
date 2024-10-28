"use client";

import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../../../components/ui/sidebar";
import { IconArrowLeft, IconBrandTabler, IconSettings, IconUserBolt } from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { UserButton, useUser } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/dist/server/api-utils";
import Setting from "./settings/page";
import Dashboard from "./projects/page";

export default function SidebarDemo() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const links = [
    {
      label: "Projects",
      href: "#",
      icon: <IconBrandTabler className="text-neutral-200 h-5 w-5 flex-shrink-0" />,
      onClick: () => {
        setActiveTab("dashboard");
      },
    },
    {
      label: "Settings",
      href: "#",
      icon: <IconSettings className="text-neutral-200 h-5 w-5 flex-shrink-0" />,
      onClick: () => {
        setActiveTab("settings");
      },
    },
  ];
  const [open, setOpen] = useState(false);

  const { user, isSignedIn } = useUser();

  if (!isSignedIn) {
    return null;
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "settings":
        return <Setting />;
      default:
        return <Dashboard />;
    }
  };
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-neutral-800 w-full flex-1 max-w-full mx-auto border border-neutral-700 overflow-hidden",
        "h-screen  w-screen m-0 ",
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <div key={idx} onClick={link.onClick} className="cursor-pointer">
                  <SidebarLink link={link} />
                </div>
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: `${user.firstName ?? ""} ${user.lastName ?? ""}`,
                href: "#",
                icon: <UserButton />,
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      {/* <Dashboard /> */}
      <div className="flex flex-1">
        <div className="p-2 md:p-10 rounded-tl-2xl  bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal  flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      {/* <Image src="/logo.svg" alt="AI logo" width={80} height={80} /> */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-white whitespace-pre"
      >
        Astra AI
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};

// Dummy dashboard component with content

