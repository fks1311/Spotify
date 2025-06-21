import { Box, styled } from "@mui/material";

export const ListContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  overflowX: "scroll",
  "&::-webkit-scrollbar": {
    height: "4px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: theme.palette.action.hover,
    borderRadius: "10px",
  },
}));
