import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removePlaylistItems } from "../apis/playlistApi";
import { RemovePlaylistItemsRequest } from "../models/playlist";
import { useGetCurrentUserProfile } from "./useGetCurrentUserProfile";
import { useOpenContext } from "../components/global/ContextProvider";
import { useSetRecoilState } from "recoil";
import { triggerAtom } from "../utils/atom";

export const useRemovePlaylistItems = () => {
  const queryClient = useQueryClient();
  const { data: user } = useGetCurrentUserProfile();
  const { open, setOpen } = useOpenContext();
  const setTrigger = useSetRecoilState(triggerAtom);

  return useMutation({
    mutationFn: (params: RemovePlaylistItemsRequest) => {
      if (user?.id) {
        return removePlaylistItems(params);
      }
      return Promise.reject(new Error("user is not defined."));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playlist-items"] });
      setOpen({ isOpen: false, data: undefined });
      setTrigger((prev) => prev + 1);
    },
  });
};
