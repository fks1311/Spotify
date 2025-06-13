import { LoadingSpinner } from "../../components/LoadingSpinner";
import PlaylistItem from "../../components/playlist/PlaylistItem";
import { useGetCurrentUserPlaylists } from "../../hooks/useGetCurrentUserPlaylists";
import { getLocalStorageSafe } from "../../utils/localStorage";
import EmptyPlaylist from "./EmptyPlaylist";

const Library = () => {
  const accessToken = getLocalStorageSafe("access_token");
  const { isLoading, data } = useGetCurrentUserPlaylists({ limit: 10, offset: 0 });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return <>{!accessToken || !data || data?.total === 0 ? <EmptyPlaylist /> : <PlaylistItem items={data.items} />}</>;
};

export default Library;
