import { Box, styled, Typography, Button } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import AddIcon from "@mui/icons-material/Add";
import { useGetCurrentUserProfile } from "../../hooks/useGetCurrentUserProfile";
import { useCreatePlaylist } from "../../hooks/useCreatePlaylist";
import { getSpotifyAuthUrl } from "../../utils/getSpotifyAuthUrl";

const LibraryHead = () => {
  const { data: userProfile } = useGetCurrentUserProfile();
  const { mutate: createPlaylist } = useCreatePlaylist();
  const handleCreatePlaylist = () => {
    if (userProfile) {
      createPlaylist({ name: "나의 플레이 리스트" });
    } else {
      getSpotifyAuthUrl();
    }
  };

  return (
    <Head>
      <Box display="flex">
        <BookmarkIcon sx={{ marginRight: "20px" }} />
        <Typography variant="h2" fontWeight={700}>
          Your Library
        </Typography>
      </Box>
      <Button onClick={handleCreatePlaylist}>
        <AddIcon />
      </Button>
    </Head>
  );
};

const Head = styled("div")({
  display: "flex",
  alignItems: "center",
  padding: "8px",

  justifyContent: "space-between",
});

export default LibraryHead;
