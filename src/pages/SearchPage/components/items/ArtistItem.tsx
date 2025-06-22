import { Box, styled, Typography } from "@mui/material";
import ItemLayout from "../../../../layout/searchpage/ItemLayout";
import { Artist } from "../../../../models/artist";
import PlayButton from "../../../../common/components/PlayButton";

interface ArtistItemProps {
  artists: Artist[];
}
const ArtistItem = ({ artists }: ArtistItemProps) => {
  return (
    <ItemLayout title="아티스트" width="100%">
      <ArtistLayout>
        {artists.map((artist) => (
          <Content key={artist.id}>
            <HoverLayout>
              <ArtistImg src={artist?.images?.[0]?.url} />
              <Overlay className="overlay">
                <PlayButton />
              </Overlay>
            </HoverLayout>
            <Typography sx={{ fontSize: "1rem" }}>{artist.name}</Typography>
            <Typography sx={{ color: "#b3b3b3" }}>아티스트</Typography>
          </Content>
        ))}
      </ArtistLayout>
    </ItemLayout>
  );
};

const ArtistLayout = styled(Box)({ display: "flex", gap: "1rem" });
const Content = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  padding: "0.5rem",
  borderRadius: "10px",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    transform: "translate3d(0px, 0px, 0px)",
    transition: "opacity 0.3s ease-in-out",
    cursor: "pointer",
  },
  "&:hover .overlay": {
    opacity: 1,
  },
}));
const HoverLayout = styled("div")({
  position: "relative",
  width: "100%",
});
const ArtistImg = styled("img")({
  height: "160px",
  width: "100%",
  borderRadius: "50%",
});

const Overlay = styled("div")({
  position: "absolute",
  bottom: 0,
  right: 0,
  opacity: 0,
  transform: "translate3d(0px, 0px, 0px)",
  transition: "opacity 0.3s ease-in-out",
});

export default ArtistItem;
