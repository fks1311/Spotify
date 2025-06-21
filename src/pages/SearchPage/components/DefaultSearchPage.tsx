import { LoadingSpinner } from "../../../common/components/LoadingSpinner";
import { useGetServeralCategories } from "../../../hooks/useGetServeralCategories";
import { Box, Grid, styled, Typography } from "@mui/material";

const DefaultSearchPage = () => {
  const { data, isLoading } = useGetServeralCategories({ limit: 20, offset: 0 });

  if (isLoading) return <LoadingSpinner />;

  const categories = data?.pages[0]?.categories?.items;
  const addColorCategoris = categories?.map((data) => ({
    ...data,
    randomColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
  }));

  return (
    <Container>
      {addColorCategoris && addColorCategoris.length > 0 ? (
        <Grid container spacing={2}>
          {addColorCategoris.map((category: any, idx: number) => (
            <Content key={category.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Contentbox color={category.randomColor}>
                <CategoryName
                  sx={{
                    fontSize: {
                      xs: "1.5rem",
                      sm: "1rem",
                      md: "1rem",
                      lg: "1.5rem",
                      xl: "1.5rem",
                    },
                    fontWeight: 600,
                  }}
                >
                  {category.name}
                </CategoryName>
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

interface ContentBoxStyleProps {
  color: "string";
}
const Contentbox = styled(Box)<ContentBoxStyleProps>(({ color }) => ({
  position: "relative",
  backgroundColor: color,
  borderRadius: "10px",
  overflow: "hidden",
  aspectRatio: "2 / 1",
}));
const CategoryName = styled(Typography)({
  padding: "1rem",
  color: "white",
});
const CategoryImg = styled("img")({
  position: "absolute",
  width: "45%",
  bottom: "-10%",
  right: "-8%",
  transform: `rotate(25deg)`,
});

export default DefaultSearchPage;
