
import { Grid, Typography } from "@mui/material";

import { RateBox, DateTimeBox } from "../";

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

const styles = {
  root: {
    borderBottom: "1px #e3e3e4 solid",
    padding: "24px 14px",
  },
  detailBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: "7px"
  },
  replayBox: {
    border: "1px solid",
    borderColor: "primary.main",
    borderRadius: "10px",
    padding: "10px",
    marginTop: "10px",
  },
};
