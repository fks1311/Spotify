import { Box, Grid, styled, Typography } from "@mui/material";
import { useGetNewReleases } from "../../../hooks/useGetNewReleases";
import { ErrorMessage } from "../../../common/components/ErrorMessage";
import { LoadingSpinner } from "../../../common/components/LoadingSpinner";
import Card from "../../../common/components/Card";
import TrackListLayout from "../../../layout/homepage/TrackListLayout";
import { ListContainer } from "../../../style/ListContainer";

const NewReleases = () => {
  const { data, error, isLoading } = useGetNewReleases();

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }

  return (
    <TrackListLayout title="새 앨범 발매">
      {data && data?.albums?.items.length > 0 ? (
        <ListContainer sx={{}}>
          {data.albums.items.map((album) => (
            <Box
              key={album.id}
              sx={{
                minWidth: 180,
                marginBottom: "10px",
              }}
            >
              <Card image={album.images[0].url} name={album.name} artistName={album.artists[0].name} />
            </Box>
          ))}
        </ListContainer>
      ) : (
        <Typography variant="h2">No data</Typography>
      )}
    </TrackListLayout>
  );
};

export default NewReleases;
