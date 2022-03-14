import React, { useState } from "react";
import { Button, Typography, Paper, Stack, IconButton } from "@mui/material";
import { styled } from "@mui/styles";
import { DeleteForeverOutlined } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isEmpty } from "lodash";
import { RemoveOrderDialog, FoodPriceBox, FoodOrderButtons, Factor } from "../";

const CartBox = ({ shopId }) => {
  const navigate = useNavigate();

  const [openRemoveCart, setOpenRemoveCart] = useState(false);
  const orders = useSelector((state) => state.orders);
  const order = orders.find((o) => o.shopId._id === shopId && !o.isPaid);

  const UnderLinedStack = styled(Stack)(({ theme }) => ({
    borderBottom: "1px solid",
    borderBottomColor: theme.palette.secondary.dark,
    display: "felx",
    flexDirection: "column",
  }));

  const ItemStack = styled(Stack)({
    display: "felx",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  });

  return (
    <>
      {!isEmpty(order) && (
        <>
          <Paper sx={{ marginTop: 2 }}>
            <Stack p={2}>
              <UnderLinedStack spacing={2}>
                <ItemStack>
                  <Typography>{`سبد خرید (${order.foods.length})`}</Typography>
                  <IconButton onClick={() => setOpenRemoveCart(true)}>
                    <DeleteForeverOutlined color="error" />
                  </IconButton>
                </ItemStack>
                {order.foods.map((food) => (
                  <Stack key={food._id}>
                    <Typography
                      my={1}
                    >{`${food.name} (${food.count})`}</Typography>
                    <ItemStack>
                      <FoodPriceBox
                        price={food.price}
                        discount={food.discount}
                      />
                      <FoodOrderButtons foodId={food._id} />
                    </ItemStack>
                  </Stack>
                ))}
              </UnderLinedStack>
              <Factor orderId={order._id} />
              <Button
                onClick={() => navigate(`/finalizeOrder/${order._id}`)}
                variant="contained"
                sx={{ width: "100%", padding: 1, marginTop: 2 }}
              >
                ادامه خرید
              </Button>
            </Stack>
          </Paper>
          <RemoveOrderDialog
            open={openRemoveCart}
            onClose={() => setOpenRemoveCart(false)}
            orderId={order._id}
          />
        </>
      )}
    </>
  );
};

export default CartBox;
