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
