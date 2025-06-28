import { Avatar, styled, Typography } from "@mui/material";
import React from "react";

interface ExploreLayoutProps {
  children: [React.ReactNode, React.ReactNode];
}
const ExploreLayout = ({ children }: ExploreLayoutProps) => {
  const [headerChildren, mainChildren] = children;
  return (
    <Container>
      <Head>{headerChildren}</Head>
      {mainChildren}
    </Container>
  );
};

const Container = styled("div")({
  padding: "1rem",
  position: "relative",
});

const Head = styled("div")({
  display: "flex",
  gap: `1rem`,
  alignItems: "flex-end",
  marginBottom: `2rem`,
});

export default ExploreLayout;
