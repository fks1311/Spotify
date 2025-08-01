import { useQuery } from "@tanstack/react-query";
import { getPlaylist } from "../apis/playlistApi";
import { GetPlaylistRequest } from "../models/playlist";

export const useGetPlaylist = (params: GetPlaylistRequest) => {
  return useQuery({
    queryKey: ["playlist-detail", params.playlist_id],
    queryFn: () => {
      return getPlaylist(params);
    },
    enabled: !!params.playlist_id,
    retry: 1,
  });
};
