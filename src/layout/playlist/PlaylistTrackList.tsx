import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import DesktopPlaylistItem from "../../components/playlist/DesktopPlaylistItem";
import { PlaylistTrack } from "../../models/playlist";
import { PAGE_LIMIT } from "../../configs/commonConfig";
import { InfiniteData } from "@tanstack/react-query";
import { useGetPlaylistItems } from "../../hooks/useGetPlaylistItems";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

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
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>#</TableCell>
          <TableCell>Title</TableCell>
          <TableCell>Artist</TableCell>
          <TableCell>Album</TableCell>
          <TableCell>Date added</TableCell>
          <TableCell sx={{ width: "150px" }}>Duration</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {playlistItems?.pages.map((page, pageIdx) =>
          page.items.map((item: PlaylistTrack, index: number) => {
            return <DesktopPlaylistItem item={item} key={index} index={pageIdx * PAGE_LIMIT + index + 1} />;
          })
        )}
        <TableRow sx={{ height: "5px" }} ref={ref}>
          <TableCell sx={{ borderBottom: `0px solid` }}>{isFetchingNextPage && "Loading more..."}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default PlaylistTrackList;
