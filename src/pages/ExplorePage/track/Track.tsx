import { useParams } from "react-router";
import { useGetTracks } from "../../../hooks/useGetTracks";
import ExploreLayout from "../../../layout/explore/ExploreLayout";
import { Avatar, styled, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useGetAlbumTracks } from "../../../hooks/useGetAlbumTracks";
import moment from "moment";
import { useEffect } from "react";

const Track = () => {
  const { id } = useParams<{ id: string }>();
  const { data: tracks } = useGetTracks(id!);
  const album_id = tracks?.album?.id;
  const {
    data: albums,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetAlbumTracks({
    id: album_id,
  });

  useEffect(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage]);

  const allTracks = albums?.pages.flatMap((page) => page.items);

  return (
    <ExploreLayout>
      <>
        <AvartarImg src={tracks?.album?.images?.[0].url} />
        <Header>
          <Typography>곡</Typography>
          <Typography sx={{ fontSize: "4rem", fontWeight: 800 }}>{tracks?.name}</Typography>
          <Typography>
            {tracks?.artists?.[0]?.name} • {tracks?.album?.name} • {tracks?.album?.release_date} •{" "}
            {tracks?.album?.album_type}
          </Typography>
        </Header>
      </>
      <>
        <Typography variant="h1">{tracks?.album?.name} 앨범 트랙리스트</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Duration</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allTracks?.map((track, idx) => (
              <StyledTableRow key={idx}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{track.name}</TableCell>
                <TableCell>{moment(track.duration_ms).format("mm:ss")} </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </>
    </ExploreLayout>
  );
};

const AvartarImg = styled(Avatar)({
  width: 250,
  height: 250,
  borderRadius: 8,
});
const Header = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "0.6rem",
});

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    cursor: "pointer",
  },
  "& .MuiTableCell-root": {
    borderBottom: "none",
  },
}));

export default Track;
