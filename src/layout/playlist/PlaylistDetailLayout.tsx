import { Avatar, Box, styled, TableContainer, Typography } from "@mui/material";
import { useGetCurrentUserProfile } from "../../hooks/useGetCurrentUserProfile";
import LoginButton from "../../components/global/LoginButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { forwardRef } from "react";
import { PlaylistResponse } from "../../models/playlist";
import ModalLayout from "../ModalLayout";
import OptionButton from "../../components/global/OptionButton";
import { useOpenContext } from "../../components/global/ContextProvider";

interface PlaylistDetailLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  playlist: PlaylistResponse;
}

export const PlaylistDetailLayout = forwardRef<HTMLDivElement, PlaylistDetailLayoutProps>(
  ({ playlist, children }, ref) => {
    const { data: user } = useGetCurrentUserProfile();
    const { option, setOption } = useOpenContext();

    return (
      <StyledTableContainer>
        {!user ? (
          <ReqLoginBox>
            <Typography variant="h2" fontWeight={700} mb="20px">
              다시 로그인 하세요
            </Typography>
            <LoginButton />
          </ReqLoginBox>
        ) : (
          <ContentLayout>
            <ModalLayout />
            <div style={{ padding: `1rem` }}>
              <PlaylistHeader>
                <LargeAvarta src={playlist?.images?.[0]?.url} variant="rounded" />
                <div>
                  <LargeTypography>{playlist?.name}</LargeTypography>
                  <Typography variant="h1">{playlist?.owner?.display_name}</Typography>
                </div>
              </PlaylistHeader>
              <OptionBtn>
                <MoreHorizIcon onClick={() => setOption({ isOpen: !option.isOpen })} sx={{ cursor: "pointer" }} />
                <OptionButton />
              </OptionBtn>
            </div>
            <>{children}</>
          </ContentLayout>
        )}
      </StyledTableContainer>
    );
  }
);

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  background: theme.palette.background.paper,
  color: theme.palette.common.white,
  height: "calc(100% - 64px)",
  borderRadius: "8px",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  msOverflowStyle: "none", // IE and Edge
  scrollbarWidth: "none", // Firefox
}));

const ContentLayout = styled("div")({
  position: "relative",
});

const ReqLoginBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
});

const OptionBtn = styled("div")(({ theme }) => ({
  display: `flex`,
  justifyContent: "flex-end",
  padding: "1rem",
  position: `relative`,
}));

const PlaylistHeader = styled(Box)({
  display: "flex",
  gap: `1rem`,
  width: "100%",
  // padding: "1rem",
});
const LargeAvarta = styled(Avatar)({
  width: 200,
  height: 200,
  borderRadius: 8,
});
const LargeTypography = styled(Typography)({
  fontSize: `3.5rem`,
});
