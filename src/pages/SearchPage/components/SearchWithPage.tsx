import { Box, styled } from "@mui/material";
import { useSearchItemsByKeyword } from "../../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../../models/search";
import TopItem from "./items/TopItem";
import TrackItem from "./items/TrackItem";
import ArtistItem from "./items/ArtistItem";
import AlbumItem from "./items/AlbumItem";
import PlaylistItem from "./items/PlaylistItem";
import PodcastItem from "./items/PodcastItem";
import EpisodeItem from "./items/EpisodeItem";
import { LoadingSpinner } from "../../../common/components/LoadingSpinner";

interface SearchWithPageProps {
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
}
export default function SearchWithPage({ keyword, setKeyword }: SearchWithPageProps) {
  const { data, error, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useSearchItemsByKeyword({
    q: keyword,
    type: Object.values(SEARCH_TYPE),
  });

  if (isLoading) return <LoadingSpinner />;

  const defaultValues = data?.pages[0];
  const tracks = defaultValues?.tracks?.items?.filter(Boolean).slice(0, 4) ?? [];
  const artists = defaultValues?.artists?.items?.filter(Boolean).slice(0, 8) ?? [];
  const albums = defaultValues?.albums?.items?.filter(Boolean).slice(0, 8) ?? [];
  const playlists = defaultValues?.playlists?.items?.filter(Boolean).slice(0, 8) ?? [];
  const podcasts = defaultValues?.shows?.items?.filter(Boolean).slice(0, 8) ?? [];
  const episodes = defaultValues?.episodes?.items?.filter(Boolean).slice(0, 8) ?? [];

  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          gap: "1rem",
          flexDirection: {
            xs: "column",
            sm: "column",
            md: "column",
            lg: "row",
            xl: "row",
          },
        }}
      >
        {artists.length > 0 && <TopItem artists={artists} />}
        {tracks.length > 0 && <TrackItem tracks={tracks} />}
      </Box>
      {artists.length > 0 && <ArtistItem artists={artists} />}
      {albums.length > 0 && <AlbumItem albums={albums} />}
      {playlists.length > 0 && <PlaylistItem playlists={playlists} />}
      {podcasts.length > 0 && <PodcastItem podcasts={podcasts} />}
      {episodes.length > 0 && <EpisodeItem episodes={episodes} />}
    </Layout>
  );
}

const Layout = styled("div")({ marginTop: "1rem", padding: "0px 2rem 1rem 1rem" });
