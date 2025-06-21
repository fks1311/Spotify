import { InputAdornment, styled, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
}
const SearchBar = ({ keyword, setKeyword, placeholder }: SearchBarProps) => {
  const handleSearchKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  return (
    <Container
      value={keyword}
      onChange={handleSearchKeyword}
      placeholder={placeholder}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon style={{ color: "white" }} />
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

const Container = styled(TextField)({
  width: "90%",
  "& .MuiInputBase-root ": {
    borderRadius: "30px",
  },
});

export default SearchBar;
