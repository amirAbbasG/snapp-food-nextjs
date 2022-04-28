
import { Grid, Typography } from "@mui/material";

import { RateBox, DateTimeBox } from "../";
import styles from "./styles/CommentCard.styles"

const CommentCard = ({ comment }) => {
  const { root, detailBox, replayBox } = styles;
  return (
    <Grid container sx={root} direction="column"  component="article">
      <Grid item container direction={{xs: "column", sm: "row"}}>
        <Grid item xs={4} sx={detailBox}>
          <Typography fontSize={{xs: 11, sm: 14}} fontWeight="bold">{comment.sender}</Typography>
          <Grid py={2}>
            <DateTimeBox dateTime={comment.createDate} />
          </Grid>
          <RateBox rate={comment.score === 0 ? "-" : comment.score} />
        </Grid>
        <Grid item xs={8}>
          <Typography color="GrayText">{comment.text}</Typography>
        </Grid>
        {comment.replay != null && (
          <Grid item sx={replayBox}>
            <Typography color="primary">پاسخ مدیر رستوران</Typography>
            <Typography m={3} color="GrayText">
              {comment.replay}
            </Typography>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default CommentCard;

