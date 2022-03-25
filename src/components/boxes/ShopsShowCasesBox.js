import { useContext } from "react";
import Link from "next/link";
import { Typography, Stack } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import Carousel from "react-elastic-carousel";
import { ShopCard } from "../";
import { globalContext } from "../../Contexts";

const ShopsShowCasesBox = ({ data, title, url }) => {
  const { isLg, isMd, isSm, isXs } = useContext(globalContext);
  let showCount = 4;

  if (isLg) {
    showCount = 4;
  } else if (isMd) {
    showCount = 3;
  } else if (isSm) {
    showCount = 2;
  } else if (isXs) {
    showCount = 1;
  }

  return (
    <>
      <Stack direction="row" justifyContent="space-between" py={2} mt={4}>
        <Typography variant="h6">{title}</Typography>
        <Link href={url} scroll={false}>
          <a>
            <Stack direction="row" alignItems="center">
              <Typography color="textSecondary" variant="h6">
                مشاهده همه
              </Typography>
              <ChevronLeft
                sx={{
                  fontSize: 30,
                  fontWeight: "bold",
                  marginRight: 1,
                  color: "#00B862",
                }}
              />
            </Stack>
          </a>
        </Link>
      </Stack>
      <Carousel
        itemsToShow={data.length < showCount ? data.length : showCount}
        isRTL
        pagination={false}
        itemsToScroll={data.length < showCount ? data.length : showCount}
        itemPadding={[9, 9, 9, 9]}
      >
        {data &&
          data
            .slice(0, 7)
            .map((item) => <ShopCard key={item._id} shop={item} />)}
      </Carousel>
    </>
  );
};

export default ShopsShowCasesBox;
