export interface ExternalURLs {
  spotify?: string;
}

export interface Image {
  url: string;
  height: number | null;
  width: number | null;
}

export interface Restrictions {
  reason?: string;
}

export interface Owner {
  external_urls?: ExternalURLs;
  href?: string;
  id?: string;
  type?: string;
  uri?: string;
  display_name?: string | null;
}

export interface External_ids {
  isrc?: string;
  ean?: string;
  upc?: string;
}

export interface Copyrights {
  text?: string;
  type?: string;
}
