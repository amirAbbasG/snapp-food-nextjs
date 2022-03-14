import React, { useState } from "react";
import { Stack, Typography, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { CommentCard, AddCommentDialog } from "../";
import { isEmpty } from "lodash";

const CommentBox = ({ comments, id }) => {
  const [openAddComment, setOpenAddComment] = useState(false);

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
        <Typography mb={2} variant="h6">
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
      {[...comments].reverse().map((comment) => (
        <CommentCard comment={comment} />
      ))}
      <AddCommentDialog
        id={id}
        open={openAddComment}
        handleClose={() => setOpenAddComment(false)}
      />
    </Stack>
  );
};

export default CommentBox;
