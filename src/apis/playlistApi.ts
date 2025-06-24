import {
  AddItemToPlaylistRequest,
  BasePlaylistResponse,
  ChangePlaylistDetailRequest,
  CreatePlaylistRequest,
  GetCurrentUserPlaylistRequest,
  GetCurrentUserPlaylistResponse,
  GetPlaylistItemsRequest,
  GetPlaylistItemsResponse,
  GetPlaylistRequest,
  PlaylistResponse,
  RemovePlaylistItemsRequest,
  UnfollowPlaylistRequest,
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
    throw error;
  }
};

export const getPlaylist = async (params: GetPlaylistRequest): Promise<PlaylistResponse> => {
  try {
    const response = await api.get(`/playlists/${params.playlist_id}`, {
      params,
    });
    return response.data;
  } catch (error) {
    throw error;
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
    throw error;
  }
};

export const createPlaylist = async (user_id: string, params: CreatePlaylistRequest): Promise<PlaylistResponse> => {
  try {
    const { name, playlistPublic, collaborative, description } = params;
    const response = await api.post(`/users/${user_id}/playlists`, {
      name,
      public: playlistPublic,
      collaborative,
      description,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addItemToPlaylist = async (params: AddItemToPlaylistRequest): Promise<BasePlaylistResponse> => {
  const { position, uris } = params;
  try {
    const response = await api.post(`/playlists/${params.playlist_id}/tracks`, {
      position,
      uris: params.uris,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removePlaylistItems = async (params: RemovePlaylistItemsRequest): Promise<BasePlaylistResponse> => {
  try {
    const { tracks, snapshot_id } = params;
    const response = await api.delete(`/playlists/${params.playlist_id}/tracks`, {
      data: {
        tracks: tracks,
        snapshot_id,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const UnfollowPlaylist = async (params: UnfollowPlaylistRequest) => {
  try {
    const response = await api.delete(`/playlists/${params.id}/followers`, {
      data: {
        ids: params.ids,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const changePlaylistDetail = async (params: ChangePlaylistDetailRequest) => {
  try {
    const response = await api.put(`/playlists/${params.playlist_id}`, {
      name: params.name,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
