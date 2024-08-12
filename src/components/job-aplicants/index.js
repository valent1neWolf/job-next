"use client";

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
import { ScrollArea } from "@radix-ui/react-scroll-area";
import CandidateList from "../candidate-list";
import "../component_style.css";

export default function JobAplicants({
  showApplicantsDrawer,
  setShowApplicantsDrawer,
  showCurrentCandidateDetails,
  setShowCurrentCandidateDetails,
  currentCandidateDetails,
  setCurrentCandidateDetails,
  applicationList,
  job,
  drawerHeight,
}) {
  return (
    <Drawer open={showApplicantsDrawer} onOpenChange={setShowApplicantsDrawer}>
      <DrawerContent>
        <ScrollArea
          style={{ maxHeight: `${drawerHeight}px` }}
          className="overflow-scroll"
        >
          <DrawerHeader>
            <DrawerTitle>Applicants</DrawerTitle>
          </DrawerHeader>
          <DrawerFooter>
            <CandidateList
              currentCandidateDetails={currentCandidateDetails}
              setCurrentCandidateDetails={setCurrentCandidateDetails}
              applicationList={applicationList}
              showCurrentCandidateDetails={showCurrentCandidateDetails}
              setShowCurrentCandidateDetails={setShowCurrentCandidateDetails}
              job={job}
            />
          </DrawerFooter>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}
