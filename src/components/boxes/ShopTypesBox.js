import Image from "next/image";

import { Grid, Typography, IconButton } from "@mui/material";
import useSWR from 'swr';
import { useTheme } from "@mui/styles";

import {Link} from "../"




const ShopTypesBox = () => {

  const theme = useTheme()

  const styles = {
    root: {
      width: "100%",
      [theme.breakpoints.down("md")]: {
        overflowX: "scroll",
      },
      alignItems: "center",
    },
    itemBox: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
    },
  };

  const { data, error } = useSWR('/api/shopTypes')


  const { root, itemBox } = styles;

  return (
    <Grid wrap="nowrap" container columns={10} sx={root}>
      {(data && data.shopTypes) &&
        data.shopTypes.map((item) => (
          <Grid xs={2} lg={1} md={1} key={item._id} item sx={itemBox}>
            <Link href={`/shops?filter=category&category=${item.type}`}>
                <IconButton>
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


