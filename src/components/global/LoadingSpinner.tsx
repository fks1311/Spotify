import { CircularProgress, styled } from "@mui/material";

export const LoadingSpinner = () => {
  return (
    <Container className="loading">
      <CircularProgress variant="indeterminate" />
    </Container>
  );
};

const Container = styled("div")({
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
