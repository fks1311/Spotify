import { styled, Typography } from "@mui/material";
import PlayButton from "./PlayButton";
import theme from "../../theme";

interface CardProps {
  name: string;
  image: string;
  artistName?: string | undefined;
}
const Card = ({ image, name, artistName }: CardProps) => {
  return (
    <Container>
      <HoverLayout>
        <AlbumImg src={image} />
        <Overlay className="overlay">
          <PlayButton />
        </Overlay>
      </HoverLayout>
      <EllipsisTypography variant="h2">{name}</EllipsisTypography>
      <EllipsisTypography color={theme.palette.text.secondary}>{artistName || "No artist"}</EllipsisTypography>
    </Container>
  );
};

const Container = styled("div")(({ theme }) => ({
  minWidth: "160px",
  padding: "12px",
  borderRadius: "8px",
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
});

const Overlay = styled("div")({
  position: "absolute",
  bottom: "18px",
  right: "8px",
  opacity: 0,
  transform: "translate3d(0px, 0px, 0px)",
  transition: "opacity 0.3s ease-in-out",
});

const AlbumImg = styled("img")({
  width: "100%",
  height: "auto",
  borderRadius: "8px",
});

const EllipsisTypography = styled(Typography)({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export default Card;
