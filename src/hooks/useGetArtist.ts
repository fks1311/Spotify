import { useQuery } from "@tanstack/react-query";
import { useClientCredentialToken } from "./useClientCredentialToken";
import { toast } from "react-toastify";
import { getArtist } from "../apis/ArtistApi";

export const useGetArtist = ({ id }: { id: string }) => {
  const clientCredentialToken = useClientCredentialToken();

  return useQuery({
    queryKey: ["artist"],
    queryFn: () => {
      if (!clientCredentialToken) {
        throw toast.error("인증 토큰이 없습니다. 로그인 상태를 확인하거나 토큰 발급 과정을 점검하세요.", {
          toastId: "fetch-clientCredentialToken-error",
        });
      }
      return getArtist({ token: clientCredentialToken, id });
    },
    enabled: !!clientCredentialToken,
  });
};
