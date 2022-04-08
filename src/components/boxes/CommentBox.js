import { useState } from "react";
import { Stack, Typography, Button } from "@mui/material";
import { CommentCard, AddCommentDialog } from "../";
import { isEmpty } from "lodash";
import {useSelector} from "react-redux";

const CommentBox = ({ comments, id}) => {
  const [openAddComment, setOpenAddComment] = useState(false);
    const [commentsList, setCommentsList] = useState(comments)

  const account = useSelector((state) => state.account);
  const orders = useSelector((state) => state.orders);

  let isUserBuyFromShop = false;
  if (!isEmpty(account)) {
    if (orders.some((o) => o.shopId._id === id && o.isPaid)) {
      isUserBuyFromShop = true;
    } else {
      [...orders]
        .filter((o) => o.isPaid)
        .map((o) => {
          o.foods.map((f) => {
            if (f._id === id) {
              isUserBuyFromShop = true;
            }
          });
        });
    }
  }

  return (
    <Stack mt={4}>
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography mb={2} variant="h6" component="h3">
          نظرات کاربران
        </Typography>
        {isUserBuyFromShop && (
          <Button
            variant="outlined"
            onClick={() => setOpenAddComment(true)}
            color="primary"
          >
            افزودن نظر
          </Button>
        )}
      </Stack>
      {[...commentsList].reverse().map((comment) => (
        <CommentCard comment={comment} key={comment._id}/>
      ))}
      <AddCommentDialog
        id={id}
        open={openAddComment}
        handleClose={() => setOpenAddComment(false)}
        handleSetNewComment={(newComment) => setCommentsList([...commentsList, newComment])}
      />
    </Stack>
  );
};

export default CommentBox;
