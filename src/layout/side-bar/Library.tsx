import { styled } from "@mui/material";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import PlaylistItem from "../../components/playlist/PlaylistItem";
import { useGetCurrentUserPlaylists } from "../../hooks/useGetCurrentUserPlaylists";
import { getLocalStorageSafe } from "../../utils/localStorage";
import EmptyPlaylist from "./EmptyPlaylist";

const Library = () => {
  const accessToken = getLocalStorageSafe("access_token");
  const { isLoading, data } = useGetCurrentUserPlaylists({ limit: 50, offset: 0 });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Container>
      {!accessToken || !data || data?.total === 0 ? <EmptyPlaylist /> : <PlaylistItem items={data.items} />}
    </Container>
  );
};

const Container = styled("div")({
  height: "100%",
  overflowY: "auto",
  maxHeight: "calc(100vh - 240px)",
  "&::-webkit-scrollbar": {
    display: "none",
  },
});
export default Library;
