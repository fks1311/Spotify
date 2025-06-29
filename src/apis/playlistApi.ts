import axios from "axios";
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

/** 사용자가 소유한 단일 재생목록을 가져옵니다. */
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

/** 사용자가 소유한 재생 목록 항목에 대한 세부 정보를 가져옵니다. */
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

/** 재생목록을 만듭니다. */
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

/** 재생 목록에 항목 추가 */
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

/** 재생 목록 항목 제거 */
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

/** 플레이리스트 팔로우 취소 => 재생 목록 삭제 */
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

/** 재생 목록의 세부 정보 변경 */
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

/** 단일 트랙 가져오기 */
export const getTracks = async (params: { token: string; id: string }) => {
  try {
    const { token, id } = params;
    const response = await axios.get(`https://api.spotify.com/v1/tracks/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/** 다른 사람의 공개된 단일 재생목록 */
export const getPublicPlaylist = async (params: GetPlaylistRequest & { token: string }): Promise<PlaylistResponse> => {
  try {
    const response = await axios.get(`https://api.spotify.com/v1/playlists/${params.playlist_id}`, {
      headers: {
        Authorization: `Bearer ${params.token}`,
      },
      params,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/** 다른 사람의 공개된 플레이리스트 가져오기 */
export const getPublicUserPlaylistsItems = async (
  params: GetPlaylistItemsRequest & { token: string }
): Promise<GetPlaylistItemsResponse> => {
  try {
    const { playlist_id, limit, offset, token } = params;
    const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
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
