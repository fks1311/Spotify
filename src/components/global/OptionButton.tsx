import { styled } from "@mui/material";
import { useOpenContext } from "./ContextProvider";
import { useUnfollowPlaylist } from "../../hooks/useUnfollowPlaylist";
import { useParams } from "react-router";

const OptionButton = () => {
  const { option, setOption } = useOpenContext();
  const { mutate: unfollowPlaylist } = useUnfollowPlaylist();
  const { id } = useParams<{ id: string }>();
  const { modal, setModal } = useOpenContext();

  const handleChangePlaylistName = () => {};
  const handleChangeCoverImg = () => {};
  const handleUnfollowPlaylist = () => {
    if (id) {
      setModal({ isOpen: true, data: undefined, type: "unfollow" });
      // unfollowPlaylist({ id: id, ids: [id] });
    }
  };

  return (
    <>
      {option.isOpen ? (
        <UlStyle>
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
}));
export default OptionButton;
