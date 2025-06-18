import { useMutation } from "@tanstack/react-query";
import { exchageToken, getRefreshToken } from "../apis/authApi";
import { ExchageTokenResponse } from "../models/auth";

/** 사용자가 권한 부여 요청을 수락하면 권한 부여 코드를 액세스 토큰으로 교환하는 커스텀 훅입니다. */
export const useExchangeToken = () => {
  return useMutation<ExchageTokenResponse, Error, { code: string; codeVerifier: string }>({
    mutationFn: ({ code, codeVerifier }) => {
      return exchageToken(code, codeVerifier);
    },
    onSuccess: (data) => {
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      localStorage.setItem("expires_at", (Date.now() + data.expires_in * 1000).toString());
    },
  });
};

export const useExchangeRefreshToken = () => {
  return useMutation<ExchageTokenResponse, Error, { refreshToken: string }>({
    mutationFn: ({ refreshToken }) => {
      return getRefreshToken(refreshToken);
    },
    onSuccess: (data) => {
      localStorage.setItem("access_token", data.access_token);
      if (data.refresh_token) {
        localStorage.setItem("refresh_token", data.refresh_token);
      }
    },
  });
};
