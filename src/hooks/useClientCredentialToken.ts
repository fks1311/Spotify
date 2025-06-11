import { useQuery } from "@tanstack/react-query";
import { getClientCredentialToken } from "../apis/authApi";

/** Spotify Client Credential Token을 가져오는 커스텀 훅입니다.  */
export const useClientCredentialToken = (): string | undefined => {
  const { data } = useQuery({
    queryKey: ["client-credential=token"],
    queryFn: getClientCredentialToken,
  });
  const cleintCredentialToken = data?.access_token;
  return cleintCredentialToken;
};
