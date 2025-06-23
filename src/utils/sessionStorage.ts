export const getSessionStorageSafe = (key: string): string | undefined => {
  try {
    const access_token = sessionStorage.getItem(key);
    if (!access_token) throw new Error(`${key} not found in sessionStorage`);
    return access_token;
  } catch (e) {
    return "";
  }
};
