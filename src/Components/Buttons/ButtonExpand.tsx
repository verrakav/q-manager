import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {faMinus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function ButtonExpand({onClick, isExpanded}) {
  return (
    <button>
      <FontAwesomeIcon icon={isExpanded ? faMinus : faPlus} onClick={onClick} />
    </button>
  );
}