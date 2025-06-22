import { Box, styled, Typography } from "@mui/material";
import ItemLayout from "../../../../layout/searchpage/ItemLayout";
import { SimplifiedAlbumObject } from "../../../../models/album";
import PlayButton from "../../../../common/components/PlayButton";

interface AlbumItemProps {
  albums: SimplifiedAlbumObject[];
}
const AlbumItem = ({ albums }: AlbumItemProps) => {
  console.log(albums);
  return (
    <ItemLayout title="앨범" width="100%">
      <AlbumLayout>
        {albums.map((album) => (
          <Content key={album.id}>
            <HoverLayout>
              <AlbumCover src={album.images[0].url} />
              <Overlay className="overlay">
                <PlayButton />
              </Overlay>
            </HoverLayout>
            <Typography
              sx={{
                fontSize: "1rem",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {album.name}
            </Typography>
            <Typography sx={{ color: "#b3b3b3" }}>{`${album.release_date.slice(0, 4)} • ${
              album?.artists?.[0]?.name
            }`}</Typography>
          </Content>
        ))}
      </AlbumLayout>
    </ItemLayout>
  );
};

const AlbumLayout = styled(Box)({ display: "flex", gap: "1rem" });
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
const AlbumCover = styled("img")({ height: "160px", width: "160px" });
const Overlay = styled("div")({
  position: "absolute",
  bottom: 0,
  right: 0,
  opacity: 0,
  transform: "translate3d(0px, 0px, 0px)",
  transition: "opacity 0.3s ease-in-out",
});

export default AlbumItem;
