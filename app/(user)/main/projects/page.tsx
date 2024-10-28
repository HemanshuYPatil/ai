import { useForm, Controller } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import ProjectLists from "../component/projectslist";

export default function Dashboard() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  return (
    <div className="flex flex-1 overflow-auto">
      <div className=" rounded-2xl  bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        <div className="relative w-[40%]">
          <Input
            className="w-full bg-transparent border border-neutral-700 pl-10" // Add padding-left to make space for the icon
            type="email"
            placeholder="Search Here"
          />
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-700" />
        </div>
          <div className="mt-4"><ProjectLists /></div>
      </div>
    </div>
  );
}
