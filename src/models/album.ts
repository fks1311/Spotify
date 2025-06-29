import { ApiResponse } from "./apiResponse";
import { Artist, SimplifiedArtistObject } from "./artist";
import { Copyrights, External_ids, ExternalURLs, Image, Restrictions } from "./commonType";
import { GetAlbumTracks } from "./track";

/** Spotify 발매 목록 요청 API 응답값 */
export interface IGetNewReleasesResponse {
  albums: ApiResponse<SimplifiedAlbumObject>;
}

// 여기서부터
export interface AnAlbum {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalURLs;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions?: Restrictions;
  type: string;
  uri: string;
  artists: SimplifiedArtistObject[];
  tracks: GetAlbumTracks;
  copyrights: Copyrights;
  external_ids: External_ids;
  label: string;
  poplularity: number;
}

export interface SimplifiedAlbumObject {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalURLs;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions?: Restrictions;
  type: "album";
  uri: string;
  artists: Artist[];
}
