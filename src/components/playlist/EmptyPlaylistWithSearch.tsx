import { TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useSearchItemsByKeyword } from "../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../models/search";
import SearchResultList from "./SearchResultList";

const EmptyPlaylistWithSearch = () => {
  const [keyword, setKeyword] = useState<string>("");
  const { data, error, isLoading } = useSearchItemsByKeyword({
    q: keyword,
    type: Object.values(SEARCH_TYPE),
  });
  const handleSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  if (error) {
  }

  return (
    <div style={{ width: "100%" }}>
      <Typography variant="h1" my={"10px"}>
        플레이리스트에 추가할 곡을 찾아보세요
      </Typography>
      <TextField value={keyword} onChange={handleSearchKeyword} style={{ width: "100%" }} />
      {data?.pages.map((item, idx) => {
        const validEntries = Object.entries(item).filter(([_, value]) => value?.items?.length > 0);
        if (validEntries.length === 0) return null;
        return validEntries.map(([key, value]) => {
          return <SearchResultList key={`${idx}-${key}`} list={value.items} />;
        });
      })}
    </div>
  );
};

export default EmptyPlaylistWithSearch;
