/** Spotify Client Credential Token API 응답값 */
export interface IClientCredentialTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

/** spotify 사용자 권한 요청 params */
export interface AuthUrlParams {
  response_type: "code";
  client_id: string;
  scope: string;
  code_challenge_method: "S256";
  code_challenge: string;
  redirect_uri: string;
}

/** Spotify 권한 부여 액세스 토큰 교환 API 응답값 */
export interface ExchageTokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
  refresh_token: string;
}
