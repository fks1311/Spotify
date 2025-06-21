import { styled, TableCell, TableRow } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useParams } from "react-router";
import { useOpenContext } from "../../../common/ContextProvider";
import { PlaylistTrack } from "../../../models/playlist";
import { IEpisode, ITrack } from "../../../models/track";

// playlist page - 곡 리스트
interface TrackListItemProps {
  index: number;
  item: PlaylistTrack;
}
const TrackListItem = ({ item, index }: TrackListItemProps) => {
  const [cur, setCur] = useState<number>();
  const { id } = useParams<{ id: string }>();
  const { setModal } = useOpenContext();
  const isEpisode = (track: ITrack | IEpisode | undefined): track is IEpisode => {
    return track !== undefined && "description" in track;
  };

  function getAlbumName(track: ITrack | IEpisode | undefined): string {
    if (!track || isEpisode(track)) return "N/A";
    return track.album?.name ?? "Unknown Album";
  }

  function getArtistName() {
    return (item?.track as ITrack)?.artists?.[0].name;
  }

  const openModal = () => {
    if (id && item?.track?.uri) {
      setModal({
        isOpen: true,
        data: { playlist_id: id, tracks: [{ uri: item?.track?.uri }] },
        type: "remove",
        txt: "해당 곡을 삭제하시겠습니까?",
      });
    }
  };

  return (
    <StyledTableRow onMouseOver={() => setCur(index)} onMouseOut={() => setCur(undefined)}>
      <TableCell>{index}</TableCell>
      <TableCell>{item.track?.name || "no name"}</TableCell>
      <TableCell>{getArtistName()}</TableCell>
      <TableCell> {getAlbumName(item.track)}</TableCell>
      <TableCell>{item.added_at ? moment(item.added_at).format("YYYY-MM-DD") : "Unknown"}</TableCell>
      <DurationTableCell curPosition={cur} idx={index}>
        {moment(item.track?.duration_ms).format("mm:ss")}{" "}
        {cur === index ? <DeleteIcon onClick={() => openModal()} /> : <></>}
      </DurationTableCell>
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

interface DurationTableCellProps {
  curPosition?: number;
  idx: number;
}

const DurationTableCell = styled(TableCell, {
  shouldForwardProp: (prop) => prop !== "curPosition" && prop !== "idx",
})<DurationTableCellProps>(({ curPosition, idx }) => ({
  width: "150px",
  display: curPosition === idx ? "flex" : "normal",
  alignItems: "center",
  gap: "1rem",
}));

export default TrackListItem;
