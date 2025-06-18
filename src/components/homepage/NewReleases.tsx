import { Box, Grid, styled, Typography } from "@mui/material";
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
    <Container>
      <Title>
        <Typography variant="h1" paddingBottom="8px">
          새 앨범 발매
        </Typography>
        <Typography>모두 표시</Typography>
      </Title>
      {data && data?.albums?.items.length > 0 ? (
        <ListContainer sx={{}}>
          {data.albums.items.map((album) => (
            <Box
              key={album.id}
              sx={{
                minWidth: 180,
              }}
            >
              <Card image={album.images[0].url} name={album.name} artistName={album.artists[0].name} />
            </Box>
          ))}
        </ListContainer>
      ) : (
        <Typography variant="h2">No data</Typography>
      )}
    </Container>
  );
};

const Container = styled("div")({
  padding: `1rem`,
});

const Title = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
});

const ListContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  overflowX: "scroll",
  "&::-webkit-scrollbar": {
    height: "4px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: theme.palette.action.hover,
    borderRadius: "10px",
  },
}));
export default NewReleases;
