import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removePlaylistItems } from "../apis/playlistApi";
import { RemovePlaylistItemsRequest } from "../models/playlist";
import { useGetCurrentUserProfile } from "./useGetCurrentUserProfile";
import { useOpenContext } from "../components/global/ContextProvider";
import { useParams } from "react-router";

export const useRemovePlaylistItems = () => {
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();
  const { data: user } = useGetCurrentUserProfile();
  const { modal, setModal } = useOpenContext();

  return useMutation({
    mutationFn: (params: RemovePlaylistItemsRequest) => {
      if (user?.id) {
        return removePlaylistItems(params);
      }
      return Promise.reject(new Error("user is not defined."));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playlist-items", id] });
      setModal({ isOpen: false, data: undefined });
    },
  });
};
