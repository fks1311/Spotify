import { useQuery } from "@tanstack/react-query";
import { GetPlaylistRequest } from "../models/playlist";
import { getPublicPlaylist } from "../apis/playlistApi";
import { useClientCredentialToken } from "./useClientCredentialToken";
import { toast } from "react-toastify";

export const useGetPublicPlaylist = (params: GetPlaylistRequest) => {
  const clientCredentialToken = useClientCredentialToken();
  return useQuery({
    queryKey: ["playlist-detail", params.playlist_id],
    queryFn: () => {
      if (!clientCredentialToken)
        throw toast.error("인증 토큰이 없습니다. 로그인 상태를 확인하거나 토큰 발급 과정을 점검하세요.", {
          toastId: "fetch-clientCredentialToken-error",
        });
      return getPublicPlaylist({ playlist_id: params.playlist_id, token: clientCredentialToken });
    },
    enabled: !!params.playlist_id,
  });
};
