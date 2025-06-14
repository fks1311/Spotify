import { Typography } from "@mui/material";
import { ITrack } from "../../models/track";

interface SearchResultListProps {
  list: ITrack[];
}
const SearchResultList = ({ list }: SearchResultListProps) => {
  console.log(list);
  return (
    <div>
      {list.map((track) => (
        <Typography variant="h2">{track.name}</Typography>
      ))}
    </div>
  );
};

export default SearchResultList;
