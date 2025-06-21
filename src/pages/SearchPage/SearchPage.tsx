import { Box, Grid, styled, Typography } from "@mui/material";
import { LoadingSpinner } from "../../common/components/LoadingSpinner";
import { useGetServeralCategories } from "../../hooks/useGetServeralCategories";

const SearchPage = () => {
  const { data, isLoading } = useGetServeralCategories({ limit: 20, offset: 0 });

  if (isLoading) return <LoadingSpinner />;

  return (
    <Container className="container">
      {data && data?.pages[0]?.categories?.items.length > 0 ? (
        <Grid container spacing={2}>
          {data?.pages[0]?.categories?.items.map((category: any, idx: number) => (
            <Content key={category.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Contentbox>
                <CategoryName variant="h1">{category.name}</CategoryName>
                <CategoryImg src={category.icons[0].url} />
              </Contentbox>
            </Content>
          ))}
        </Grid>
      ) : (
        <Typography variant="h2">No data</Typography>
      )}
    </Container>
  );
};

const Container = styled("div")({
  marginTop: "1rem",
});
const Content = styled(Grid)({});
const Contentbox = styled(Box)({
  position: "relative",
  backgroundColor: "#C83F12",
  borderRadius: "10px",
  overflow: "hidden",
  aspectRatio: "2 / 1",
});
const CategoryName = styled(Typography)({
  padding: "1rem",
});
const CategoryImg = styled("img")({
  position: "absolute",
  width: "45%",
  bottom: "-10%",
  right: "-8%",
  transform: `rotate(25deg)`,
});

export default SearchPage;
