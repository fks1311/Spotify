import axios from "axios";
import { ExchageTokenResponse, IClientCredentialTokenResponse } from "../models/auth";
import { CLIENT_ID, CLIENT_SECRET } from "../configs/authConfig";
import { LOCAL_REDIRECT_URI, PROD_REDIRECT_URI } from "../configs/commonConfig";
import { toast } from "react-toastify";

const encodedBase64 = (data: string): string => {
  if (typeof window !== "undefined") {
    // 브라우저 환경
    return btoa(data);
  } else {
    // Node.js 환경
    return Buffer.from(data).toString("base64");
  }
};

/** Spotify API : Spotify Web API 서비스에 대한 후속 호출 가능한 JSON 데이터가 수신됩니다. */
export const getClientCredentialToken = async (): Promise<IClientCredentialTokenResponse> => {
  try {
    const body = new URLSearchParams({
      grant_type: "client_credentials",
    });
    const headers = {
      headers: {
        Authorization: `Basic ${encodedBase64(CLIENT_ID + ":" + CLIENT_SECRET)}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    const response = await axios.post("https://accounts.spotify.com/api/token", body, headers);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/** Spotify : 부여된 권한 코드를 액세스 토큰으로 교환합니다. */
/** 사용자 권한 요청 -> 요청 수락 -> 액세스 토큰 생성 */
export const exchageToken = async (code: string, codeVerifier: string): Promise<ExchageTokenResponse> => {
  try {
    const url = "https://accounts.spotify.com/api/token";

    if (!CLIENT_ID || !LOCAL_REDIRECT_URI || !PROD_REDIRECT_URI)
      throw toast.error(
        "필수 환경 변수가 설정되어 있지 않습니다. CLIENT_ID, LOCAL_REDIRECT_URI, PROD_REDIRECT_URI를 확인해주세요."
      ); // CLIENT_ID나 REDIRECT_URI가 undefined면 fetch 에러 발생하니까 미리 throw Error 설정
    const body = new URLSearchParams({
      client_id: CLIENT_ID,
      grant_type: "authorization_code",
      code,
      redirect_uri: process.env.NODE_ENV === "production" ? PROD_REDIRECT_URI : LOCAL_REDIRECT_URI,
      code_verifier: codeVerifier,
    });

    const response = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/** Spotify API : refresh Token 생성 */
export const getRefreshToken = async (refreshToken: string) => {
  try {
    const url = "https://accounts.spotify.com/api/token";

    if (!CLIENT_ID || !LOCAL_REDIRECT_URI || !PROD_REDIRECT_URI) throw new Error("Missing required parameters"); // CLIENT_ID나 REDIRECT_URI가 undefined면 fetch 에러 발생하니까 미리 throw Error 설정
    const body = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: CLIENT_ID,
    });

    const response = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
