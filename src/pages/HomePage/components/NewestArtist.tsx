import { Box, Typography } from "@mui/material";
import { useSearchCategory } from "../../../hooks/useSearchCategory";
import TrackListLayout from "../../../layout/homepage/TrackListLayout";
import { SEARCH_TYPE } from "../../../models/search";
import { LoadingSpinner } from "../../../common/components/LoadingSpinner";
import Card from "../../../components/album/Card";
import { ListContainer } from "../../../common/style/ListContainer";

const NewestArtist = () => {
  const { data, isLoading } = useSearchCategory({
    q: "k-pop",
    type: [SEARCH_TYPE.Artist],
    limit: 10,
  });

  if (isLoading) return <LoadingSpinner />;

  const artists = data?.pages[0]?.artists?.items ?? [];

  return (
    <TrackListLayout title="아티스트">
      {artists.length > 0 ? (
        <ListContainer>
          {artists.map((artist: any) => (
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

export default NewestArtist;
