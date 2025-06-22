import { styled } from "@mui/material";
import { useOpenContext } from "../ContextProvider";
import { useParams } from "react-router";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useRef } from "react";

const OptionButton = () => {
  const { option, setOption } = useOpenContext();
  const { id } = useParams<{ id: string }>();
  const { setModal } = useOpenContext();
  const ref = useRef<HTMLUListElement>(null) as React.RefObject<HTMLUListElement>;

  const handleChangePlaylistName = () => {
    if (id) {
      setModal({ isOpen: true, type: "change", txt: "해당 재생목록의 이름을 변경하시겠습니까?" });
    }
  };
  const handleChangeCoverImg = () => {
    alert("진행 예정입니다.");
  };
  const handleUnfollowPlaylist = () => {
    if (id) {
      setModal({ isOpen: true, type: "unfollow", txt: "해당 재생목록을 삭제하시겠습니까?" });
    }
  };

  useClickOutside(ref, () => {
    if (typeof setOption === "function") {
      setOption({ isOpen: false });
    }
  });

  return (
    <>
      {option.isOpen ? (
        <UlStyle ref={ref}>
          <li onClick={() => handleChangePlaylistName()}>재생목록 이름 변경</li>
          <li onClick={() => handleChangeCoverImg()}>재생목록 커버 변경</li>
          <li onClick={() => handleUnfollowPlaylist()}>재생목록 삭제</li>
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
  cursor: "pointer",
}));
export default OptionButton;
