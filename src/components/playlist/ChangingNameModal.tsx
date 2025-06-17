import { Box, Modal, styled, TextField, Typography } from "@mui/material";
import { BtnContainer } from "../../layout/ModalLayout";
import { useState } from "react";
import { useParams } from "react-router";
import { useChangePlaylistDetail } from "../../hooks/useChangePlaylistDetail";

interface ChangingNameModalProps {
  childModal: boolean;
  setChildModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChangingNameModal = ({ childModal, setChildModal }: ChangingNameModalProps) => {
  const { mutate: change } = useChangePlaylistDetail();
  const [text, setText] = useState<string>();
  const { id } = useParams<{ id: string }>();
  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const changePlaylistName = () => {
    if (id) {
      change({ playlist_id: id, name: text });
    }
  };

  return (
    <ChildModal
      open={childModal}
      onClose={() => setChildModal(false)}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
    >
      <Content>
        <Typography variant="h1">세부 정보 수정</Typography>
        <TextFieldBox value={text} onChange={handleChangeText} />
        <BtnContainer>
          <button onClick={() => setChildModal(false)}>닫기</button>
          <button onClick={() => changePlaylistName()}>변경</button>
        </BtnContainer>
      </Content>
    </ChildModal>
  );
};

const ChildModal = styled(Modal)({
  display: "flex",
  //   flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});
const Content = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "3rem",
  padding: "4rem",
  backgroundColor: theme.palette.background.paper,
  borderRadius: "8px",
}));
const TextFieldBox = styled(TextField)({
  width: 400,
});
export default ChangingNameModal;
