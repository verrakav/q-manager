export default function TagsList({item}) {
  const list = item.categories.map((category, idx) => (
    <li
      key={idx}
      className="flex h-auto border-solid border-2 rounded border-shell-300 ml-4 mr-2 px-2 py-1 mx-1 my-1">
      {category}
    </li>
  ));
  return <ul className="flex flex-row flex-wrap item-center">{list}</ul>;
}