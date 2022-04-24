import React from "react";

import Image from "next/image"

import {
    Box,
    Typography,
    Stack,
    Container,
    LinearProgress,
    Grid,
    linearProgressClasses,
} from "@mui/material";
import {useTheme} from "@mui/system";
import {LocationOn, Star} from "@mui/icons-material";
import {range} from "lodash";
import GoogleMapReact from 'google-map-react';

import {MyDialog, RateBox} from "../";
import {calculateRate} from "../../utils/rateCalculator";
import {CommentBox} from "../";


const ShopInformationDialog = ({open, handleClose, shopDetails}) => {

    const {comments} = shopDetails;
    const {city, exactAddress, longitude, latitude} = shopDetails.address;
    const commentsCount = comments.length;
    const nonZeroScoreCommentsCount = [...comments].filter(
        (c) => c.score !== 0
    ).length;

    const {palette} = useTheme();

    const scoreRanges = [
        {color: palette.success.dark, value: 5},
        {color: palette.success.main, value: 4},
        {color: palette.success.light, value: 3},
        {color: palette.warning.light, value: 2},
        {color: palette.error.light, value: 1},
    ];

    const getPersentageOfScore = (score) => {
        const scoreCount = [...comments].filter(
            (c) => Math.floor(c.score) === score
        ).length;
        const scorePercentage = (scoreCount * 100) / nonZeroScoreCommentsCount;
        return Math.floor(scorePercentage);
    };

    const {informationBox, shopLogo, scoreRow, starBox, mapBox, rateBox} = styles;

    return (
        <MyDialog width="100%" onClose={handleClose} open={open}>
            <Box sx={informationBox}>
                <Stack direction="row" width="100%">
                    <Stack sx={shopLogo}>
                        <Image
                            height={80}
                            width={80}
                            alt="shop logo"
                            src={`/images/logo/${shopDetails.shopLogo}`}
                            placeholder="blur"
                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOcuHTiMQAGJQKP0kkd/QAAAABJRU5ErkJggg=="
                        />
                    </Stack>
                    <Stack pr={1}>
                        <Typography
                            fontSize={{xs: 13, sm:17}}
                            fontWeight="bold"
                            mt={2}
                        >{`${shopDetails.shopName} (${city})`}</Typography>
                        <Typography color="gray" mt={1} fontSize={{xs: 11, sm: 14}}>
                            {shopDetails.shopType} ، {shopDetails.category}
                        </Typography>
                        <Container>
                            <LocationOn sx={{color: "gray"}}/>
                            <Typography mr={0.3}>
                                {exactAddress && exactAddress.slice(0, 30)}....
                            </Typography>
                        </Container>
                    </Stack>
                    <Stack flex={1}/>
                    <Stack sx={mapBox}>
                        <GoogleMapReact
                            defaultCenter={{
                                lat: latitude,
                                lng: longitude
                            }}
                            defaultZoom={11}
                        >
                            <img
                                lat={latitude}
                                lng={longitude}
                                alt="location marker"
                                style={{height: "40px", width: "40px"}}
                                src="/images/marker.png"
                            />
                        </GoogleMapReact>
                    </Stack>
                </Stack>
            </Box>
            <Box sx={scoreRow}>
                <Stack sx={rateBox}>
                    <RateBox fontSize={14}>{calculateRate(comments)}</RateBox>
                    <Typography
                        fontSize={{xs: "11px", sm: "14px"}}
                        mt={1}
                    >{`از مجموع ${nonZeroScoreCommentsCount} امتیاز و ${commentsCount} نظر`}</Typography>
                </Stack>
                <Stack sx={{flex: 1, width: "100%"}}>
                    {scoreRanges.map(({color, value}) => (
                        <Grid container alignItems="center" spacing={1} key={value}>
                            <Grid item xs={6} sm={3} sx={starBox}>
                                {range(0, value).map((val) => (
                                    <Star
                                        key={val}
                                        sx={{margin: 0.4, color: "#EBEDF0", fontSize: 14}}
                                    />
                                ))}
                            </Grid>
                            <Grid item xs={6} sm={9}>
                                <LinearProgress
                                    sx={{
                                        height: "1.7px",
                                        width: "100%",
                                        backgroundColor: "#EBEDF0",
                                        [`& .${linearProgressClasses.bar1Determinate}`]: {
                                            backgroundColor: color,
                                        },
                                    }}
                                    variant="determinate"
                                    value={getPersentageOfScore(value)}
                                />
                            </Grid>
                        </Grid>
                    ))}
                </Stack>
            </Box>
            <CommentBox comments={comments} id={shopDetails._id}/>
        </MyDialog>
    );
};

export default ShopInformationDialog;

const styles = {
    informationBox: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "7px",
    },
    shopLogo: {
        borderRadius: "10px",
        maxHeight: "80px",
        boxShadow: 3,
        marginLeft: "10px",
        overflow: "hidden"
    },
    scoreRow: theme => ({
        marginTop: 5,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: "7px",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
        },
    }),
    rateBox: theme => ({
        [theme.breakpoints.down("sm")]: {
            width: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            mb: "8px"
        }

    }),
    starBox: {
        direction: "ltr",
        display: "flex",
        flexDirection: "row",
    },
    mapBox: theme => ({
        width: "200px",
        height: "120px",
        overflow: "hidden",
        borderRadius: "10px",
        [theme.breakpoints.down("sm")]: {
            display: "none"
        }
    }),
};
