import { Button } from "@/components/atoms/Button";
import { SidebarTrigger } from "@/components/atoms/sidebar";
import { Separator } from "@/components/ui/separator";

const HomePage = () => {
  const categories = [
    { name: "Sports" },
    { name: "Gaming" },
    { name: "IRL" },
    { name: "News" },
    { name: "AI" },
    { name: "New to you" },
    { name: "Tech" },
    { name: "Unboxing" },
    { name: "Politics" },
    { name: "Tech" },
    { name: "Unboxing" },
    { name: "Politics" },
    { name: "IRL" },
  ];
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4 ">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Button className="w-10 h-6 rounded dark:text-white text-black bg-[#e4e4e4] hover:bg-[#d4d4d4] dark:bg-white/13 dark:hover:bg-white/16 hover:cursor-pointer">
            All
          </Button>
          {categories.map((item, index) => (
            <Button
              key={index}
              variant={"outline"}
              className="h-6 rounded w-auto py-3 font-semibold dark:text-white/80 bg-[#e4e4e4] hover:bg-[#d4d4d4] dark:bg-white/13 dark:hover:bg-white/16 hover:cursor-pointer"
            >
              {item.name}
            </Button>
          ))}
        </div>
      </header>
    </>
  );
};

export default HomePage;
