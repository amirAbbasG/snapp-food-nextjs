import { useContext, useEffect } from "react";
import { Grid } from "@mui/material";
import {
    ShopCard,
    SortShopsSelect,
    CategoriesBox,
    PriceRangeButtonGroup,
    FilterShopBox,
    MyHead,
} from "../../src/components";
import { shopsContext } from "../../Contexts";

const filter = ""


const Shops = () => {
    const filterShops = []

    return (
        <Grid container direction="column">
            <MyHead
                description="فیلتر فروشگاه براساس نظرهای شما"
                title={filter || "فروشگاها"}
                keywords="test"
            />
            <Grid container item justifyContent="flex-end">
                <Grid item p={1}>
                    <SortShopsSelect />
                </Grid>
            </Grid>
            <Grid container item direction={{ sm: "column", md: "row" }}>
                <Grid item container direction="column" md={3} sm={12}>
                    <CategoriesBox shopType={filter ? filter : "رستوران"} />
                    <PriceRangeButtonGroup />
                    <FilterShopBox />
                </Grid>
                <Grid item container md={9} sm={12}>
                    {filterShops.map((shop) => (
                        <Grid item key={shop._id} sm={12} md={6} lg={4} p={2}>
                            <ShopCard shop={shop} />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Shops;
