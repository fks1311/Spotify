import { Box, styled } from "@mui/material";
import LoginButton from "../components/LoginButton";
import { useGetCurrentUserProfile } from "../hooks/useGetCurrentUserProfile";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { getLocalStorageSafe } from "../utils/localStorage";
import { useSetRecoilState } from "recoil";
import { triggerAtom } from "../utils/atom";
import { useQueryClient } from "@tanstack/react-query";

// trigger
const Navbar = () => {
  const setTrigger = useSetRecoilState(triggerAtom);
  const { data: userProfile } = useGetCurrentUserProfile();
  const accessToken = getLocalStorageSafe("access_token");
  const url = new URL(window.location.href);
  const queryClient = useQueryClient();

  const logout = () => {
    window.localStorage.removeItem("access_token");
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

  return (
    <Box display={"flex"} justifyContent={"flex-end"} alignItems={"center"} height={"64px"}>
      {!accessToken || !userProfile ? <LoginButton /> : <IsProfileImg />}
    </Box>
  );
};

const ProfileImg = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.5rem",
  padding: "8px",
  cursor: "pointer",
});

export default Navbar;
