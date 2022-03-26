import { Card, IconButton, Typography } from "@mui/material";

const ActionButton = ({ icon, onClick }) => (
  <IconButton onClick={onClick}>
    <Card
      elevation={2}
      sx={{
        borderRadius: "50%",
        width: "1.8rem",
        height: "1.8rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: 1,
      }}
    >
      <Typography color="primary" fontSize={20} fontWeight="bold">
        {icon}
      </Typography>
    </Card>
  </IconButton>
);

export default ActionButton;
