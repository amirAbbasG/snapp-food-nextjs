import Image from "next/image";

import {Grid, Typography, IconButton} from "@mui/material";
import useSWR from 'swr';

import {Link} from "../"
import styles from "./styles/ShopTypesBox.styles"


const ShopTypesBox = () => {



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


