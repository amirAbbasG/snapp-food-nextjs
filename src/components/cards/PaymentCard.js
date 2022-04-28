import { Typography, Stack, Container } from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";

import { separatePrice } from "../../utils/priceSeparator";
import { DateTimeBox } from "../";

const PaymentCard = ({ payment }) => {
  const { root, successBox } = styles;
  return (
    <Stack sx={root}  component="article">
      <Stack spacing={3}>
        <Typography fontWeight="bold">{payment.shopId.shopName}</Typography>
        <Container sx={successBox}>
          {payment.success ? (
            <CheckCircle sx={{ color: "#00B862", fontSize: 17 }} />
          ) : (
            <Cancel sx={{ color: "red", fontSize: 17 }} />
          )}
          <Typography
            mr={0.3}
            color={payment.success ? "textSecondary" : "error"}
          >
            {" "}
            {payment.success ? "موفق" : "ناموفق"}
          </Typography>
        </Container>
      </Stack>
      <Stack spacing={3} alignItems="flex-end">
        <DateTimeBox dateTime={payment.createDate} />
        <Typography>
          {separatePrice(payment.amount)}
          تومان
        </Typography>
      </Stack>
    </Stack>
  );
};

export default PaymentCard;

const styles = {
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottom: "1px #e3e3e4 solid",
    padding: 14,
  },

  successBox: {
    backgroundColor: "#eafcf4",
    borderRadius: 10,
    padding: 2,
  },
};
