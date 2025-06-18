import { styled } from "@mui/material";
import NewReleases from "../../components/homepage/NewReleases";
import ServeralCategories from "../../components/homepage/ServeralCategories";

const HomePage = () => {
  return (
    <Container>
      <NewReleases />
      <ServeralCategories />
    </Container>
  );
};

const Container = styled("div")({
  padding: `0 1rem`,
});
export default HomePage;
