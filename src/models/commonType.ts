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
