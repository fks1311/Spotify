import moment from "moment";
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
import { SimplifiedEpisodeObject } from "../../../../models/track";
import { formatDate } from "../../../../utils/date";

interface EpisodeItemProps {
  episodes: SimplifiedEpisodeObject[];
}
const EpisodeItem = ({ episodes }: EpisodeItemProps) => {
  return (
    <ItemLayout title="에피소드" width="100%">
      <Layout>
        {episodes.map((episode) => (
          <Content key={episode.id} onClick={() => alert("진행 예정입니다")}>
            <HoverLayout>
              <ItemImg src={episode.images[0].url} />
              <Overlay className="overlay">
                <PlayButton />
              </Overlay>
            </HoverLayout>
            <div>
              <LineClamp2Text>{episode.name}</LineClamp2Text>
              <SecondayText>{`${formatDate(episode.release_date)} • ${moment(episode.duration_ms).format(
                "mm:ss"
              )}`}</SecondayText>
            </div>
          </Content>
        ))}
      </Layout>
    </ItemLayout>
  );
};

export default EpisodeItem;
