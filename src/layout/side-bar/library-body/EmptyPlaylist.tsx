import { Button, Card, styled, Typography } from "@mui/material";
import { useGetCurrentUserProfile } from "../../../hooks/useGetCurrentUserProfile";
import { useCreatePlaylist } from "../../../hooks/useCreatePlaylist";
import { getSpotifyAuthUrl } from "../../../utils/getSpotifyAuthUrl";

const EmptyPlaylist = () => {
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
    <EmptyPlaylistCard>
      <Typography variant="h2" fontWeight={700}>
        Create your first playlist
      </Typography>
      <Typography variant="body2">It's easy, we'll help you</Typography>
      <CreatePlaylistButton variant="contained" color="secondary" onClick={handleCreatePlaylist}>
        Create playlist
      </CreatePlaylistButton>
    </EmptyPlaylistCard>
  );
};

const EmptyPlaylistCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,

  padding: "20px",
  borderRadius: "8px",
}));

const CreatePlaylistButton = styled(Button)({
  marginTop: "20px",
  fontWeight: "700",
});

export default EmptyPlaylist;
