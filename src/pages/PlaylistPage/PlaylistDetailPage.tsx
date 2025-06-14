import {
  Avatar,
  Box,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useGetPlaylist } from "../../hooks/useGetPlaylist";
import { Navigate, useParams } from "react-router";
import { useGetPlaylistItems } from "../../hooks/useGetPlaylistItems";
import DesktopPlaylistItem from "../../components/playlist/DesktopPlaylistItem";
import { PAGE_LIMIT } from "../../configs/commonConfig";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useGetCurrentUserProfile } from "../../hooks/useGetCurrentUserProfile";
import LoginButton from "../../components/LoginButton";
import EmptyPlaylistWithSearch from "../../components/playlist/EmptyPlaylistWithSearch";

const PlaylistDetailPage = () => {
  const { ref, inView } = useInView({
    threshold: 0.1, // 약간이라도 보이면 감지
  });
  const { id } = useParams<{ id: string }>();
  if (id === undefined) return <Navigate to="/" />;
  const { data: user } = useGetCurrentUserProfile();
  const {
    data: playlist,
    isLoading: isPlaylistLoading,
    isError: playlistIsError,
    error: playlistError,
  } = useGetPlaylist({ playlist_id: id });
  const {
    data: playlistItems,
    isLoading: isPlaylistItemsLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isError: playlistItemsError,
  } = useGetPlaylistItems({ playlist_id: id, limit: PAGE_LIMIT, offset: 0 });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  return (
    <StyledTableContainer>
      {!user ? (
        <ReqLoginBox>
          <Typography variant="h2" fontWeight={700} mb="20px">
            다시 로그인 하세요
          </Typography>
          <LoginButton />
        </ReqLoginBox>
      ) : (
        <>
          <PlaylistHeader>
            <LargeAvarta src={playlist?.images?.[0]?.url} variant="rounded" />
            <div>
              <LargeTypography>{playlist?.name}</LargeTypography>
              <Typography variant="h1">{playlist?.owner?.display_name}</Typography>
            </div>
          </PlaylistHeader>
          {playlist?.tracks?.total === 0 ? (
            <EmptyPlaylistWithSearch />
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Album</TableCell>
                  <TableCell>Date added</TableCell>
                  <TableCell>Duration</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {playlistItems?.pages.map((page, pageIdx) =>
                  page.items.map((item, index) => {
                    return <DesktopPlaylistItem item={item} key={index} index={pageIdx * PAGE_LIMIT + index + 1} />;
                  })
                )}
                <TableRow sx={{ height: "5px" }} ref={ref}>
                  <TableCell>{isFetchingNextPage && "Loading more..."}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          )}
        </>
      )}
    </StyledTableContainer>
  );
};

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  background: theme.palette.background.paper,
  color: theme.palette.common.white,
  height: "calc(100% - 64px)",
  borderRadius: "8px",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  msOverflowStyle: "none", // IE and Edge
  scrollbarWidth: "none", // Firefox
}));

const PlaylistHeader = styled(Box)({
  display: "flex",
  gap: `1rem`,
  width: "100%",
  padding: "1rem",
});
const LargeAvarta = styled(Avatar)({
  width: 200,
  height: 200,
  borderRadius: 8,
});
const LargeTypography = styled(Typography)({
  fontSize: `3.5rem`,
});

const ReqLoginBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
});

export default PlaylistDetailPage;
