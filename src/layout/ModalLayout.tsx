import { Box, Modal, styled, Typography } from "@mui/material";
import { useOpenContext } from "../components/global/ContextProvider";
import { useRemovePlaylistItems } from "../hooks/useRemovePlaylistItems";
import { useUnfollowPlaylist } from "../hooks/useUnfollowPlaylist";
import { useParams } from "react-router";

const ModalLayout = () => {
  const { modal, setModal } = useOpenContext();
  const { mutate: removeItem } = useRemovePlaylistItems();
  const { mutate: unfollow } = useUnfollowPlaylist();
  const { id } = useParams<{ id: string }>();

  const RemovePlaylistItem = () => {
    const removePlaylistItem = () => {
      if (modal?.data) {
        removeItem(modal.data);
      }
    };

    return <button onClick={() => removePlaylistItem()}>삭제</button>;
  };

  const UnfollowPlaylist = () => {
    const unfollowPlaylist = () => {
      if (id) {
        unfollow({ id: id, ids: [id] });
      }
    };
    return <button onClick={() => unfollowPlaylist()}>삭제2</button>;
  };

  return (
    <>
      {modal ? (
        <ModalContainer
          open={modal.isOpen}
          onClose={() => setModal({ isOpen: false })}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Content>
            <Typography variant="h1">해당 항목을 삭제하시겠습니까?</Typography>
            <BtnContainer>
              <button onClick={() => setModal({ isOpen: false })}>취소</button>
              {modal?.type === "unfollow" ? UnfollowPlaylist() : RemovePlaylistItem()}
            </BtnContainer>
          </Content>
        </ModalContainer>
      ) : (
        <></>
      )}
    </>
  );
};

const ModalContainer = styled(Modal)({
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const Content = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "4rem",
  padding: "3rem",
  backgroundColor: theme.palette.background.paper,
  borderRadius: "8px",
}));

const BtnContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-around",
  button: {
    border: "none",
    padding: `0.5rem 3rem`,
    backgroundColor: theme.palette.secondary.main,
    borderRadius: `8px`,
    cursor: "pointer",
  },
}));

export default ModalLayout;
