"use client";
// context
import { useTournamentsAndQueuesContext } from "@/context/TournamentsAndQueuesContext";
// types
import { TQueue } from "@/types/Types";
// components
import Queue from "./Queue";
import React from "react";
import NewQueueForm from "../Forms/NewQueueForm";

export default function QueuesGrid() {
  const { currentTournament } = useTournamentsAndQueuesContext();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {currentTournament?.queues.map((queue: TQueue, index: number) => (
        <Queue key={queue._id} queue={queue} index={index} />
      ))}
      <NewQueueForm
      // className={
      //   "rounded-lg shadow-left-bottom-lg p-2 flex flex-col border-3 border-grey-300"
      // }
      />
    </div>
  );
}
