import { styled } from "@mui/material";
import React from "react";

const PlayButton: React.FC = () => {
  return (
    <Container>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 5v14l11-7z" fill="black" />
      </svg>
    </Container>
  );
};

const Container = styled("button")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "35px",
  width: "35px",
  border: "none",
  borderRadius: "50%",
  backgroundColor: theme.palette.primary.main,
}));

export default PlayButton;
