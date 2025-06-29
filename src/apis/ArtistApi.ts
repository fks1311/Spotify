import axios from "axios";
import { Artist } from "../models/artist";
import { TrackObject } from "../models/track";

/** 단일 아티스트에 대한 정보를 가져옵니다 */
export const getArtist = async (params: { token: string; id: string }): Promise<Artist> => {
  try {
    const { token, id } = params;
    const response = await axios.get(`https://api.spotify.com/v1/artists/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/** 아티스트의 최고 트랙에 대한 정보를 가져옵니다. (10개) */
export const getArtistTopTracks = async (params: { token: string; id: string }): Promise<TrackObject> => {
  try {
    const { token, id } = params;
    const response = await axios.get(`https://api.spotify.com/v1/artists/${id}/top-tracks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
