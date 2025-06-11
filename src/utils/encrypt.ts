/*spotify에서 암호화 관련된 함수들 */

/** Spotify 암호화와 관련된 함수로 Code Verifier(코드 검증)합니다. */
export const generateRandomString = (length: number): string => {
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};

/** Spotify 암호화와 관련된 함수로 generateRandomString 함수의 결과로 해시 값을 생성합니다. */
export const sha256 = async (plain: string): Promise<ArrayBuffer> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data); // 이거 타입이 ArrayBuffer
};

/** Spotify 암호화와 관련된 함수로 sha256 함수의 결과를 base64로 인코딩합니다. */
export const base64encode = (input: ArrayBuffer): string => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};
