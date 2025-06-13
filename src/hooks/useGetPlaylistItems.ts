import { useInfiniteQuery } from "@tanstack/react-query";
import { GetPlaylistItemsRequest } from "../models/playlist";
import { getPlaylistItems } from "../apis/playlistApi";

export const useGetPlaylistItems = ({ playlist_id, limit }: GetPlaylistItemsRequest) => {
  return useInfiniteQuery({
    queryKey: ["playlist-items", playlist_id],
    queryFn: ({ pageParam = 0 }) => {
      return getPlaylistItems({ playlist_id, limit, offset: pageParam });
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
  });
};
