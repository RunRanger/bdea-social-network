import { Box } from "@mui/material";
import { CSSProperties, memo } from "react";
import { FixedSizeList as List, areEqual } from "react-window";
import TweetT from "../types/Tweet";
import Tweet from "./Tweet";

type Props = { tweets: TweetT[] };

interface IRowMemo {
  data: TweetT[];
  index: number;
  style: CSSProperties;
}

const TweetList = ({ tweets }: Props) => {
  const RowMemo = memo<IRowMemo>(
    ({ data, index, style }) => (
      <Box key={data[index].id} sx={{ ...style }}>
        <Tweet tweet={data[index]} />
      </Box>
    ),
    areEqual
  );

  return (
    <List
      height={500}
      width={"100%"}
      itemCount={tweets.length}
      itemSize={125.3}
      itemData={tweets}
    >
      {RowMemo}
    </List>
  );
};

export default TweetList;
