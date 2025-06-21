import { Button } from "@mui/material";
import { getSpotifyAuthUrl } from "../../utils/getSpotifyAuthUrl";

const LoginButton = () => {
  const login = () => getSpotifyAuthUrl();

  return (
    <Button variant="contained" color="secondary" size="large" onClick={login}>
      Log in
    </Button>
  );
};

export default LoginButton;
