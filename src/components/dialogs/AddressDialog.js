import React, {useState, memo, useContext} from "react";

import {Button, Grid, TextField} from "@mui/material";
import GoogleMapReact from 'google-map-react';


import {MyDialog} from "../";
import {getAddress} from "../../services/addressServices";
import {accountContext} from "../../contexts/account/accountContext";


const AddressDialog = ({open, handleClose}) => {
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [city, setCity] = useState("");
    const [exactAddress, setExactAddress] = useState("");



    const {addAddress} = useContext(accountContext);

    const handleClickMarker = () => {
        setCity("");
        setExactAddress("");
        setLongitude(0)
        setLatitude(0)
    };

    const handleClickMap = async ({lat, lng}) => {
        const {data} = await getAddress(lng, lat);
        setCity(data.city);
        setExactAddress(data.address);
        setLongitude(lng)
        setLatitude(lat)

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

    const {mapBox} = styles;



    return (
        <MyDialog open={open} onClose={handleClose} title="آدرس جدید" width="80%">
            <Grid sx={mapBox}>
                <GoogleMapReact
                    onClick={handleClickMap}
                    defaultCenter={{
                        lat: 35.729054,
                        lng:51.42047
                    }}
                    defaultZoom={11}
                >
                    <img
                        onClick={handleClickMarker}
                        lat={latitude}
                        lng={longitude}
                        alt="location marker"
                        style={{height: "70px", width: "70px"}}
                        src="/images/marker.png"
                    />
                </GoogleMapReact>
                <TextField
                    variant="outlined"
                    fullWidth
                    sx={{m: 1}}
                    value={exactAddress}
                    placeholder="آدرس دقیق شما"
                    onChange={(e) => setExactAddress(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    fullWidth
                    placeholder="شهر شما"
                    sx={{m: 1}}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <Button
                    sx={{width: "100%"}}
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
        height: "500px",
        maxWidth: "740px",
        overflow: "hidden",
        borderRadius: "7px"
    },
};
