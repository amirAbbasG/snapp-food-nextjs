import React, { useState, memo } from "react";
import {
  Dialog,
  DialogContent,
  TextField,
  InputAdornment,
  DialogContentText,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { Search, StorefrontTwoTone } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";

const SearchDialog = ({ open, handleClose }) => {
  const { dialog, helpText, textField, shopsBox } = useStyles();
  const [searchText, setSearchText] = useState("");
  const shops = useSelector((state) => state.shops);

  const searchShop = [...shops].filter(
    (s) =>
      s.shopName.includes(searchText) ||
      s.shopType.includes(searchText) ||
      s.category.includes(searchText)
  );
  const handleReset = () => {
    setSearchText("");
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      classes={{
        paper: dialog,
      }}
    >
      <DialogContent>
        <TextField
          startA
          autoFocus
          margin="dense"
          fullWidth
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className={textField}
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        {searchText.length === 0 ? (
          <DialogContentText className={helpText}>
            عبارت مورد نظر خود را وارد کنید
          </DialogContentText>
        ) : (
          <Stack spacing={3} className={shopsBox}>
            <Link
              to="/shops"
              // state={{ data: searchShop }}
              onClick={handleReset}
            >
              <a>
                <Typography color="textSecondary">{`مشاهده همه (${searchShop.length}) >`}</Typography>
              </a>
            </Link>
            {searchShop.slice(0, 9).map((shop) => (
              <Link to={`/shops/${shop._id}`}>
                <a onClick={handleReset}>
                  <Stack direction="row">
                    <StorefrontTwoTone />
                    <Typography mr={2}>{shop.shopName}</Typography>
                  </Stack>
                </a>
              </Link>
            ))}
          </Stack>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default memo(SearchDialog);

const useStyles = makeStyles({
  dialog: {
    position: "absolute",
    top: 0,
    backgroundColor: "inherit",
  },
  textField: {
    backgroundColor: "#FFFFFF",
    borderRadius: 7,
  },
  helpText: {
    backgroundColor: "#FFFFFF",
    borderRadius: 7,
    padding: "1.2rem",
    borderBlockColor: "#FFFFFF",
    width: "27rem",
    color: "#000",
    fontWeight: "bold",
  },
  shopsBox: {
    width: "27rem",
    backgroundColor: "#FFFFFF",
    borderRadius: 7,
    padding: 10,
  },
});
