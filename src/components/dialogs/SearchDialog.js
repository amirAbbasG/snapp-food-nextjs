import React, { useState, memo, useEffect } from "react";

import Link from "next/link"

import {
  Dialog,
  DialogContent,
  TextField,
  InputAdornment,
  DialogContentText,
  Stack,
  Typography,
} from "@mui/material";
import { Search, StorefrontTwoTone } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";

import {searchShopsApi} from "../../services/shopServices";

const SearchDialog = ({ open, handleClose }) => {
  const [searchText, setSearchText] = useState("");
  const [searchShop, setSearchShop] = useState([]);

  useEffect(() => {
    const fetchDate = async () => {
      if (searchText.length > 1) {
        const {data: {shops}} = await searchShopsApi(searchText, 7)
        setSearchShop(shops)
      }
    }

    fetchDate()
  }, [searchText])



  const handleReset = () => {
    setSearchText("");
    handleClose();
  };

  const { helpText, textField, shopsBox } = styles;
  const classes = useStyles()

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      classes={{
        paper: classes.dialog,
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
          sx={textField}
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
          <DialogContentText sx={helpText}>
            عبارت مورد نظر خود را وارد کنید
          </DialogContentText>
        ) : (
          <Stack spacing={3} sx={shopsBox}>
            <Link
              href={`/shops?filter=search&term=${searchText}`}

            >
              <a  onClick={handleReset}>
                <Typography color="textSecondary">{`مشاهده همه (${searchShop.length}) >`}</Typography>
              </a>
            </Link>
            {searchShop.slice(0, 9).map((shop) => (

              <Link href={`/shops/${shop._id}`} key={shop._id} >
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

const styles = {

  textField: {
    backgroundColor: "#FFFFFF",
    borderRadius: 7,
  },
  helpText: {
    backgroundColor: "#FFFFFF",
    borderRadius: "7px",
    padding: "1.2rem",
    borderBlockColor: "#FFFFFF",
    width: "27rem",
    color: "#000",
    fontWeight: "bold",
  },
  shopsBox: {
    width: "27rem",
    backgroundColor: "#FFFFFF",
    borderRadius: "7px",
    padding: "10px",
  },
};

const useStyles = makeStyles({
  dialog: {
    position: "absolute",
    top: 0,
    backgroundColor: "inherit",
  },
})
