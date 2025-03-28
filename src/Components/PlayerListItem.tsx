// hooks
import { useState } from "react";
import { useTournamentsAndQueuesContext } from "@/context/TournamentsAndQueuesContext";
import { useUser } from "@clerk/nextjs";
// import useAddToQueues from "@/hooks/useAddToQueues";
import useDragNDrop from "@/hooks/useDragNDrop";
import { useSocket } from "@/context/SocketContext";
// types
import { TPlayer } from "@/types/Types";
// components
import Button from "./Buttons/Button";
import TagsList from "./TagsList";
import EditListItem from "./EditListItem";
import StarItem from "./Buttons/StarItem";

export default function PlayerListItem({ item }: { item: TPlayer }) {
  const { tournamentOwner, currentTournament } = useTournamentsAndQueuesContext();
  const { socket } = useSocket();
  const { handleDragStart, handleDragOver } = useDragNDrop();
  // const {handleAddToShortestQueue} = useAddToQueues();
  const [editMode, setEditMode] = useState(false);

  const { isSignedIn } = useUser();

  const handleDelete = () => {
    // console.log("emitting deletePlayer");
    if (socket) {
      socket.emit("deletePlayer", {
        playerToDelete: item,
        tournamentId: currentTournament,
      });
    }
  };

  const editAndDeleteStyles =
    "h-[40px] w-[42px] px-[2px] py-[2px] text-[1rem] font-bold rounded text-shell-100 bg-brick-200 hover:bg-tennis-50 hover:text-shell-300 transition-colors duration-200 ease-in-out flex items-center justify-center";

  return (
    <>
      {!editMode ? (
        <li
          className="cursor-pointer h-auto w-[100%] px-3 py-2 bg-shell-75 rounded-lg shadow-left-bottom-lg flex flex-col justify-between items-center my-1"
          draggable={`${!tournamentOwner ? false : true}`}
          onDragStart={() => handleDragStart(item)}
          onDragOver={(e) => handleDragOver(e)}
        >
          {/* Player Name */}
          <div className="w-full flex justify-between">
            <div className="player-name font-bold text-lg w-[65%]">{item.names}</div>
            {!tournamentOwner ? null : (
              <Button
                onClick={() => {
                  console.log("clicked the button to see the item ", item);
                  if (socket)
                    socket.emit("addPlayerToShortestQ", {
                      message: "emitting add to shortes",
                      playerData: item,
                      tournamentId: currentTournament?._id,
                    });
                  // NOTE: optimistic UI
                  // handleAddToShortestQueue(item);
                }}
                className="px-1 py-1 text-[1rem] font-bold rounded text-shell-100 bg-brick-200 hover:bg-tennis-50 hover:text-shell-300 transition-colors duration-200 ease-in-out h-[auto] w-[45px] flex items-center justify-center"
              >
                ⬆️ Q
              </Button>
            )}
          </div>

          <TagsList item={item} />

          <div className="w-full flex justify-between">
            {!tournamentOwner ? null : (
              <div className="flex w-[45%] flex-row justify-between items-center h-full">
                <Button className={editAndDeleteStyles} onClick={() => setEditMode(true)}>
                  ✏️
                </Button>
                <Button className={editAndDeleteStyles} onClick={handleDelete}>
                  🗑️
                </Button>
              </div>
            )}
            {isSignedIn ? <StarItem playerId={item._id} /> : null}
          </div>
        </li>
      ) : (
        <EditListItem item={item} setEditMode={setEditMode} />
      )}
    </>
  );
}
