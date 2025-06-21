import { styled } from "@mui/material";
import { LoadingSpinner } from "../LoadingSpinner";
import PlaylistItem from "./library-body/PlaylistItem";
import { useGetCurrentUserPlaylists } from "../../../hooks/useGetCurrentUserPlaylists";
import { getLocalStorageSafe } from "../../../utils/localStorage";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useGetCurrentUserProfile } from "../../../hooks/useGetCurrentUserProfile";
import EmptyPlaylist from "./library-body/EmptyPlaylist";

interface ContainerProps {
  isMouseOver: boolean;
}
const Library = () => {
  const { ref, inView } = useInView();
  const accessToken = getLocalStorageSafe("access_token");
  const { data: user } = useGetCurrentUserProfile();

  const { isLoading, data, fetchNextPage, hasNextPage, isFetchingNextPage, error } = useGetCurrentUserPlaylists({
    limit: 10,
    offset: 0,
  });
  const [mouseOver, setMouseOver] = useState<boolean>(false);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  // if (error) {
  //   return <ErrorMessage errorMessage={error.message} />;
  // }

  if (!user) return <EmptyPlaylist />;
  if (error) return <EmptyPlaylist />;

  return (
    <Container isMouseOver={mouseOver} onMouseOver={() => setMouseOver(true)} onMouseOut={() => setMouseOver(false)}>
      {!data || data?.pages[0].total === 0 ? (
        <EmptyPlaylist />
      ) : (
        <div>
          {data?.pages.map((page, idx) => (
            <PlaylistItem key={idx} items={page.items} />
          ))}
          <div ref={ref}>{isFetchingNextPage && <LoadingSpinner />}</div>
        </div>
      )}
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
