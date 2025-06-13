import PlaylistItem from "../../components/playlist/PlaylistItem";
import { useGetCurrentUserPlaylists } from "../../hooks/useGetCurrentUserPlaylists";
import EmptyPlaylist from "./EmptyPlaylist";

const Library = () => {
  const { data } = useGetCurrentUserPlaylists({ limit: 10, offset: 0 });

  return <>{!data || data?.total === 0 ? <EmptyPlaylist /> : <PlaylistItem items={data.items} />}</>;
};

export default Library;
