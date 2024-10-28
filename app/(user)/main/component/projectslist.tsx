

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@clerk/clerk-react";
import toast, { Toaster } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectLists() {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [clerkID, setClerkID] = useState("");
  const { user } = useUser();
  const cleanUrl = url.endsWith("/") ? url.slice(0, -1) : url;
  const [items, setItems] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const finalUrl = `https://localhost:3000/chat/${cleanUrl}`;



  useEffect(() => {
    if (user?.id) {
      setClerkID(user.id);
    }
  }, [user]);

  useEffect(() => {
    if (clerkID) {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const data = await fetchProjects(clerkID);
          setItems(data); // Assuming the data matches the format required by HoverEffect
        } catch (error) {
          setError("No Project Found");
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, [clerkID]);

  const validateUrl = (value: string) => {
    try {
      new URL(value);
      return true;
    } catch (_) {
      return false;
    }
  };

  const fetchProjects = async (clerkID: string) => {
    const response = await fetch(`/api/projects?clerkID=${clerkID}`);
    if (!response.ok) {
      throw new Error("Failed to fetch projects");
    }
    return response.json();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !url || !description) {
      toast.error("All fields are required");
      setOpen(true);
      return;
    }

    if (!validateUrl(url)) {
      toast.error("Please enter a valid URL");
      setOpen(true);
      return;
    }

    const projectId = uuidv4();
    setOpen(false);

    const settings = {
      projectId,
      clerkID,
      name,
      url: finalUrl,
      description,
      time: new Date().toISOString(),
    };

    toast.promise(saveSettings(settings), {
      loading: "Creating AI Project...",
      success: <b>Project Created!</b>,
      error: <b>Server Not Responding.</b>,
    });
    
    fetchProjects(clerkID);
  };

  const saveSettings = async (settings: any) => {
    const response = await fetch("/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(settings),
    });

    if (!response.ok) {
      throw new Error("Failed to save");
    }

    fetchProjects(clerkID);
    return await response.json();
  };

  return (
    <div className="flex flex-row gap-3">
      <div className="bg-[#171717]">
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger>
            <div
              onClick={() => setOpen(true)}
              className="rounded-2xl h-[236px] w-[331px] ml-[10px] p-4 overflow-hidden bg-transparent border border-neutral-700 dark:border-white/[0.2] relative z-20 mb-1 cursor-pointer hover:bg-[#262626]"
            >
              <div className="flex flex-col items-center justify-center h-full w-full">
                <Plus size={34} className="text-3xl text-gray-500 mb-1" />
                <p className="text-gray-500">Create new AI Chat</p>
              </div>
            </div>
          </DrawerTrigger>

          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>Create a New AI Chat</DrawerTitle>
                <DrawerDescription>Provide Website URL For Chat.</DrawerDescription>
              </DrawerHeader>
              <div className="p-4 pb-0">
                <div className="flex flex-col items-center justify-center space-y-3">
                  <p className="self-start w-full">Name</p>
                  <Input
                    placeholder="Provide Website Title Name"
                    type="text"
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <br />
                <div className="flex flex-col items-center justify-center space-y-2">
                  <p className="self-start w-full">URL</p>
                  <Input
                    placeholder="Enter Website URL"
                    type="text"
                    required
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </div>
                <br />

                <div className="flex flex-col items-center justify-center space-y-2">
                  <p className="self-start w-full">Description</p>
                  <Textarea
                    placeholder="Provide Website Short Description"
                    maxLength={200}
                    required
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="mt-3 h-[30px]"></div>
              </div>
              <DrawerFooter>
                <Button onClick={handleSubmit}>Create</Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
        <div className="mt-2 mb-2 p-2">
          <p className="text-white">Recent Projects</p>
        </div>
        {error && <div className="text-red-500">{error}</div>}
        {isLoading ? (
          <div className="flex space-x-4 ml-[10px]">
            {/* First card */}
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[236px] w-[331px] rounded-xl" />
            </div>

            {/* Second card */}
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[236px] w-[331px] rounded-xl" />
            </div>

            {/* Third card */}
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[236px] w-[331px] rounded-xl" />
            </div>

            {/* Fourth card */}
            <div className="flex flex-col space-y-3">
              <Skeleton className="h-[236px] w-[331px] rounded-xl" />
            </div>
          </div>
        ) : (
          <HoverEffect items={items} />
        )}
      </div>
    </div>
  );
}
