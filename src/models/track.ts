import { SimplifiedAlbumObject } from "./album";
import { ApiResponse } from "./apiResponse";
import { Artist, SimplifiedArtistObject } from "./artist";
import { External_ids, ExternalURLs, Image, Restrictions } from "./commonType";

export interface ITrack {
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
  linked_from?: ITrack;
  restrictions?: Restrictions;
  name?: string;
  popularity?: number;
  preview_url?: string | null;
  track_number?: number;
  type?: "track";
  uri?: string;
  is_local?: boolean;
}

export interface IEpisode {
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
  type: "episode";
  uri: string;
  restrictions?: Restrictions;
  show: Show;
}

export type SimplifiedEpisodeObject = Omit<IEpisode, "show">;

export interface Show {
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
  type: "show";
  uri: string;
  total_episode: number;
}

export interface SimplifiedAudiobookObject {
  authors: {
    name?: string;
  }[];
  available_markets?: string[];
  copyrights: {
    text?: string;
    type?: string;
  }[];
  description: string;
  html_description: string;
  edition?: string;
  explicit: boolean;
  external_urls: ExternalURLs;
  href: string;
  id: string;
  images: Image[];
  languages: string[];
  media_type: string;
  name: string;
  narrators: {
    name?: string;
  }[];
  publisher: string;
  type: "audiobook";
  uri: string;
  total_chapters: number;
}

// 여기서부터
export type GetAlbumTracks = ApiResponse<SimplifiedTrackObject>;

export interface SimplifiedTrackObject {
  artists?: SimplifiedArtistObject[];
  available_markets?: string[];
  disc_number?: number;
  duration_ms?: number;
  explicit?: boolean;
  external_urls?: ExternalURLs;
  href?: string;
  id?: string;
  is_playable?: boolean;
  linked_from?: {
    external_urls?: ExternalURLs;
    href?: string;
    id?: string;
    type?: "track";
    uri?: string;
  };
  restrictions?: Restrictions;
  name?: string;
  track_number?: number;
  type?: "track";
  uri?: string;
  is_local?: boolean;
}

export interface TrackObject {
  tracks: {
    album?: SimplifiedAlbumObject;
    artists?: Artist[];
    available_markets?: string[];
    disc_number?: number;
    duration_ms?: number;
    explicit?: boolean;
    external_ids?: External_ids;
    external_urls?: ExternalURLs;
    href?: string;
    id?: string;
    is_playable?: boolean;
    linked_from?: {};
    restrictions?: {
      reason?: string;
    };
    name?: string;
    popularity?: number;
    track_number?: number;
    type?: "track";
    uri?: string;
    is_local?: boolean;
  };
}
