import axios from "axios";
import { SPOTIFY_BASE_URL } from "../configs/commonConfig";
import { AnAlbum, IGetNewReleasesResponse } from "../models/album";
import { GetAlbumTracks } from "../models/track";

/** Spotify API : 앨범 발매 목록을 가져옵니다. */
export const getNewReleases = async (clientCredentialToken: string): Promise<IGetNewReleasesResponse> => {
  try {
    const response = await axios.get(`${SPOTIFY_BASE_URL}/browse/new-releases?limit=10`, {
      headers: {
        Authorization: `Bearer ${clientCredentialToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

interface getAlbumProps {
  token: string;
  id: string;
}
/** 단일 앨범 정로를 가져옵니다. */
export const getAlbum = async (params: getAlbumProps): Promise<AnAlbum> => {
  try {
    const { token, id } = params;
    const response = await axios.get(`https://api.spotify.com/v1/albums/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

interface getAlbumTracksProps {
  token: string;
  id: string;
  limit?: number;
  offset: number;
}
/** 앨범 트랙 정보를 가져옵니다. */
export const getAlbumTracks = async (params: getAlbumTracksProps): Promise<GetAlbumTracks> => {
  try {
    const { token, id, limit, offset } = params;
    const response = await axios.get(`https://api.spotify.com/v1/albums/${id}/tracks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { limit, offset },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
