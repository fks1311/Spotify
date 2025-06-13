import { useQuery } from "@tanstack/react-query";
import { getCurrentUserPlaylists } from "../apis/playlistApi";
import { GetCurrentUserPlaylistRequest } from "../models/playlist";
import { getLocalStorageSafe } from "../utils/localStorage";

/** 플레이리스트 목록을 가져오는 커스텀 훅입니다. */
export const useGetCurrentUserPlaylists = ({ limit, offset }: GetCurrentUserPlaylistRequest) => {
  const accessToken = getLocalStorageSafe("access_token");

  return useQuery({
    queryKey: ["current-user-playlists"],
    queryFn: () => {
      return getCurrentUserPlaylists({ limit, offset });
    },
    enabled: !!accessToken,
  });
};
