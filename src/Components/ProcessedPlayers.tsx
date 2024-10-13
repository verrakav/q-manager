import Button from "./Button";
// types
import Player from "@/types/Player";
import QueueType from "@/types/Queue";

export default function ProcessedPlayers({
  players,
  addItemToShortestQueue
}: {
  players: Player[];
  addItemToShortestQueue: (id: string) => QueueType[];
}) {
  const processedPlayers = players.filter(player => {
    return player.processedThroughQueue;
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {processedPlayers.map((player: Player) => (
        <div
          key={player.id}
          className="bg-blue-400 h-30 p-4 rounded-lg shadow-md flex flex-col justify-between">
          <span className="text-white font-bold">{player.names}</span>

          {!player.assignedToQueue && (
            <Button
              onClick={() => addItemToShortestQueue(player.id)}
              className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition-colors duration-200 ease-in-out">
              Add to Shortest Queue
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}