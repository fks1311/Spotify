import axios from "axios";
import { SPOTIFY_BASE_URL } from "../configs/commonConfig";
import { IGetNewReleasesResponse } from "../models/album";

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
    throw new Error("fail to fetch new releases");
  }
};
