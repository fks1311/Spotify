import { Avatar, Box, styled, Typography } from "@mui/material";
import { SimplifiedPlaylistObject } from "../../models/playlist";
import { EllipsisTypography } from "../album/Card";

interface PlaylistItemProps {
  items: SimplifiedPlaylistObject[];
}

const PlaylistItem = ({ items }: PlaylistItemProps) => {
  return (
    <Container>
      {items &&
        items.map((data, idx) => (
          <ItemBox key={idx}>
            <Avatar src={data?.images?.[0].url} variant="rounded" />
            <div>
              <EllipsisTypography>{data?.name}</EllipsisTypography>
              <div>
                <EllipsisTypography>{`플레이리스트 • ${data?.owner?.display_name}`}</EllipsisTypography>
              </div>
            </div>
          </ItemBox>
        ))}
    </Container>
  );
};

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
});
const ItemBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "1rem",
  padding: "0.5rem",
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    cursor: "pointer",
  },
}));

export default PlaylistItem;
