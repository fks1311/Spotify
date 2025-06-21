import { Box, Modal, styled, Typography } from "@mui/material";
import { useOpenContext } from "../common/ContextProvider";
import { useRemovePlaylistItems } from "../hooks/useRemovePlaylistItems";
import { useUnfollowPlaylist } from "../hooks/useUnfollowPlaylist";
import { useParams } from "react-router";
import ChangingNameModal from "../components/playlist/ChangingNameModal";
import { useState } from "react";

const ModalLayout = () => {
  const { modal, setModal } = useOpenContext();
  const { mutate: removeItem } = useRemovePlaylistItems();
  const { mutate: unfollow } = useUnfollowPlaylist();
  const { id } = useParams<{ id: string }>();
  const [childModal, setChildModal] = useState<boolean>(false);

  const renderPlaylistActionButton = (type: string) => {
    switch (type) {
      case "remove": // 재생목록 항목 삭제
        const removePlaylistItem = () => {
          if (modal?.data) {
            removeItem(modal.data);
          }
        };
        return <button onClick={() => removePlaylistItem()}>삭제</button>;

      case "unfollow": // 재생목록 삭제
        const unfollowPlaylist = () => {
          if (id) {
            unfollow({ id: id, ids: [id] });
          }
        };
        return <button onClick={() => unfollowPlaylist()}>삭제</button>;

      case "change": // 재생목록 이름 변경
        return <button onClick={() => setChildModal(true)}>변경</button>;
    }
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
            <Typography variant="h1">{`${modal.txt}`}</Typography>
            {childModal ? <ChangingNameModal childModal={childModal} setChildModal={setChildModal} /> : <></>}
            <BtnContainer>
              <button onClick={() => setModal({ isOpen: false })}>취소</button>
              {renderPlaylistActionButton(modal?.type!)}
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

export const BtnContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: `1rem`,
  button: {
    border: "none",
    padding: `0.5rem 3rem`,
    backgroundColor: theme.palette.secondary.main,
    borderRadius: `8px`,
    cursor: "pointer",
  },
}));

export default ModalLayout;
