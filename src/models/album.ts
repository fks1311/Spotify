import { Artist } from "./artist";
import { ExternalURLs, Image, Restrictions } from "./commonType";

/** Spotify 발매 목록 요청 API 응답값 */
export interface IGetNewReleasesResponse {
  albums: {
    href: string;
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
    items: SimplifiedAlbumObject[];
  };
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
  type: string;
  uri: string;
  artists: Artist[];
}
