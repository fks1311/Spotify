import { Box, styled, Typography } from "@mui/material";

const TrackListLayout = ({ children, title }: { children: React.ReactNode; title: string }) => {
  return (
    <Container>
      <Title>
        <Typography variant="h1" paddingBottom="8px">
          {title}
        </Typography>
        <Typography>모두 표시</Typography>
      </Title>
      {children}
    </Container>
  );
};

const Container = styled("div")({ padding: `1rem` });
const Title = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
});

export default TrackListLayout;
