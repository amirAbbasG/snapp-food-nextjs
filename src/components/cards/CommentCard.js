import { makeStyles } from "@mui/styles";
import { Grid, Typography } from "@mui/material";

import { RateBox, DateTimeBox } from "../";

const CommentCard = ({ comment }) => {
  const { root, detailBox, replayBox } = useStyles();
  return (
    <Grid container className={root} direction="column"  component="article">
      <Grid item container>
        <Grid item xs={4} className={detailBox}>
          <Typography fontWeight="bold">{comment.sender}</Typography>
          <Grid py={2}>
            <DateTimeBox dateTime={comment.createDate} />
          </Grid>
          <RateBox rate={comment.score === 0 ? "-" : comment.score} />
        </Grid>
        <Grid item xs={8}>
          <Typography color="GrayText">{comment.text}</Typography>
        </Grid>
        {comment.replay != null && (
          <Grid item className={replayBox}>
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

const useStyles = makeStyles((theme) => ({
  root: {
    borderBottom: "1px #e3e3e4 solid",
    padding: "24px 14px",
  },
  detailBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  replayBox: {
    border: "1px solid",
    borderColor: theme.palette.primary.main,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
}));
