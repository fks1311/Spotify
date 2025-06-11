import { useQuery } from "@tanstack/react-query";
import { getNewReleases } from "../apis/albumApi";
import { useClientCredentialToken } from "./useClientCredentialToken";

/** 앨범 발매 목록을 가져오는 커스텀 훅입니다.  */
export const useGetNewReleases = () => {
  const clientCredentialToken = useClientCredentialToken();

  return useQuery({
    queryKey: ["new-releases"],
    queryFn: async () => {
      if (!clientCredentialToken) {
        // clientCredentialToken가 undefined이라 값이 없으면
        throw new Error("No Token available");
      }
      return getNewReleases(clientCredentialToken);
    },
  });
};
