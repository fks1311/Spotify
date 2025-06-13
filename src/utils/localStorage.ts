export const getLocalStorageSafe = (key: string): string | undefined => {
  try {
    const access_token = localStorage.getItem(key);
    if (!access_token) throw new Error(`${key} not found in localStorage`);
    return access_token;
  } catch (e) {
    return "";
  }
};
