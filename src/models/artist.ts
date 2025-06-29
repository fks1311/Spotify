import { ExternalURLs, Image } from "./commonType";

export interface Artist {
  external_urls?: ExternalURLs;
  follwers?: {
    href?: string | null;
    total?: number;
  };
  genres?: string[];
  href?: string;
  id?: string;
  images?: Image[];
  name?: string;
  popularity?: number;
  type?: "artist";
  uri?: string;
}

// 여기서부터
export interface SimplifiedArtistObject {
  external_urls?: ExternalURLs;
  href?: string;
  id?: string;
  name?: string;
  type?: "artist";
  uri?: string;
}
