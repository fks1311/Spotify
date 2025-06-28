import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useClientCredentialToken } from "./useClientCredentialToken";
import { getAlbumTracks } from "../apis/albumApi";
import { toast } from "react-toastify";

interface useGetAlbumTracksProps {
  id: string;
}
export const useGetAlbumTracks = ({ id }: useGetAlbumTracksProps) => {
  const clientCredentialToken = useClientCredentialToken();

  return useInfiniteQuery({
    queryKey: ["album-tracks", id],
    queryFn: async ({ pageParam = 0 }) => {
      if (!clientCredentialToken) {
        throw toast.error("인증 토큰이 없습니다. 로그인 상태를 확인하거나 토큰 발급 과정을 점검하세요.", {
          toastId: "fetch-clientCredentialToken-error",
        });
      }
      return getAlbumTracks({ token: clientCredentialToken, id, offset: pageParam });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.next) {
        return lastPage.offset + lastPage.limit;
      }
      return undefined;
    },
    enabled: !!clientCredentialToken && !!id,
  });
};
