import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UnfollowPlaylist } from "../apis/playlistApi";
import { UnfollowPlaylistRequest } from "../models/playlist";

export const useUnfollowPlaylist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: UnfollowPlaylistRequest) => {
      return UnfollowPlaylist(params);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-user-playlists"] });
      window.location.replace("/");
    },
  });
};
