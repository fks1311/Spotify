import { Avatar, Box, styled, Typography } from "@mui/material";
import ItemLayout from "../../../../layout/searchpage/ItemLayout";
import { ITrack } from "../../../../models/track";
import moment from "moment";
import { useNavigate } from "react-router";

interface TrackItemProps {
  tracks: ITrack[];
}
const TrackItem = ({ tracks }: TrackItemProps) => {
  const navigate = useNavigate();

  return (
    <ItemLayout title="곡" width={{ xs: "100%", sm: "100%", md: "100%", lg: "70%", xl: "70%" }}>
      <TrackLayout>
        {tracks?.map((track) => (
          <Track key={track.id} onClick={() => navigate(`/explore/track/${track.id}`)}>
            <Left className="track-in-box">
              <Avatar variant="square" src={track.album?.images[0].url} sx={{ borderRadius: "10px" }} />
              <div>
                <Typography variant="body1">{track.name}</Typography>
                <Typography variant="body2" sx={{ color: "#b3b3b3" }}>
                  {track?.artists?.[0]?.name ?? "No name"}
                </Typography>
              </div>
            </Left>
            <div>{moment(track.duration_ms).format("mm:ss")}</div>
          </Track>
        ))}
      </TrackLayout>
    </ItemLayout>
  );
};

const TrackLayout = styled(Box)({ display: "flex", flexDirection: "column", gap: "0.3rem" });
const Track = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0.5rem",
  borderRadius: "10px",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    transform: "translate3d(0px, 0px, 0px)",
    transition: "opacity 0.3s ease-in-out",
    cursor: "pointer",
  },
}));
const Left = styled("div")({
  display: "flex",
  gap: "1rem",
});

export default TrackItem;
