import { useFishInfo } from "../hooks/useFishInfo";

function FishInfoList() {
  const { fishInfo, loading, error } = useFishInfo();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading fish info.</p>;

  return (
    <ul>
      {fishInfo.map((fish) => (
        <li key={fish._id}>
          <strong>{fish.batch}</strong> ({fish.type})<br />
          Born: {fish.born}
          <br />
          {fish.photo && (
            <img
              src={`http://localhost:5001${fish.photo}`}
              alt="fish"
              width="150"
            />
          )}
        </li>
      ))}
    </ul>
  );
}

export default FishInfoList;
