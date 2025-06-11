import { Box, styled } from "@mui/material";
import LoginButton from "../components/LoginButton";
import { useGetCurrentUserProfile } from "../hooks/useGetCurrentUserProfile";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Navbar = () => {
  const { data: userProfile } = useGetCurrentUserProfile();

  const IsProfileImg = () => {
    return (
      <ProfileImg>
        <>
          {userProfile?.images && userProfile?.images?.length > 0 ? (
            <img src={userProfile.images[0].url} />
          ) : (
            <AccountCircleIcon fontSize="large" />
          )}
        </>
        <div>{userProfile?.display_name}</div>
      </ProfileImg>
    );
  };

  return (
    <Box display={"flex"} justifyContent={"flex-end"} alignItems={"center"} height={"64px"}>
      {userProfile ? <IsProfileImg /> : <LoginButton />}
    </Box>
  );
};

const ProfileImg = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "0.5rem",
  padding: "8px",
});

export default Navbar;
