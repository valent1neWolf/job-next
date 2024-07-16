import { Button } from "../ui/button";
import { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function JobCards({
  jobs,
  hovered,
  setHovered,
  isLoading,
  setIsLoading,
}) {
  useEffect(() => {
    setIsLoading(false);
  }, [jobs]);

  function capitalize(s) {
    return s[0].toUpperCase() + s.slice(1);
  }

  function handleCreationTime(time) {
    if (!time) return;

    const creationDate = new Date(time);
    const currentDate = new Date();
    const yesterday = new Date(); //muszáj megadni, hogy aztán tudjuk módosítani
    yesterday.setDate(currentDate.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    const creationDateMidnight = new Date(creationDate); //mivel napokat hasonlítunk össze ezért kell, hogy 0:00-ra állítsuk az időt
    creationDateMidnight.setHours(0, 0, 0, 0);

    // ma volt létrehozva
    if (creationDateMidnight.getTime() === new Date().setHours(0, 0, 0, 0)) {
      return `Today ${creationDate.toLocaleTimeString("en-UK", {
        hour: "2-digit", //2-digit: 0-23-as formátumban jeleníti meg az órát
        minute: "2-digit", //2-digit: 0-59-es formátumban jeleníti meg a percet
      })}`;
    }
    // tegnap volt létrehozva
    else if (creationDateMidnight.getTime() === yesterday.getTime()) {
      return `Yesterday ${creationDate.toLocaleTimeString("en-UK", {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    }
    // legalább tegnap előtt volt létrehozva
    else {
      return creationDate.toLocaleDateString("en-UK", {
        month: "long",
        day: "numeric",
      });
    }
  }

  return (
    <div className={`${isLoading ? "hidden" : ""}`}>
      {jobs.map((job) => (
        <div
          key={job?._id}
          className="bg-gray-100 p-2 rounded-md mt-3 relative"
        >
          <div className="absolute top-0 right-0 p-2">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-three-dots-vertical"
                  viewBox="0 0 16 16"
                >
                  <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                </svg>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mr-12">
                <DropdownMenuItem>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div>
            <h1 className=" font-bold  text-xl">{capitalize(job?.title)}</h1>
            <p className="flex items-center pt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                fill="currentColor"
                className="mr-2"
                viewBox="0 0 16 16"
              >
                <path d="M4 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z" />
                <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1zm11 0H3v14h3v-2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h3z" />
              </svg>
              {job?.companyName}
            </p>
            <p className="flex items-center pt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                fill="currentColor"
                className="mr-2"
                viewBox="0 0 16 16"
              >
                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
              </svg>
              {job?.location}
            </p>
            <div className="flex items-baseline justify-between">
              <div className="flex items-center gap-3">
                <Button className="mt-2 px-6">View Job</Button>
                <Button
                  className="mt-2 bg-transparent border border-black"
                  onMouseEnter={() => setHovered(job._id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {hovered === job?._id ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="text-black "
                      viewBox="0 0 16 16"
                    >
                      <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
                    </svg>
                  )}
                </Button>
              </div>
              <div>
                <p className="text-sm ">{handleCreationTime(job?.createdAt)}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
