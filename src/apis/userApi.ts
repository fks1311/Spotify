import { api } from "../utils/api";
import { User } from "../models/user";

/** Spotify API : 프로필 정보를 가져옵니다. */
export const getCurrentUserProfile = async (): Promise<User> => {
  try {
    const response = await api.get(`/me`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
