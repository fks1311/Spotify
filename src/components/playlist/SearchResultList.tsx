import { Box, Button, styled, TableCell, TableRow, Typography } from "@mui/material";
import { ITrack } from "../../models/track";

interface SearchResultListProps {
  list: ITrack[];
}
const SearchResultList = ({ list }: SearchResultListProps) => {
  if (!list || list.length === 0) return null;

  // const isTrackList = list.length > 0 && "album" in list[0] && "artists" in list[0];
  const isTrackList = list.length > 0 && list[0] != null && "album" in list[0] && "artists" in list[0];

  if (!isTrackList) return null;

  return (
    <div>
      {list.map((item: any) => (
        <StyledTableRow key={item.id}>
          <TableCell>
            <Box display="flex" alignItems="center">
              <Box>
                <AlbumImage src={item.album?.images?.[0]?.url} width="40px" />
              </Box>
              <Box>
                <Typography fontWeight={700}>{item.name}</Typography>
                <Typography color="text.secondary">{item.artists?.[0]?.name ?? "Unknown Artist"}</Typography>
              </Box>
            </Box>
          </TableCell>
          <TableCell>{item.album?.name}</TableCell>
          <TableCell>
            <Button>Add</Button>
          </TableCell>
        </StyledTableRow>
      ))}
    </div>
  );
};

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  width: "100%",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "& .MuiTableCell-root": {
    borderBottom: "none",
  },
}));
const AlbumImage = styled("img")({
  borderRadius: "4px",
  marginRight: "12px",
});

export default SearchResultList;
