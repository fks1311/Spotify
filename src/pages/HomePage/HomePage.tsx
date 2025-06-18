import { styled } from "@mui/material";
import NewReleases from "../../components/homepage/NewReleases";

const HomePage = () => {
  return (
    <Container>
      <NewReleases />
    </Container>
  );
};

const Container = styled("div")({
  padding: `0 1rem`,
});
export default HomePage;
