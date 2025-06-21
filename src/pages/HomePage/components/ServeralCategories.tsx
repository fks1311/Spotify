import { Box } from "@mui/system";
import { useGetServeralCategories } from "../../../hooks/useGetServeralCategories";
import TrackListLayout from "../../../layout/homepage/TrackListLayout";
import { LoadingSpinner } from "../../../common/components/LoadingSpinner";
import { Typography } from "@mui/material";
import Card from "../../../common/components/Card";
import { ListContainer } from "../../../common/style/ListContainer";

const ServeralCategories = () => {
  const { data, isLoading } = useGetServeralCategories({ limit: 10, offset: 0 });

  if (isLoading) return <LoadingSpinner />;

  return (
    <TrackListLayout title="카테고리">
      {data && data?.pages[0]?.categories?.items.length > 0 ? (
        <ListContainer>
          {data?.pages[0]?.categories?.items.map((category: any, idx: number) => (
            <Box
              key={category.id}
              sx={{
                minWidth: 180,
                marginBottom: "10px",
              }}
            >
              <Card name={category.name} image={category.icons[0].url} />
            </Box>
          ))}
        </ListContainer>
      ) : (
        <Typography variant="h2">No data</Typography>
      )}
    </TrackListLayout>
  );
};

export default ServeralCategories;
