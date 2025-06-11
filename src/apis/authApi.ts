import axios from "axios";
import { ExchageTokenResponse, IClientCredentialTokenResponse } from "../models/auth";
import { CLIENT_ID, CLIENT_SECRET } from "../configs/authConfig";
import { REDIRECT_URI } from "../configs/commonConfig";

const encodedBase64 = (data: string): string => {
  if (typeof window !== "undefined") {
    // 브라우저 환경
    return btoa(data);
  } else {
    // Node.js 환경
    return Buffer.from(data).toString("base64");
  }
};

/** Spotify API : CLIENT_ID와 CLIENT_SECRET을 통해 Access Token을 요청합니다. */
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
    console.log("getClientCredentialToken", error);
    throw new Error("Fail to fetch Spotify Client Token");
  }
};

/** 부여된 권한 코드를 액세스 토큰으로 교환합니다. */
export const exchageToken = async (code: string, codeVerifier: string): Promise<ExchageTokenResponse> => {
  try {
    const url = "https://accounts.spotify.com/api/token";

    if (!CLIENT_ID || !REDIRECT_URI) throw new Error("Missing required parameters"); // CLIENT_ID나 REDIRECT_URI가 undefined면 fetch 에러 발생하니까 미리 throw Error 설정
    const body = new URLSearchParams({
      client_id: CLIENT_ID,
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
      code_verifier: codeVerifier,
    });

    const response = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log("exchageToken", error);
    throw new Error("Fail to fetch Token");
  }
};
