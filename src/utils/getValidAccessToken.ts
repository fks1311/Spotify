import { getRefreshToken } from "../apis/authApi";

/** 액세스 토큰 만료 체크 & 리프레시 로직 */
export const getValidAccessToken = async () => {
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  const expiresAt = parseInt(localStorage.getItem("expires_at") || "0");

  if (Date.now() < expiresAt) {
    return accessToken;
  }

  const refreshed = await getRefreshToken(refreshToken!);
  localStorage.setItem("access_token", refreshed.access_token);
  localStorage.setItem("expires_at", (Date.now() + refreshed.expires_in * 1000).toString());

  return refreshed.access_token;
};
