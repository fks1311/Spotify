import { styled } from "@mui/material";
import NewReleases from "../../components/homepage/NewReleases";
import ServeralCategories from "../../components/homepage/ServeralCategories";
import NewestArtist from "../../components/homepage/NewestArtist";
import NewestPlaylist from "../../components/homepage/NewestPlaylist";
import NewestAlbum from "../../components/homepage/NewestAlbum";

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
