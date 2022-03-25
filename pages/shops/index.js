
import { Grid } from "@mui/material";
import {
    ShopCard,
    SortShopsSelect,
    CategoriesBox,
    PriceRangeButtonGroup,
    FilterShopBox,
    MyHead,
} from "../../src/components";
import {getDiscountedShopsApi, getShopByCategoryApi, getShopsWithCouponApi, getTopRatedShopsApi, getShopTypeByNameApi} from "../../src/services/shopServices";


export async function getServerSideProps(context){
    const {filter} = context.query

    let filteredShops = []

    const {data: {shopType}} = await getShopTypeByNameApi("رستوران")
    let type = shopType

    switch (filter){
        case "category":
            const {category} = context.query

            const {data: {shops}} = await getShopByCategoryApi(category, 20)
            filteredShops = shops

            const {data: {shopType}} = await getShopTypeByNameApi(category)
            type = shopType

            break;
        case "discounted":
            const {data: {discountedShops}} = await getDiscountedShopsApi(20)
            filteredShops = discountedShops
            break;
        case "topRated":
            const {data: {topRatedShops}} = await getTopRatedShopsApi(20)
            filteredShops = topRatedShops
            break;
        case "coupon" :
            const {data: {shopsWithCoupon}} = await getShopsWithCouponApi(20)
            filteredShops = shopsWithCoupon
            break;
        default:
            break;
    }

    return {
       props: {
            filteredShops,
           type
        }
    }

}

const filter = ""


const Shops = ({filteredShops, type}) => {


    return (
        <Grid container direction="column" >
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
                    <CategoriesBox shopType={type} />
                    <PriceRangeButtonGroup />
                    <FilterShopBox />
                </Grid>
                <Grid item container md={9} sm={12}>
                    {filteredShops.map((shop) => (
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
