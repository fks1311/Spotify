import { Box, Typography } from "@mui/material";
import { useSearchCategory } from "../../hooks/useSearchCategory";
import TrackListLayout from "../../layout/homepage/TrackListLayout";
import { SEARCH_TYPE } from "../../models/search";
import { LoadingSpinner } from "../../common/components/LoadingSpinner";
import { ListContainer } from "./NewReleases";
import Card from "../album/Card";

const NewestPlaylist = () => {
  const { data, isLoading } = useSearchCategory({
    q: "k-pop",
    type: [SEARCH_TYPE.Playlist],
  });

  if (isLoading) return <LoadingSpinner />;

  const playlists = data?.pages[0]?.playlists?.items ?? [];

  return (
    <TrackListLayout title="플레이리스트">
      {playlists.length > 0 ? (
        <ListContainer>
          {playlists.map((artist: any) => {
            if (artist !== null) {
              return (
                <Box
                  key={artist.id}
                  sx={{
                    minWidth: 180,
                    marginBottom: "10px",
                  }}
                >
                  <Card name={artist.name} image={artist.images[0].url} />
                </Box>
              );
            }
          })}
        </ListContainer>
      ) : (
        <Typography variant="h2">No data</Typography>
      )}
    </TrackListLayout>
  );
};

export default NewestPlaylist;
