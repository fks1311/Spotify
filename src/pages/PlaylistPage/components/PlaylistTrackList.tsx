import { TableCell, TableRow } from "@mui/material";
import { useInView } from "react-intersection-observer";
import { useGetPlaylistItems } from "../../../hooks/useGetPlaylistItems";
import { useEffect } from "react";
import { PAGE_LIMIT } from "../../../configs/commonConfig";
import PlaylitTrackLayout from "../../../layout/playlist/PlaylitTrackLayout";
import { PlaylistTrack } from "../../../models/playlist";
import TrackListItem from "./TrackListItem";

interface PlaylistTrackListProps {
  id: string;
}
const PlaylistTrackList = ({ id }: PlaylistTrackListProps) => {
  const { ref, inView } = useInView({
    threshold: 0.1, // 약간이라도 보이면 감지
  });

  const {
    data: playlistItems,
    isLoading: isPlaylistItemsLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isError: playlistItemsError,
  } = useGetPlaylistItems({ playlist_id: id, limit: PAGE_LIMIT, offset: 0 });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  return (
    <PlaylitTrackLayout>
      {playlistItems?.pages.map((page, pageIdx) =>
        page.items.map((item: PlaylistTrack, index: number) => {
          return <TrackListItem item={item} key={index} index={pageIdx * PAGE_LIMIT + index + 1} />;
        })
      )}
      <TableRow sx={{ height: "5px" }} ref={ref}>
        <TableCell sx={{ borderBottom: `0px solid` }}>{isFetchingNextPage && "Loading more..."}</TableCell>
      </TableRow>
    </PlaylitTrackLayout>
  );
};

export default PlaylistTrackList;
