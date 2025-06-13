import {
  CreatePlaylistRequest,
  GetCurrentUserPlaylistRequest,
  GetCurrentUserPlaylistResponse,
  GetPlaylistItemsRequest,
  GetPlaylistItemsResponse,
  GetPlaylistRequest,
  PlaylistResponse,
} from "../models/playlist";
import { api } from "../utils/api";

/** Spotiry : 플레이리스트 목록을 가져옵니다. */
export const getCurrentUserPlaylists = async ({
  limit,
  offset,
}: GetCurrentUserPlaylistRequest): Promise<GetCurrentUserPlaylistResponse> => {
  try {
    const response = await api.get("/me/playlists", {
      params: { limit, offset },
    });
    return response.data;
  } catch (error) {
    throw new Error("fail to fetch current user playlists.");
  }
};

export const getPlaylist = async (params: GetPlaylistRequest): Promise<PlaylistResponse> => {
  try {
    const response = await api.get(`/playlists/${params.playlist_id}`, {
      params,
    });
    return response.data;
  } catch (error) {
    throw new Error("fail to fetch playlist detail");
  }
};

export const getPlaylistItems = async ({
  playlist_id,
  limit,
  offset,
}: GetPlaylistItemsRequest): Promise<GetPlaylistItemsResponse> => {
  try {
    const response = await api.get(`/playlists/${playlist_id}/tracks`, {
      params: { limit, offset },
    });
    return response.data;
  } catch (error) {
    throw new Error("fail to fetch playlist items");
  }
};

export const createPlaylist = async (user_id: string, params: CreatePlaylistRequest): Promise<PlaylistResponse> => {
  try {
    const { name, playlistPublic, collaborative, description } = params;
    console.log(">###");
    const response = await api.post(`/users/${user_id}/playlists`, {
      name,
      public: playlistPublic,
      collaborative,
      description,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("fail to create playlists");
  }
};
