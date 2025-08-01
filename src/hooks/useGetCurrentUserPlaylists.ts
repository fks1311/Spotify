import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getCurrentUserPlaylists } from "../apis/playlistApi";
import { GetCurrentUserPlaylistRequest } from "../models/playlist";
import { getSessionStorageSafe } from "../utils/sessionStorage";

/** 플레이리스트 목록을 가져오는 커스텀 훅입니다. */
export const useGetCurrentUserPlaylists = ({ limit, offset }: GetCurrentUserPlaylistRequest) => {
  const accessToken = getSessionStorageSafe("access_token");

  return useInfiniteQuery({
    queryKey: ["current-user-playlists"],
    queryFn: ({ pageParam = 0 }) => {
      return getCurrentUserPlaylists({ limit, offset: pageParam });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        const nextOffset = url.searchParams.get("offset");
        return nextOffset ? parseInt(nextOffset) : undefined;
      }
      return undefined;
    },
    enabled: !!accessToken,
  });
};
