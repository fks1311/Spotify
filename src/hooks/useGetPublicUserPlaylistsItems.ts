import { useInfiniteQuery } from "@tanstack/react-query";
import { GetPlaylistItemsRequest } from "../models/playlist";
import { useClientCredentialToken } from "./useClientCredentialToken";
import { toast } from "react-toastify";
import { getPublicUserPlaylistsItems } from "../apis/playlistApi";

export const useGetPublicUserPlaylistsItems = ({ playlist_id, limit }: GetPlaylistItemsRequest) => {
  const clientCredentialToken = useClientCredentialToken();

  return useInfiniteQuery({
    queryKey: ["serveral-categories"],
    queryFn: ({ pageParam = 0 }) => {
      if (!clientCredentialToken)
        throw toast.error("인증 토큰이 없습니다. 로그인 상태를 확인하거나 토큰 발급 과정을 점검하세요.", {
          toastId: "fetch-clientCredentialToken-error",
        });
      return getPublicUserPlaylistsItems({ playlist_id, limit, offset: pageParam, token: clientCredentialToken });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        const nextOffset = url.searchParams.get("offset");
        return nextOffset ? parseInt(nextOffset) : undefined;
      }
      return undefined;
    },
    enabled: !!clientCredentialToken,
  });
};
