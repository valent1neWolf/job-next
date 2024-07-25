import { Button } from "../ui/button";
import { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteJob } from "@/actions";
import { useRouter } from "next/navigation";
export default function JobCards({
  jobs,
  hovered,
  setHovered,
  isLoading,
  setIsLoading,
  choosenFilters,
  user,
  jobToDelete,
  setJobToDelete,
  setJobs,
  profileInfo,
}) {
  // console.log("user at card", user?.id);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(false);
  }, [jobs]);

  const noJobsFound = choosenFilters.some((filter) => filter.content.length);
  // console.log(noJobsFound, "noJobsFound");

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

  async function deleteJobAction(id) {
    console.log("deleting job", id);
    await deleteJob(id);
    // lehet, hogy ezt nem szabadna csinálni, de legalább látszatra megoldja a problémát (más megoldás nem jut eszembe)
    setJobs((currentJobs) => currentJobs.filter((job) => job._id !== id));
  }

  return (
    <div className={`${isLoading ? "hidden" : ""}`}>
      {jobs && jobs.length > 0 && !isLoading ? (
        jobs.map((job) => (
          <div
            key={job?._id}
            className="bg-gray-100 p-2 rounded-md mt-3 relative"
          >
            {user?.id === job.recruiterId && (
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
                    <DropdownMenuItem
                      onClick={() => {
                        deleteJobAction(job._id);
                      }}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
            <div>
              <h1 className=" font-bold  text-xl">{capitalize(job?.title)}</h1>
              <p className="flex items-center pt-1">
                <img src="/building.svg" alt="building-svg" className="mr-2" />
                {job?.companyName}
              </p>
              <p className="flex items-center pt-1">
                <img src="/location.svg" alt="location-svg" className="mr-2" />
                {job?.location}
              </p>
              <div className="flex items-baseline justify-between">
                <div className="flex items-center gap-3">
                  <Button
                    className="mt-2 px-6"
                    onClick={() => window.open(`/jobs/${job._id}`)}
                  >
                    View <span className="hidden md:inline">&#8203; Job</span>
                  </Button>
                  {profileInfo?.role === "candidate" && (
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
                  )}
                </div>
                <div>
                  <p className="text-sm ">
                    {handleCreationTime(job?.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : noJobsFound ? (
        <div className="text-center mt-4">
          <p>No jobs found</p>
        </div>
      ) : null}
    </div>
  );
}
