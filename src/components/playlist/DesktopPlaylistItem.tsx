import { styled, TableCell, TableRow } from "@mui/material";
import { PlaylistTrack } from "../../models/playlist";
import { IEpisode, ITrack } from "../../models/track";
import moment from "moment";

interface DesktopPlaylistItemProps {
  index: number;
  item: PlaylistTrack;
}
const DesktopPlaylistItem = ({ item, index }: DesktopPlaylistItemProps) => {
  const isEpisode = (track: ITrack | IEpisode | undefined): track is IEpisode => {
    return track !== undefined && "description" in track;
  };

  function getAlbumName(track: ITrack | IEpisode | undefined): string {
    if (!track || isEpisode(track)) return "N/A";
    return track.album?.name ?? "Unknown Album";
  }

  return (
    <StyledTableRow>
      <TableCell>{index}</TableCell>
      <TableCell>{item.track?.name || "no name"}</TableCell>
      <TableCell> {getAlbumName(item.track)}</TableCell>
      <TableCell>{item.added_at ? moment(item.added_at).format("YYYY-MM-DD") : "Unknown"}</TableCell>
      <TableCell>{moment(item.track?.duration_ms).format("mm:ss")}</TableCell>
    </StyledTableRow>
  );
};

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "& .MuiTableCell-root": {
    borderBottom: "none",
  },
}));

export default DesktopPlaylistItem;
