import { SimplifiedAlbumObject } from "./album";
import { Artist } from "./artist";
import { ExternalURLs, Image, Restrictions } from "./commonType";

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
    type: "show";
    uri: string;
    total_episode: number;
  };
}
