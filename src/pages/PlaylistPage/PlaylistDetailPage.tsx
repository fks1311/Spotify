import { Navigate, useParams } from "react-router";
import { useGetPlaylist } from "../../hooks/useGetPlaylist";
import { PlaylistDetailLayout } from "../../layout/playlist/PlaylistDetailLayout";
import EmptyPlaylistWithSearch from "../../layout/playlist/EmptyPlaylistWithSearch";
import PlaylistTrackList from "../../layout/playlist/PlaylistTrackList";

// playlistpage
const PlaylistDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  if (id === undefined) return <Navigate to="/" />;

  const {
    data: playlist,
    isLoading: isPlaylistLoading,
    isError: playlistIsError,
    error: playlistError,
  } = useGetPlaylist({ playlist_id: id });

  return (
    <PlaylistDetailLayout playlist={playlist!}>
      {playlist?.tracks?.total === 0 ? <EmptyPlaylistWithSearch id={id} /> : <PlaylistTrackList id={id} />}
    </PlaylistDetailLayout>
  );
};

export default PlaylistDetailPage;
