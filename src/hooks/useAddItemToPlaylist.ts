import { useMutation } from "@tanstack/react-query";
import { AddItemToPlaylistRequest } from "../models/playlist";
import { addItemToPlaylist } from "../apis/playlistApi";
import { useGetCurrentUserProfile } from "./useGetCurrentUserProfile";

export const useAddItemToPlaylist = () => {
  const { data: user } = useGetCurrentUserProfile();

  return useMutation({
    mutationFn: (params: AddItemToPlaylistRequest) => {
      if (user?.id) {
        return addItemToPlaylist(params);
      }
      return Promise.reject(new Error("user is not defined."));
    },
    onSuccess: () => {
      console.log(`useAddItemToPlaylist 성공`);
    },
  });
};
