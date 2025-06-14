import { SimplifiedAlbumObject } from "./album";
import { ApiResponse } from "./apiResponse";
import { Artist } from "./artist";
import { SimplifiedPlaylistObject } from "./playlist";
import { ITrack, Show, SimplifiedAudiobookObject, SimplifiedEpisodeObject } from "./track";

export enum SEARCH_TYPE {
  Album = "album",
  Artist = "artist",
  Playlist = "playlist",
  Track = "track",
  Show = "show",
  Episode = "episode",
  Audiobook = "audiobook",
}

export interface SearchRequestParams {
  q: string;
  type: SEARCH_TYPE[];
  market?: string;
  limit?: number;
  offset?: number;
  include_external?: string;
}

export interface SearchResponse {
  tracks?: ApiResponse<ITrack>;
  artists?: ApiResponse<Artist>;
  albums?: ApiResponse<SimplifiedAlbumObject>;
  playlists?: ApiResponse<SimplifiedPlaylistObject>;
  shows?: ApiResponse<Show>;
  episodes?: ApiResponse<SimplifiedEpisodeObject>;
  audiobooks?: ApiResponse<SimplifiedAudiobookObject>;
}
