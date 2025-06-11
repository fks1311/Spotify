import { Box, styled } from "@mui/material";
import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Side_bar from "./side-bar/Side_bar";

const AppLayout = () => {
  return (
    <Layout>
      <Side_bar />
      <ContentBox>
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
});

const ContentBox = styled(Box)(({ theme }) => ({
  borderRadius: "8px",
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  width: "100%",
  padding: "8px",
  marginBottom: "8px",
  marginRight: "8px",
}));

export default AppLayout;
