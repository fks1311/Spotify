import { styled } from "@mui/material";
import { useState } from "react";
import { useSearchItemsByKeyword } from "../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../models/search";
import { Box } from "@mui/system";
import SearchResultList from "../../components/playlist/SearchResultList";
import { LoadingSpinner } from "../../common/components/LoadingSpinner";
import PlayListInSearchBar from "../../components/playlist/PlayListInSearchBar";
import PlaylistTrackList from "./PlaylistTrackList";

interface PlaylistTrackListProps {
  id: string;
}
// playlist page - 곡 비어있을 때
const EmptyPlaylistWithSearch = ({ id }: PlaylistTrackListProps) => {
  const [keyword, setKeyword] = useState<string>("");
  const { data, error, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useSearchItemsByKeyword({
    q: keyword,
    type: Object.values(SEARCH_TYPE),
  });

  const validEntries =
    data?.pages.map((item) => Object.entries(item).filter(([_, value]) => value?.items?.length > 0)) ?? [];

  const hasResult = validEntries.some((entries) => entries.length > 0);

  return (
    <>
      {hasResult ? <PlaylistTrackList id={id} /> : <></>}
      <PlayListInSearchBar keyword={keyword} setKeyword={setKeyword} />
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
