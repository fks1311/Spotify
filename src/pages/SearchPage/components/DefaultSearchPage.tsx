import { useInView } from "react-intersection-observer";
import { LoadingSpinner } from "../../../common/components/LoadingSpinner";
import { useGetServeralCategories } from "../../../hooks/useGetServeralCategories";
import { styled, Typography } from "@mui/material";
import { useEffect } from "react";
import CategoryBox from "./items/CategoryBox";

const DefaultSearchPage = () => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetServeralCategories({
    limit: 20,
    offset: 0,
  });
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  if (isLoading) return <LoadingSpinner />;

  const allCategories = data?.pages?.flatMap((page) => page?.categories?.items ?? []);

  return (
    <Container>
      {allCategories && allCategories.length > 0 ? (
        <CategoryBox items={allCategories} inViewRef={ref} />
      ) : (
        <Typography variant="h2">No data</Typography>
      )}
    </Container>
  );
};

const Container = styled("div")({
  marginTop: "1rem",
  padding: "0px 2rem 1rem 1rem",
});

export default DefaultSearchPage;
