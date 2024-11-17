import useDragNDrop from "@/hooks/useDragNDrop";
import Player from "@/types/Player";
import TagsList from "../TagsList";

export default function QueueListItem({
  item,
  className
}: {
  item: Player;
  className: string;
  queueId: string;
  index: number;
}) {
  const {handleDragStart, handleDragOver} = useDragNDrop();

  return (
    <div
      key={item._id}
      id={item._id}
      className={`p-2 shadow-left-bottom-lg w-[95%] left-bottom-lg rounded-lg mb-2 text-center ${className}`}
      draggable
      onDragStart={() => handleDragStart(item)}
      onDragOver={e => handleDragOver(e)}>
      <div className="player-name">{item.names}</div>

      <TagsList item={item} />
    </div>
  );
}