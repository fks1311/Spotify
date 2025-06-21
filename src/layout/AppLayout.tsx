import { Box, styled } from "@mui/material";
import { Outlet, useLocation } from "react-router";
import Navbar from "./Navbar";
import Side_bar from "./Side_bar";

const AppLayout = () => {
  const { pathname } = useLocation();
  return (
    <Layout>
      <Side_bar />
      <ContentBox pathname={pathname}>
        <Navbar />
        <Outlet />
      </ContentBox>
    </Layout>
  );
};

const Layout = styled("div")({
  display: "flex",
  height: "100vh",
  padding: "8px",
  gap: "8px",
});

interface ContentBoxStyleProps {
  pathname: string;
}
const ContentBox = styled(Box)<ContentBoxStyleProps>(({ theme, pathname }) => ({
  borderRadius: "8px",
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  width: "100%",
  padding: "8px",
  marginBottom: "8px",
  marginRight: "8px",
  overflowX: "hidden",
  position: pathname === "/search" ? "relative" : "static",
}));

export default AppLayout;
