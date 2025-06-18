import axios from "axios";
import { SPOTIFY_BASE_URL } from "../configs/commonConfig";
import { getValidAccessToken } from "./getValidAccessToken";

export const api = axios.create({
  baseURL: `${SPOTIFY_BASE_URL}`,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 추가하기
api.interceptors.request.use(async (request) => {
  const token = await getValidAccessToken();
  request.headers.Authorization = `Bearer ${token}`;

  return request;
});
