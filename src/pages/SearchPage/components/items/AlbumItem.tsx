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
} from "../../../../common/style/SearchStyle";

interface AlbumItemProps {
  albums: SimplifiedAlbumObject[];
}
const AlbumItem = ({ albums }: AlbumItemProps) => {
  console.log(albums);
  return (
    <ItemLayout title="앨범" width="100%">
      <Layout>
        {albums.map((album) => (
          <Content key={album.id}>
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
