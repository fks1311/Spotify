import { Box, styled } from "@mui/material";
import LoginButton from "../common/components/LoginButton";
import { useGetCurrentUserProfile } from "../hooks/useGetCurrentUserProfile";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { getSessionStorageSafe } from "../utils/sessionStorage";
import { useSetRecoilState } from "recoil";
import { triggerAtom } from "../utils/atom";
import { useQueryClient } from "@tanstack/react-query";

// trigger
const Navbar = () => {
  const setTrigger = useSetRecoilState(triggerAtom);
  const { data: userProfile } = useGetCurrentUserProfile();
  const accessToken = getSessionStorageSafe("access_token");
  const url = new URL(window.location.href);
  const queryClient = useQueryClient();

  const logout = () => {
    window.sessionStorage.clear();
    url.search = "";
    window.history.replaceState(null, "", url.toString());
    queryClient.removeQueries();
    setTrigger((prev) => prev + 1);
  };

  const IsProfileImg = () => {
    return (
      <ProfileImg>
        <>
          {userProfile?.images && userProfile?.images?.length > 0 ? (
            <img src={userProfile.images[0].url} onClick={logout} />
          ) : (
            <AccountCircleIcon fontSize="large" onClick={logout} />
          )}
        </>
        <div>{userProfile?.display_name}</div>
      </ProfileImg>
    );
  };

  return <Container>{!accessToken || !userProfile ? <LoginButton /> : <IsProfileImg />}</Container>;
};

const Container = styled(Box)(({}) => ({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  height: "64px",
}));
const ProfileImg = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.5rem",
  padding: "8px",
  cursor: "pointer",
});

export default Navbar;
