import React, {useState} from "react";
import QueuesGrid from "./QueuesGrid";
import QueuesGridMini from "./QueuesGridMini";
import SectionHeader from "../SectionHeader";
import Button from "../Buttons/Button";
import {useAppContext} from "@/context/QueuesContext";
import {useRouteContext} from "@/context/RouteContext";

export default function QueuesContainer() {
  const [showAlternateView, setShowAlternateView] = useState(false);
  const {addMoreQueues, queues} = useAppContext();
  const {isGuest} = useRouteContext();

  return (
    <div className="p-2">
      <SectionHeader>Queues</SectionHeader>

      <Button
        onClick={() => setShowAlternateView(!showAlternateView)}
        className="mb-4 mx-4 p-2 bg-blue-500 text-white font-bold rounded">
        {showAlternateView ? "Show Detailed View" : "Show Grid View"}
      </Button>
      {isGuest ? null : (
        <Button
          onClick={() => addMoreQueues(queues)}
          className="mb-4 p-2 bg-red-500 text-white font-bold rounded">
          Add more queues
        </Button>
      )}
      {showAlternateView ? <QueuesGridMini /> : <QueuesGrid />}
    </div>
  );
}