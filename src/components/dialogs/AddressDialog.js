import React, { useState, memo, useContext } from "react";

import { Button, Grid, TextField } from "@mui/material";

import { MyDialog } from "../";
// import { Map } from "../../utils/map";
import { getAddress } from "../../services/addressServices";
import {accountContext} from "../../contexts/account/accountContext";

const AddressDialog = ({ open, handleClose }) => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [city, setCity] = useState("");
  const [exactAddress, setExactAddress] = useState("");

  const { addAddress } = useContext(accountContext);

  const handleClickMarker = () => {
    setCity("");
    setExactAddress("");
    setLatitude(0);
    setLongitude(0);
  };

  const handleClickMap = async (Map, e) => {
    const { data } = await getAddress(e.lngLat.lng, e.lngLat.lat);
    setCity(data.city);
    setExactAddress(data.address);
    setLatitude(e.lngLat.lat);
    setLongitude(e.lngLat.lng);
  };

  const handleSubmit = () => {
    addAddress({
      city,
      exactAddress,
      latitude,
      longitude,
      title: "آدرس من",
    });
    handleClose();
    handleClickMarker();
  };

  const { mapBox } = styles;

  return (
    <MyDialog open={open} onClose={handleClose} title="آدرس جدید" width="80%">
      <Grid sx={mapBox}>
        {/* <Mapir
          userLocation
          onClick={handleClickMap}
          center={[51.42047, 35.729054]}
          Map={Map}
        >
          <Mapir.Marker
            onClick={handleClickMarker}
            coordinates={[longitude, latitude]}
            anchor="bottom"
          />
        </Mapir> */}

        <TextField
          variant="outlined"
          fullWidth
          sx={{ background: "#fff", m: 1 }}
          value={exactAddress}
          placeholder="آدرس دقیق شما"
          onChange={(e) => setExactAddress(e.target.value)}
        />
        <TextField
          variant="outlined"
          fullWidth
          placeholder="شهر شما"
          sx={{ background: "#fff", m: 1 }}
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Button
          sx={{ width: "100%" }}
          variant="contained"
          onClick={handleSubmit}
        >
          ثبت آدرس
        </Button>
      </Grid>
    </MyDialog>
  );
};

export default memo(AddressDialog);

const styles = {
  mapBox: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: 14,
    height: "500px",
    maxWidth: "740px",
    overflow: "hidden",
  },
};
