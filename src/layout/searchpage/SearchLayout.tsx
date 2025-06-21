import { styled } from "@mui/material";
import SearchBar from "../../common/components/SearchBar";

interface SearchBarProps {
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
}
interface SearchLayoutProps extends SearchBarProps {
  children: React.ReactNode;
}
const SearchLayout = ({ children, keyword, setKeyword }: SearchLayoutProps) => {
  return (
    <Layout>
      <SearchBar keyword={keyword} setKeyword={setKeyword} placeholder={"어떤 컨텐츠를 감상하고 싶으세요?"} />
      {children}
    </Layout>
  );
};

const Layout = styled("div")({
  position: "absolute",
  top: 15,
  padding: "0 1rem",
});

export default SearchLayout;
