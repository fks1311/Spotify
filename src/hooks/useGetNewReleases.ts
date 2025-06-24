import { useQuery } from "@tanstack/react-query";
import { getNewReleases } from "../apis/albumApi";
import { useClientCredentialToken } from "./useClientCredentialToken";
import { toast } from "react-toastify";

/** 앨범 발매 목록을 가져오는 커스텀 훅입니다.  */
export const useGetNewReleases = () => {
  const clientCredentialToken = useClientCredentialToken();

  return useQuery({
    queryKey: ["new-releases"],
    queryFn: async () => {
      if (!clientCredentialToken) {
        // clientCredentialToken가 undefined이라 값이 없으면
        throw toast.error("인증 토큰이 없습니다. 로그인 상태를 확인하거나 토큰 발급 과정을 점검하세요.", {
          toastId: "fetch-clientCredentialToken-error",
        });
      }
      return getNewReleases(clientCredentialToken);
    },
    enabled: !!clientCredentialToken,
  });
};
