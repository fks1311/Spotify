import { styled } from "@mui/material";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import PlaylistItem from "../../components/playlist/PlaylistItem";
import { useGetCurrentUserPlaylists } from "../../hooks/useGetCurrentUserPlaylists";
import { getLocalStorageSafe } from "../../utils/localStorage";
import EmptyPlaylist from "./EmptyPlaylist";
import { useState } from "react";

interface ContainerProps {
  isMouseOver: boolean;
}
const Library = () => {
  const accessToken = getLocalStorageSafe("access_token");
  const { isLoading, data } = useGetCurrentUserPlaylists({ limit: 50, offset: 0 });
  const [mouseOver, setMouseOver] = useState<boolean>(false);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Container isMouseOver={mouseOver} onMouseOver={() => setMouseOver(true)} onMouseOut={() => setMouseOver(false)}>
      {!accessToken || !data || data?.total === 0 ? <EmptyPlaylist /> : <PlaylistItem items={data.items} />}
    </Container>
  );
};

const Container = styled("div")<ContainerProps>(({ theme, isMouseOver }) => ({
  height: "100%",
  overflowY: "auto",
  maxHeight: "calc(100vh - 240px)",
  "&::-webkit-scrollbar": {
    width: "4px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: isMouseOver ? theme.palette.primary.main : "transparent",
    borderRadius: "10px",
  },
}));
export default Library;
