import ItemLayout from "../../../../layout/searchpage/ItemLayout";
import { SimplifiedAlbumObject } from "../../../../models/album";
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
import { useNavigate } from "react-router";

interface AlbumItemProps {
  albums: SimplifiedAlbumObject[];
}
const AlbumItem = ({ albums }: AlbumItemProps) => {
  const navigate = useNavigate();
  return (
    <ItemLayout title="앨범" width="100%">
      <Layout>
        {albums.map((album, idx) => (
          <Content key={album.id} onClick={() => navigate(`/explore/album/${album?.id}`)}>
            <HoverLayout>
              <ItemImg src={album.images[0].url} />
              <Overlay className="overlay">
                <PlayButton />
              </Overlay>
            </HoverLayout>
            <div>
              <LineClamp2Text>{album.name}</LineClamp2Text>
              <SecondayText>{`${album.release_date.slice(0, 4)} • ${album?.artists?.[0]?.name}`}</SecondayText>
            </div>
          </Content>
        ))}
      </Layout>
    </ItemLayout>
  );
};

export default AlbumItem;
