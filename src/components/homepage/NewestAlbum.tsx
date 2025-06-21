import { Box, Typography } from "@mui/material";
import { useSearchCategory } from "../../hooks/useSearchCategory";
import TrackListLayout from "../../layout/homepage/TrackListLayout";
import { SEARCH_TYPE } from "../../models/search";
import { LoadingSpinner } from "../../common/components/LoadingSpinner";
import { ListContainer } from "./NewReleases";
import Card from "../album/Card";

const NewestAlbum = () => {
  const { data, isLoading } = useSearchCategory({
    q: "k-pop",
    type: [SEARCH_TYPE.Album],
    limit: 10,
  });

  if (isLoading) return <LoadingSpinner />;

  const album = data?.pages[0]?.albums?.items ?? [];

  return (
    <TrackListLayout title="앨범">
      {album.length > 0 ? (
        <ListContainer>
          {album.map((artist: any) => (
            <Box
              key={artist.id}
              sx={{
                minWidth: 180,
                marginBottom: "10px",
              }}
            >
              <Card name={artist.name} image={artist.images[0].url} />
            </Box>
          ))}
        </ListContainer>
      ) : (
        <Typography variant="h2">No data</Typography>
      )}
    </TrackListLayout>
  );
};

export default NewestAlbum;
