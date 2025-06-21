import { Box, Button, styled, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import { ITrack } from "../../../models/track";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useAddItemToPlaylist } from "../../../hooks/useAddItemToPlaylist";
import { useParams } from "react-router";

// playlist 검색 결과 화면
interface SearchResultListProps {
  list: ITrack[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}
const SearchResultList = ({ list, hasNextPage, isFetchingNextPage, fetchNextPage }: SearchResultListProps) => {
  const { ref, inView } = useInView();
  const { mutate: addItem } = useAddItemToPlaylist();
  const { id } = useParams<{ id: string }>();

  if (!list || list.length === 0) return null;

  // const isTrackList = list.length > 0 && "album" in list[0] && "artists" in list[0];
  const isTrackList = list.length > 0 && list[0] != null && "album" in list[0] && "artists" in list[0];

  if (!isTrackList) return null;

  const handleAddItemtoPlaylist = (item: ITrack) => {
    if (id) {
      addItem({ playlist_id: id, uris: [`spotify:track:${item.id}`] });
    }
  };

  // 무한 로딩
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  return (
    <Box sx={{ padding: "0 2rem" }}>
      <Table>
        <TableBody>
          {list.map((item: ITrack) => (
            <StyledTableRow key={item.id}>
              <TableCell style={{ width: "720px" }}>
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
              <TableCell style={{ width: "685px" }}>{item.album?.name}</TableCell>
              <TableCell style={{ width: "130px", display: "flex", justifyContent: "flex-end" }}>
                <Button onClick={() => handleAddItemtoPlaylist(item)}>Add</Button>
                <Button>
                  <MoreHorizIcon />
                </Button>
              </TableCell>
            </StyledTableRow>
          ))}
          <StyledTableRow sx={{ height: "5px" }} ref={ref}>
            <TableCell>{isFetchingNextPage && "Loading more..."}</TableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </Box>
  );
};

const StyledTableRow = styled(TableRow)(({ theme }) => ({
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
