import { SimplifiedAlbumObject } from "./album";
import { ApiResponse } from "./apiResponse";
import { Artist } from "./artist";
import { ExternalURLs, Image, Owner, Restrictions } from "./commonType";

export interface GetCurrentUserPlaylistRequest {
  limit?: number;
  offset?: number;
}

export type GetCurrentUserPlaylistResponse = ApiResponse<SimplifiedPlaylistObject>;

export interface SimplifiedPlaylistObject {
  collaborative?: boolean;
  description?: string;
  external_urls?: ExternalURLs;
  href?: string;
  id?: string;
  images?: Image[];
  name?: string;
  owner?: Owner;
  public?: boolean;
  snapshot_id?: string;
  tracks?: {
    href?: string;
    total?: number;
  };
  type?: string;
  uri?: string;
}

export interface GetPlaylistRequest {
  playlist_id: string;
  market?: string;
  fields?: string;
  additional_types?: string;
}

export interface GetPlaylistResponse {
  collaborative?: boolean;
  description?: string | null;
  external_urls?: ExternalURLs;
  href?: string;
  id?: string;
  images?: Image[];
  name?: string;
  owner?: Owner;
  public?: boolean;
  snapshot_id?: string;
  tracks?: ApiResponse<PlaylistTrackObject>;
  type?: string;
  uri?: string;
}

interface PlaylistTrackObject {
  added_at?: string;
  added_by?: ExternalURLs;
  is_local?: boolean;
  track?: {
    TrackObject: TrackObjectofTrack;
    EpisodeObject: {
      // audio_preview_url: string | null;
      description: string;
      html_description: string;
      duration_ms: number;
      explicit: boolean;
      external_urls: ExternalURLs;
      href: string;
      id: string;
      images: Image[];
      is_externally_hosted: boolean;
      is_playable: boolean;
      // language: string;
      languages: string[];
      name: string;
      release_date: string;
      release_date_precision: string;
      resume_point?: {
        fully_played?: string;
        resume_position_ms?: number;
      };
      type: string;
      uri: string;
      restrictions?: Restrictions;
      show: {
        available_markets: string[];
        copyrights: {
          text?: string;
          type?: string;
        }[];
        description: string;
        html_description: string;
        explicit: boolean;
        external_urls: ExternalURLs;
        href: string;
        id: string;
        images: Image[];
        is_externally_hosted: boolean;
        languages: string[];
        media_type: string;
        name: string;
        publisher: string;
        type: string;
        uri: string;
        total_episode: number;
      };
    };
  }[];
}

interface TrackObjectofTrack {
  album?: SimplifiedAlbumObject;
  artists?: Artist[];
  available_markets?: string[];
  disc_number?: number;
  duration_ms?: number;
  explicit?: boolean;
  external_ids?: {
    isrc?: string;
    ean?: string;
    upc?: string;
  };
  external_urls?: ExternalURLs;
  href?: string;
  id?: string;
  is_playable?: boolean;
  linked_from?: {};
  restrictions?: Restrictions;
  name?: string;
  popularity?: number;
  preview_url?: string | null;
  track_number?: number;
  type?: string;
  uri?: string;
  is_local?: boolean;
}
