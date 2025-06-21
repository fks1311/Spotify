import { Avatar, Box, styled } from "@mui/material";
import { SimplifiedPlaylistObject } from "../../models/playlist";
import { EllipsisTypography } from "../../common/components/Card";
import { useNavigate } from "react-router";

interface PlaylistItemProps {
  items: SimplifiedPlaylistObject[];
}

// sidebar
const PlaylistItem = ({ items }: PlaylistItemProps) => {
  const navigate = useNavigate();
  const handleClick = (id: string | undefined) => {
    navigate(`/playlist/${id}`);
  };
  return (
    <Container>
      {items &&
        items.map((data, idx) => (
          <ItemBox key={idx} onClick={() => handleClick(data.id)}>
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
  padding: "1rem",
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    cursor: "pointer",
  },
}));

export default PlaylistItem;
