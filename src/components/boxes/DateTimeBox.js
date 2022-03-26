import { Typography, Container } from "@mui/material";
import { AccessTime, CalendarToday } from "@mui/icons-material";

import { getPersianDate, getClock } from "../../utils/dateConvertor";

const DateTimeBox = ({ dateTime }) => {
  const TimeBox = ({ value, icon }) => (
    <Container style={{ marginRight: 7 }}>
      {icon}
      <Typography mr={0.3} fontSize={9}>
        {value}
      </Typography>
    </Container>
  );

  const paymentDate = getPersianDate(dateTime);
  const paymentTime = getClock(dateTime);
  return (
    <Container>
      <TimeBox
        icon={<CalendarToday sx={{ color: "gray", fontSize: 17 }} />}
        value={paymentDate}
      />
      <TimeBox
        icon={<AccessTime sx={{ color: "gray", fontSize: 17 }} />}
        value={paymentTime}
      />
    </Container>
  );
};

export default DateTimeBox;
