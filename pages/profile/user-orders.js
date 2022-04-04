import { Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { MyHead, OrderCard } from "../../src/components";


const UserOrders = () => {
    const orders = useSelector((state) => state.orders);
    const deliveredOrders = [...orders].filter((o) => o.isPaid);

    return (
        <Stack>
            <MyHead
                description="سفارش های خود را در حساب کاربری خود مشاهده کنید"
                title="سفارش های شماs"
                keywords="test"
            />
            <Typography m={2} fontWeight="bold">
                سفارش های من
            </Typography>
            {deliveredOrders.map((order) => (
                <OrderCard key={order._id} order={order} />
            ))}
        </Stack>
    );
};

export default UserOrders;
