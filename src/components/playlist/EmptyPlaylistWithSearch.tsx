import { styled, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useSearchItemsByKeyword } from "../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../models/search";
import SearchResultList from "./SearchResultList";
import { Box } from "@mui/system";
import { LoadingSpinner } from "../LoadingSpinner";

const EmptyPlaylistWithSearch = () => {
  const [keyword, setKeyword] = useState<string>("");
  const { data, error, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useSearchItemsByKeyword({
    q: keyword,
    type: Object.values(SEARCH_TYPE),
  });
  const handleSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  // vvxsd

  const validEntries =
    data?.pages.map((item) => Object.entries(item).filter(([_, value]) => value?.items?.length > 0)) ?? [];

  const hasResult = validEntries.some((entries) => entries.length > 0);

  return (
    <>
      <Container>
        <Typography variant="h1" my={"10px"}>
          플레이리스트에 추가할 곡을 찾아보세요
        </Typography>
        <TextField
          value={keyword}
          onChange={handleSearchKeyword}
          style={{ width: "100%" }}
          placeholder="곡 또는 아티스트를 검색하세요"
        />
      </Container>
      {isLoading ? (
        <LoadingSpinner />
      ) : hasResult ? (
        validEntries.map((entryGroup, pageIdx) =>
          entryGroup.map(([key, value]) => (
            <SearchResultList
              key={`${pageIdx}-${key}`}
              list={value.items}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              fetchNextPage={fetchNextPage}
            />
          ))
        )
      ) : keyword === "" ? (
        <></>
      ) : (
        <div>{`No Result for ${keyword}`}</div>
      )}
      {/* {data?.pages.map((item, idx) => {
        const validEntries = Object.entries(item).filter(([_, value]) => value?.items?.length > 0);
        if (validEntries.length === 0) return null;
        return validEntries.map(([key, value]) => {
          return <SearchResultList key={`${idx}-${key}`} list={value.items} />;
        });
      })}*/}
    </>
  );
};

const Container = styled(Box)({
  width: "100%",
  padding: `1rem`,
  display: "flex",
  flexDirection: "column",
  gap: `1rem`,
});

export default EmptyPlaylistWithSearch;
