import { Avatar, Box, styled, Typography } from "@mui/material";
import { useGetPlaylist } from "../../hooks/useGetPlaylist";
import { Navigate, useParams } from "react-router";
import { useGetPlaylistItems } from "../../hooks/useGetPlaylistItems";

const PlaylistDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  if (id === undefined) return <Navigate to="/" />;
  const { data: playlist, isLoading: isPlaylistLoading } = useGetPlaylist({ playlist_id: id });
  const {
    data: playlistItems,
    isLoading: isPlaylistItemsLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetPlaylistItems({ playlist_id: id, limit: 10, offset: 0 });
  console.log(playlistItems);

  return (
    <Container>
      <PlaylistHeader>
        <LargeAvarta src={playlist?.images?.[0]?.url} variant="rounded" />
        <div>
          <LargeTypography>{playlist?.name}</LargeTypography>
          <Typography variant="h1">{playlist?.owner?.display_name}</Typography>
        </div>
      </PlaylistHeader>
    </Container>
  );
};

const Container = styled("div")({});
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
export default PlaylistDetailPage;
