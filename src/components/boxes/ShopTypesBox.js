import Image from "next/image";

import {Grid, Typography, IconButton} from "@mui/material";
import useSWR from 'swr';
import {useTheme} from "@mui/styles";

import {Link} from "../"


const ShopTypesBox = () => {

    const {breakpoints} = useTheme()

    const styles = {
        root: {
            width: "100%",
            [breakpoints.down("md")]: {
                overflowX: "scroll",
            },
            alignItems: "center",
        },
        itemBox: {
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            minWidth: "60px"
        },
        iconButton: {
            "&:hover": {
                animation: "pendulum 0.6s"
            },
            "@keyframes pendulum": {
                "0%": {
                    transform: "scale(1.1)",

                },
                "25%": {
                    transform: "rotate(-8deg)",

                },
                "50%": {
                    transform: "rotate(8deg)",
                },
                "75%": {
                    transform: "rotate(-8deg)",
                },
                "100%": {
                    transform: "rotate(8deg)",

                }
            }
        },


    };

    const {data} = useSWR('/shopTypes')


    const {root, itemBox, iconButton} = styles;

    return (
        <Grid wrap="nowrap" container columns={10} sx={root} component="nav">
            {(data && data.shopTypes) &&
            data.shopTypes.map((item) => (
                <Grid xs={4} md={2} lg={1}  key={item._id} item sx={itemBox}>
                    <Link href={`/shops?filter=category&category=${item.type}`}>
                        <IconButton sx={iconButton}>
                            <Image
                                width={55}
                                height={55}
                                alt={item.type}
                                src={`/images/categories/${item.imageName.replace("jpg", "png")}`}
                            />
                        </IconButton>
                    </Link>
                    <Typography fontSize={12} color="gray">
                        {item.type}
                    </Typography>
                </Grid>
            ))}
        </Grid>
    );
};

export default ShopTypesBox


