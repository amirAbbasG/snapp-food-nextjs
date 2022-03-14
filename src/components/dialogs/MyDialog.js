import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  IconButton,
  Stack,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";

const MyDialog = ({ open, onClose, title, children, ...props }) => {
  const { dialog, titleBox } = useStyles(props);
  return (
    <Dialog
      open={open}
      onClose={onClose}
      classes={{
        paper: dialog,
      }}
    >
      <DialogTitle>
        <Stack className={titleBox}>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
          <Typography>{title}</Typography>
        </Stack>
      </DialogTitle>

      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default MyDialog;

const useStyles = makeStyles({
  dialog: {
    width: (props) => props.width,
    borderRadius: 14,
    maxWidth: "740px",
  },
  titleBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
