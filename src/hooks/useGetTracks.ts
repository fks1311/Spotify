import { useQuery } from "@tanstack/react-query";
import { getTracks } from "../apis/playlistApi";
import { useClientCredentialToken } from "./useClientCredentialToken";
import { toast } from "react-toastify";

export const useGetTracks = (id: string) => {
  const clientCredentialToken = useClientCredentialToken();

  return useQuery({
    queryKey: ["explore-track"],
    queryFn: async () => {
      if (!clientCredentialToken) {
        throw toast.error("인증 토큰이 없습니다. 로그인 상태를 확인하거나 토큰 발급 과정을 점검하세요.", {
          toastId: "fetch-clientCredentialToken-error",
        });
      }
      return getTracks({ token: clientCredentialToken, id });
    },
    enabled: !!clientCredentialToken,
  });
};
