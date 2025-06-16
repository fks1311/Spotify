import { Grid, Typography } from "@mui/material";
import { useGetNewReleases } from "../../hooks/useGetNewReleases";
import { ErrorMessage } from "../../components/global/ErrorMessage";
import { LoadingSpinner } from "../../components/global/LoadingSpinner";
import Card from "../../components/album/Card";

const NewReleases = () => {
  const { data, error, isLoading } = useGetNewReleases();

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }

  return (
    <div>
      <Typography variant="h1" paddingTop="8px">
        New Released Albums
      </Typography>
      {data && data?.albums?.items.length > 0 ? (
        <Grid container spacing={2}>
          {data.albums.items.map((album) => (
            <Grid key={album.id} size={{ xs: 6, sm: 4, md: 2 }}>
              <Card image={album.images[0].url} name={album.name} artistName={album.artists[0].name} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h2">No data</Typography>
      )}
    </div>
  );
};

export default NewReleases;
