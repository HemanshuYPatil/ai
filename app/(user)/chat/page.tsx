import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import Chat from "./_components";
import { auth } from "@clerk/nextjs/server";
import { RedirectToSignIn } from "@clerk/nextjs";

export const metadata = {
  title: "Chat",
  description: "Chat with the AI.",
};

export default async function ChatPage() {

  const { userId } = auth();

  // if (!userId) {
  //   console.log('Not Found')
  //   return redirect('/');
  // }


  return <Chat />;
}
