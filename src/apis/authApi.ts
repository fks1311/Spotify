import axios from "axios";
import { IClientCredentialTokenResponse } from "../models/auth";
import { CLIENT_ID, CLIENT_SECRET } from "../configs/authConfig";

const encodedBase64 = (data: string): string => {
  if (typeof window !== "undefined") {
    // 브라우저 환경
    return btoa(data);
  } else {
    // Node.js 환경
    return Buffer.from(data).toString("base64");
  }
};

// Spotify에서 제공하는 Token을 가져옵니다.
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
    console.log(error);
    throw new Error("Fail to fetch Spotify Client Token");
  }
};
