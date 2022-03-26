import { useContext, useState } from "react";

import { Stack, TextField, Button, Rating, Typography } from "@mui/material";

import { MyDialog } from "../";

const AddCommentDialog = ({ open, handleClose, id }) => {
  const [commentText, setCommentText] = useState("");
  const [score, setScore] = useState(0);

  // const { addComment } = useContext(shopsContext);

  const handleRating = (rate) => {
    if (score === 1 && rate === 1) {
      setScore(0);
    } else {
      setScore(rate);
    }
  };

  const handleAddComment = () => {
    const commentBody = {
      text: commentText,
      score,
    };
    addComment(id, commentBody);
    setCommentText("");
    setScore(0);
    handleClose();
  };

  return (
    <MyDialog width="30%" title="افزودن نظر" open={open} onClose={handleClose}>
      <TextField
        fullWidth
        placeholder="نظر خود را بنویسید ..."
        onChange={(e) => setCommentText(e.target.value)}
      />
      <Stack
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          my: 4,
        }}
      >
        <Typography color="textSecondary">امتیاز دهید</Typography>
        <Rating
          sx={{ mt: 1, alignSelf: "center" }}
          size="large"
          value={score}
          onChange={(event, newValue) => {
            handleRating(newValue);
          }}
        />
      </Stack>
      <Button
        sx={{ width: "100%" }}
        variant="contained"
        // onClick={handleAddComment}
      >
        ثبت نظر
      </Button>
    </MyDialog>
  );
};

export default AddCommentDialog;
