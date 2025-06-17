import { styled } from "@mui/material";
import { useOpenContext } from "./ContextProvider";

const OptionButton = () => {
  const { option, setOption } = useOpenContext();

  return (
    <>
      {option.isOpen ? (
        <UlStyle>
          <li>재생목록 이름 변경</li>
          <li>재생목록 커버 변경</li>
          <li>재생목록 삭제</li>
        </UlStyle>
      ) : (
        <></>
      )}
    </>
  );
};

const UlStyle = styled("ul")(({ theme }) => ({
  position: "absolute",
  right: 23,
  top: 25,
  listStyle: "none",
  padding: 0,
  backgroundColor: theme.palette.action.hover,
  borderRadius: "8px",
  li: {
    padding: `0.5rem`,
  },
}));
export default OptionButton;
