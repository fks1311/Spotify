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
import ItemLayout from "../../../../layout/searchpage/ItemLayout";
import { Show } from "../../../../models/track";

interface PodcastItemProps {
  podcasts: Show[];
}
const PodcastItem = ({ podcasts }: PodcastItemProps) => {
  return (
    <ItemLayout title="팟캐스트" width="100%">
      <Layout>
        {podcasts.map((podcast) => (
          <Content key={podcast.id} onClick={() => alert("진행 예정입니다")}>
            <HoverLayout>
              <ItemImg src={podcast.images[0].url} />
              <Overlay className="overlay">
                <PlayButton />
              </Overlay>
            </HoverLayout>
            <div>
              <LineClamp2Text>{podcast.name}</LineClamp2Text>
              <SecondayText>팟캐스트</SecondayText>
            </div>
          </Content>
        ))}
      </Layout>
    </ItemLayout>
  );
};

export default PodcastItem;
