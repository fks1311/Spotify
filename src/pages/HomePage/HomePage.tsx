import { styled } from "@mui/material";
import NewReleases from "./components/NewReleases";
import ServeralCategories from "./components/ServeralCategories";
import NewestArtist from "./components/NewestArtist";
import NewestPlaylist from "./components/NewestPlaylist";
import NewestAlbum from "./components/NewestAlbum";

const HomePage = () => {
  return (
    <Container>
      <NewReleases />
      <NewestArtist />
      <NewestAlbum />
      <NewestPlaylist />
      <ServeralCategories />
    </Container>
  );
};

const Container = styled("div")({
  padding: `0 1rem`,
});
export default HomePage;
