import Link from "next/link";
import Image from "next/image";

import { Grid, Typography, IconButton } from "@mui/material";
import useSWR from 'swr';
import { makeStyles } from "@mui/styles";



const ShopTypesBox = () => {



  const { data, error } = useSWR('/api/shopTypes')


  const { root, itemBox } = useStyles();

  return (
    <Grid wrap="nowrap" container columns={10} className={root}>
      {(data && data.shopTypes) &&
        data.shopTypes.map((item) => (
          <Grid xs={2} lg={1} md={1} key={item._id} item className={itemBox}>
            <Link href={`/shops?category=${item.type}`}>
              <a>
                <IconButton>
                  <Image
                    width={55}
                    height={55}
                    alt={item.type}
                    src={`/images/${item.imageName.replace("jpg", "png")}`}
                  />
                </IconButton>
              </a>
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

const useStyles = makeStyles((theme) => ({
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
}));
