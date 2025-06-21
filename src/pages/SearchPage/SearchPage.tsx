import { useState } from "react";
import SearchLayout from "../../layout/searchpage/SearchLayout";
import DefaultSearchPage from "./components/DefaultSearchPage";
import SearchWithPage from "./components/SearchWithPage";

const SearchPage = () => {
  const [keyword, setKeyword] = useState<string>("");

  return (
    <SearchLayout keyword={keyword} setKeyword={setKeyword}>
      {keyword === "" ? <DefaultSearchPage /> : <SearchWithPage />}
    </SearchLayout>
  );
};

export default SearchPage;
