import {useContext} from "react";

import {Typography, Stack} from "@mui/material";
import {ChevronLeft} from "@mui/icons-material";
import Carousel from "react-elastic-carousel";
import {useTheme} from "@mui/system";

import {Link} from "../";
import {ShopCard} from "../";
import {globalContext} from "../../contexts/global/globalContext";


const ShopsShowCasesBox = ({data, title, url}) => {
    const {isXl, isLg, isMd, isSm, isXs} = useContext(globalContext);
    let showCount = 4;

    switch (true){
        case isXl:
            showCount = 4;
            break
            case isLg:
            showCount = 3
            break
        case isMd:
            showCount = 2;
            break
        case isSm:
            showCount = 2;
            break;
        case isXs:
            showCount = 1;
            break
    }

    const {breakpoints} = useTheme()

    return (
        <section>
            <Stack direction="row" justifyContent="space-between" py={2} mt={4}>
                <Typography variant={ !isXs ? "h6" : "body1"} fontWeight="bold" component="h2">{title}</Typography>
                <Link href={url} scroll={false}>
                    <Stack direction="row" alignItems="center">
                        <Typography fontWeight="bold" color="textSecondary" variant={ !isXs && "h6"} >
                            مشاهده همه
                        </Typography>
                        <ChevronLeft
                            sx={{
                                fontSize: 30,
                                fontWeight: "bold",
                                marginRight: 1,
                                color: "#00B862",
                                [breakpoints.down("sm")]: {
                                    marginRight: "2px"
                                }
                            }}
                        />
                    </Stack>
                </Link>
            </Stack>
            <Carousel
                itemsToShow={data.length < showCount ? data.length : showCount}
                isRTL
                pagination={false}
                itemsToScroll={data.length < showCount ? data.length : showCount}
                itemPadding={isXs ? [2,2,2,2,] :[9, 9, 9, 9]}
            >
                {data &&
                data
                    .slice(0, 7)
                    .map((item) => <ShopCard key={item._id} shop={item}/>)}
            </Carousel>
        </section>
    );
};

export default ShopsShowCasesBox;
