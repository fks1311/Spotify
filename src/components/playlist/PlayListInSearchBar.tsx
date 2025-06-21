import { Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import SearchBar from "../common/SearchBar";

interface SearchBarProps {
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
}

// Playlist page - 비어있을 때 search
const PlayListInSearchBar = ({ keyword, setKeyword }: SearchBarProps) => {
  return (
    <Container>
      <Typography variant="h1" my={"10px"}>
        플레이리스트에 추가할 곡을 찾아보세요
      </Typography>
      <SearchBar keyword={keyword} setKeyword={setKeyword} placeholder={"곡 또는 아티스트를 검색하세요"} />
    </Container>
  );
};

const Container = styled(Box)({
  width: "100%",
  padding: `1rem`,
  display: "flex",
  flexDirection: "column",
  gap: `1rem`,
});

export default PlayListInSearchBar;
