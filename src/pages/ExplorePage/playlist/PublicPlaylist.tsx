import { useParams } from "react-router";
import ExploreLayout from "../../../layout/explore/ExploreLayout";
import { useGetPublicUserPlaylistsItems } from "../../../hooks/useGetPublicUserPlaylistsItems";
import { PAGE_LIMIT } from "../../../configs/commonConfig";
import { useGetPublicPlaylist } from "../../../hooks/useGetPublicPlaylist";
import { Avatar, styled, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { ITrack } from "../../../models/track";
import moment from "moment";
import { LoadingSpinner } from "../../../common/components/LoadingSpinner";

const PublicPlaylist = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useGetPublicPlaylist({ playlist_id: id! });
  const {
    data: playlist,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isError,
  } = useGetPublicUserPlaylistsItems({
    playlist_id: id!,
    limit: PAGE_LIMIT,
    offset: 0,
  });
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  if (isLoading) return <LoadingSpinner />;

  const allCategories = playlist?.pages?.flatMap((page) => page?.items ?? []);

  return (
    <ExploreLayout>
      <>
        <AvartarImg src={data?.images?.[0].url} />
        <Header>
          <Typography>{data?.public ? `공개` : `비공개`} 플레이리스트</Typography>
          <Typography sx={{ fontSize: "4rem", fontWeight: 800 }}>{data?.name}</Typography>
          <Typography>소유주 : {data?.owner?.display_name}</Typography>
        </Header>
      </>
      <>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Artist</TableCell>
              <TableCell>Album</TableCell>
              <TableCell>Duration</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allCategories?.map((data, idx) => {
              return (
                <StyledTableRow key={idx}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{data?.track?.name}</TableCell>
                  <TableCell>{(data?.track as ITrack)?.artists?.[0].name}</TableCell>
                  <TableCell>{(data?.track as ITrack)?.album?.name}</TableCell>
                  <TableCell>{moment(data?.track?.duration_ms).format("mm:ss")}</TableCell>
                </StyledTableRow>
              );
            })}
            <StyledTableRow>
              <TableCell ref={ref}>{isFetchingNextPage && "Loading more..."}</TableCell>
            </StyledTableRow>
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
  },
  "& .MuiTableCell-root": {
    borderBottom: "none",
  },
}));

export default PublicPlaylist;
