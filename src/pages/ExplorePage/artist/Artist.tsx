import { Avatar, Box, styled, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import ExploreLayout from "../../../layout/explore/ExploreLayout";
import { useGetArtistTopTracks } from "../../../hooks/useGetArtistTopTracks";
import { useParams } from "react-router";
import { useGetArtist } from "../../../hooks/useGetArtist";
import moment from "moment";

const ExploreArtist = () => {
  const { id } = useParams<{ id: string }>();
  const { data: artist } = useGetArtist({ id: id! });
  const { data: top_tracks } = useGetArtistTopTracks({ id: id! });

  return (
    <ExploreLayout>
      <>
        <AvartarImg src={artist?.images?.[0].url} />
        <Header>
          <Typography>아티스트</Typography>
          <Typography sx={{ fontSize: "4rem", fontWeight: 800 }}>{artist?.name}</Typography>
        </Header>
      </>
      <>
        <Typography variant="h1">인기</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Album</TableCell>
              <TableCell>Duration</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {top_tracks?.tracks.map((data: any, idx: number) => (
              <StyledTableRow key={idx}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <TrackImg src={data?.album?.images?.[0].url} />
                  {data.name}
                </TableCell>
                <TableCell>{data?.album?.name}</TableCell>
                <TableCell>{moment(data.duration_ms).format("mm:ss")} </TableCell>
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

const TrackImg = styled("img")({
  width: "50px",
  borderRadius: "10px",
});

export default ExploreArtist;
