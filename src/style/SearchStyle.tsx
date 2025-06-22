import { Box, styled, Typography } from "@mui/material";

export const Layout = styled(Box)({ display: "flex", gap: "1rem" });
export const Content = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  padding: "0.5rem",
  borderRadius: "10px",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    transform: "translate3d(0px, 0px, 0px)",
    transition: "opacity 0.3s ease-in-out",
    cursor: "pointer",
  },
  "&:hover .overlay": {
    opacity: 1,
  },
}));
export const HoverLayout = styled("div")({
  position: "relative",
  width: "100%",
});
export const Overlay = styled("div")({
  position: "absolute",
  bottom: 0,
  right: 0,
  opacity: 0,
  transform: "translate3d(0px, 0px, 0px)",
  transition: "opacity 0.3s ease-in-out",
});
export const ItemImg = styled("img")({ height: "160px", width: "160px", borderRadius: "10px" });

// 2줄 말줄임
export const LineClamp2Text = styled(Typography)({
  fontSize: "1rem",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const SecondayText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));
