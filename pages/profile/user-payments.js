import { useEffect, useState } from "react";

import { Stack, Typography, CircularProgress } from "@mui/material";

import { MyHead, PaymentCard } from "../../src/components";
import {getPaymentsApi} from "../../src/services/paymentsServices";

const UserPayments = () => {

    const [payments, setPayments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const setData = async () => {
            setIsLoading(true)
            const { status, data } = await getPaymentsApi();
            if (status === 200) {
                setPayments(data.userPayments);
                setIsLoading(false)
            }
        };
        setData();
    }, []);


    return (
        <Stack>
            <MyHead
                description="لیست دریافت های خود را در حساب کاربری خود مشاهده کنید"
                title="پرداخت های شما"
                keywords="test"
            />
            <Typography m={2} variant="h6"  component="h1">
                لیست تراکنش‌ها
            </Typography>
            <Typography m={2} component="h2">
                در پرداخت‌های ناموفق بانکی اگر مبلغ از حسابتان کسر شود، معمولاً در کمتر
                از یک ساعت و نهایتاً تا ۷۲ ساعت به حساب شما برگردانده خواهد شد.
            </Typography>
            {
                isLoading ? (
                    <CircularProgress sx={{alignSelf: "center", m: 1}}/>
                ): (
                    <>
                        {payments.map((payment) => (
                        <PaymentCard key={payment._id} payment={payment} />
                    ))}
                    </>
                )
            }

        </Stack>
    );
};

export default UserPayments;
