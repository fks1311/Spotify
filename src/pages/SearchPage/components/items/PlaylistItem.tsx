import PlayButton from "../../../../common/components/PlayButton";
import {
  Content,
  HoverLayout,
  ItemImg,
  Layout,
  LineClamp2Text,
  Overlay,
  SecondayText,
} from "../../../../style/SearchStyle";
import ItemLayout from "../../../../layout/searchpage/ItemLayout";
import { SimplifiedPlaylistObject } from "../../../../models/playlist";

interface PlaylistItemProps {
  playlists: SimplifiedPlaylistObject[];
}
const PlaylistItem = ({ playlists }: PlaylistItemProps) => {
  return (
    <ItemLayout title="플레이리스트" width="100%">
      <Layout>
        {playlists.map((playlist) => (
          <Content key={playlist.id} onClick={() => alert("진행 예정입니다")}>
            <HoverLayout>
              <ItemImg src={playlist?.images?.[0].url} />
              <Overlay className="overlay">
                <PlayButton />
              </Overlay>
            </HoverLayout>
            <div>
              <LineClamp2Text>{playlist.name}</LineClamp2Text>
              <SecondayText>{`만든 사람: ${playlist.owner?.display_name}`}</SecondayText>
            </div>
          </Content>
        ))}
      </Layout>
    </ItemLayout>
  );
};

export default PlaylistItem;
