import ItemLayout from "../../../../layout/searchpage/ItemLayout";
import { Artist } from "../../../../models/artist";
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

interface ArtistItemProps {
  artists: Artist[];
}
const ArtistItem = ({ artists }: ArtistItemProps) => {
  const navigate = useNavigate();
  return (
    <ItemLayout title="아티스트" width="100%">
      <Layout>
        {artists.map((artist, idx) => (
          <Content key={artist.id} onClick={() => navigate(`/explore/artist/${artists?.[idx].id}`)}>
            <HoverLayout>
              <ItemImg src={artist?.images?.[0]?.url} sx={{ borderRadius: "50%" }} />
              <Overlay className="overlay">
                <PlayButton />
              </Overlay>
            </HoverLayout>
            <div>
              <LineClamp2Text>{artist.name}</LineClamp2Text>
              <SecondayText>아티스트</SecondayText>
            </div>
          </Content>
        ))}
      </Layout>
    </ItemLayout>
  );
};

export default ArtistItem;
