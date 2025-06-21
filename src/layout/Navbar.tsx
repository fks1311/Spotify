import { Box, InputAdornment, styled, TextField } from "@mui/material";
import LoginButton from "../components/global/LoginButton";
import { useGetCurrentUserProfile } from "../hooks/useGetCurrentUserProfile";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { getLocalStorageSafe } from "../utils/localStorage";
import { useSetRecoilState } from "recoil";
import { triggerAtom } from "../utils/atom";
import { useQueryClient } from "@tanstack/react-query";
import { useLocation } from "react-router";
import SearchBar from "../components/common/SearchBar";
import { useState } from "react";

// trigger
const Navbar = () => {
  const setTrigger = useSetRecoilState(triggerAtom);
  const { data: userProfile } = useGetCurrentUserProfile();
  const accessToken = getLocalStorageSafe("access_token");
  const url = new URL(window.location.href);
  const queryClient = useQueryClient();
  const { pathname } = useLocation();
  const [keyword, setKeyword] = useState<string>("");

  const logout = () => {
    window.localStorage.clear();
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
    <Container pathname={pathname}>
      {pathname === "/search" && (
        <SearchBar keyword={keyword} setKeyword={setKeyword} placeholder="어떤 컨텐츠를 감상하고 싶으세요?" />
      )}
      {!accessToken || !userProfile ? <LoginButton /> : <IsProfileImg />}
    </Container>
  );
};

interface ContainerStyleProps {
  pathname: string;
}
const Container = styled(Box)<ContainerStyleProps>(({ pathname }) => ({
  display: "flex",
  justifyContent: pathname === "/search" ? "space-between" : "flex-end",
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
