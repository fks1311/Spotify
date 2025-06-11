import axios from "axios";
import { SPOTIFY_BASE_URL } from "../configs/commonConfig";

export const api = axios.create({
  baseURL: `${SPOTIFY_BASE_URL}`,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
});

// 요청 인터셉터 추가하기
api.interceptors.request.use((request) => {
  // 요청이 전달되기 전에 작업 수행
  request.headers.Authorization = `Bearer ${localStorage.getItem("access_token")}`;

  return request;
});
