import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changePlaylistDetail } from "../apis/playlistApi";
import { ChangePlaylistDetailRequest } from "../models/playlist";
import { useOpenContext } from "../components/global/ContextProvider";

export const useChangePlaylistDetail = () => {
  const queryClient = useQueryClient();
  const { setModal, setOption } = useOpenContext();
  return useMutation({
    mutationFn: (params: ChangePlaylistDetailRequest) => {
      return changePlaylistDetail(params);
    },
    onSuccess: async (_data, variables) => {
      queryClient.setQueryData(["playlist-detail", variables.playlist_id], (old: any) => ({
        ...old,
        name: variables.name,
      }));
      setModal({ isOpen: false, data: undefined });
      setOption({ isOpen: false });
    },
  });
};
