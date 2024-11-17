"use client";

import {useState} from "react";
import SectionHeader from "@/components/SectionHeader";
import NewPlayerForm from "@/components/Forms/NewPlayerForm";
import PlayersList from "@/components/PlayersList";
import QueuesContainer from "@/components/Queue/QueuesContainer";
import ProcessedPlayers from "@/components/ProcessedPlayers";
import ButtonGroup from "@/components/Buttons/ButtonGroup";
import {RouteProvider} from "@/context/RouteContext";
import {QueuesProvider} from "@/context/QueuesContext";

export default function QueuesPage() {
  //   const {isGuest} = useRouteContext();

  const [visibleSection, setVisibleSection] = useState("queues");

  return (
    <>
      <QueuesProvider>
        <RouteProvider>
          {/* Mobile toggle button group */}
          <div className="lg:hidden flex justify-around my-4">
            <button
              onClick={() => setVisibleSection("queues")}
              className="p-2 bg-sky-200 rounded">
              Queues
            </button>
            <button
              onClick={() => setVisibleSection("unprocessed")}
              className="p-2 bg-sky-200 rounded">
              Unprocessed
            </button>
            <button
              onClick={() => setVisibleSection("processed")}
              className="p-2 bg-sky-200 rounded">
              Processed
            </button>
          </div>

          <div className="flex flex-col lg:flex-row justify-around">
            {/* Section for adding players and viewing unprocessed list */}
            <div
              className={`p-2 w-full lg:w-1/4 ${
                visibleSection === "unprocessed" ? "block" : "hidden lg:block"
              }`}>
              <NewPlayerForm />
              <PlayersList />
            </div>

            {/* Queues section is the main focus */}
            <div
              className={`p-2 w-full lg:w-2/4 ${
                visibleSection === "queues" ? "block" : "hidden lg:block"
              }`}>
              {/* <SectionHeader>Queues</SectionHeader> */}
              <QueuesContainer />
            </div>

            {/* Processed players section */}
            <div
              className={`p-2 w-full lg:w-1/4 ${
                visibleSection === "processed" ? "block" : "hidden lg:block"
              }`}>
              {/* <SectionHeader>Button Group</SectionHeader> */}
              <ButtonGroup />
              <SectionHeader>Processed Players</SectionHeader>
              <ProcessedPlayers />
            </div>
          </div>
        </RouteProvider>
      </QueuesProvider>
    </>
  );
}