import { Box, styled, Typography } from "@mui/material";
import { NavLink } from "react-router";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import Library from "../common/components/side-bar/Library";
import LibraryHead from "../common/components/side-bar/LibraryHead";

const Side_bar = () => {
  return (
    <>
      <Sidebar>
        <ContentBox>
          <NavList>
            <StyledNavLink to={"/"}>
              <HomeIcon />
              <Typography variant="h2" fontWeight={700}>
                Home
              </Typography>
            </StyledNavLink>
            <StyledNavLink to={"/search"}>
              <SearchIcon />
              <Typography variant="h2" fontWeight={700}>
                Search
              </Typography>
            </StyledNavLink>
          </NavList>
        </ContentBox>
        <ContentBox height={"100%"}>
          <LibraryHead />
          <Library />
        </ContentBox>
      </Sidebar>
    </>
  );
};

const Sidebar = styled("div")(({ theme }) => ({
  width: "331px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  borderRadius: "8px",
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  width: "100%",
  padding: "8px",
}));

const NavList = styled("ul")({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  gap: "20px",
  padding: "5px",
  color: theme.palette.text.secondary,
  "&:hover": { color: theme.palette.text.primary },
  ".active": { color: theme.palette.text.primary },
}));

export default Side_bar;
