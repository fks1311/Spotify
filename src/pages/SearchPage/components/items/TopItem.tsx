import { Box, styled, Typography } from "@mui/material";
import ItemLayout from "../../../../layout/searchpage/ItemLayout";
import { Artist } from "../../../../models/artist";
import { SecondayText } from "../../../../common/style/SearchStyle";

interface ArtistItemProps {
  artists: Artist[];
}
const TopItem = ({ artists }: ArtistItemProps) => {
  return (
    <ItemLayout title="상위 결과" width="30%">
      <Layout onClick={() => alert("진행 예정입니다")}>
        <ArtistImg src={artists?.[0]?.images?.[0].url} />
        <TextContainer>
          <Typography variant="h1" sx={{ fontWeight: 700 }}>
            {artists?.[0]?.name}
          </Typography>
          <SecondayText>아티스트</SecondayText>
        </TextContainer>
      </Layout>
    </ItemLayout>
  );
};

const Layout = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
  padding: "1rem",
  borderRadius: "10px",
  boxShadow: `rgba(0, 0, 0, 0.35) 0px 5px 15px`,
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    cursor: "pointer",
  },
}));
const ArtistImg = styled("img")({
  height: "130px",
  width: "130px",
  borderRadius: "50%",
});
const TextContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
});
export default TopItem;
