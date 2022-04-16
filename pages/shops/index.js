import {useState} from "react";

import {Grid} from "@mui/material";

import {
    ShopCard,
    SortShopsSelect,
    CategoriesBox,
    PriceRangeButtonGroup,
    FilterShopBox,
    MyHead,
} from "../../src/components";
import {
    getDiscountedShopsApi,
    getShopByCategoryApi,
    getShopsWithCouponApi,
    getTopRatedShopsApi,
    getShopTypeByNameApi,
    searchShopsApi
} from "../../src/services/shopServices"
import {calculateRate, getBestCoupone, getPriceAverage} from "../../src/utils/rateCalculator";


export async function getServerSideProps(context) {
    const {filter} = context.query

    let filteredShops = []

    const {data: {shopType}} = await getShopTypeByNameApi("رستوران")
    let type = shopType

    switch (filter) {
        case "category":
            const {category} = context.query

            const {data: {shops}} = await getShopByCategoryApi(category, 20)
            filteredShops = shops

            const {data: {shopType}} = await getShopTypeByNameApi(category)
            type = shopType
            break;

        case "search":
            const {term} = context.query
            const {data} = await searchShopsApi(term, 20)
            filteredShops = data.shops
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


const Shops = ({filteredShops, type}) => {

    const [priceRange, setPriceRange] = useState({
        id: "1",
        title: "همه",
        minPrice: 0,
        maxPrice: 100000000,
    });
    const [isFreeExpress, setIsFreeExpress] = useState(false);
    const [haveCoupon, setHaveCoupon] = useState(false);
    const [sortType, setSortType] = useState("");


    const filterShops = [...filteredShops].filter((s) =>
        isFreeExpress
            ? s.deliveryCost === 0
            : s.deliveryCost >= 0 && haveCoupon
                ? s.coupons.length > 0
                : s.coupons.length >= 0 &&
                getPriceAverage(s.foods) >= priceRange.minPrice &&
                getPriceAverage(s.foods) < priceRange.maxPrice
    );


    switch (sortType) {
        case 'Sort_By_High_Score':
            filterShops.sort(
                (a, b) => calculateRate(b.comments) - calculateRate(a.comments),
            )
            break;

        case 'Sort_By_Cheap_Price':
            filterShops.sort(
                (a, b) => getPriceAverage(a.foods) - getPriceAverage(b.foods),
            )
            break;

        case 'Sort_By_Best_Coupon':
            filterShops.sort(
                (a, b) => getBestCoupone(b.coupons) - getBestCoupone(a.coupons),
            )
            break;

        default:
            break;
    }


    return (
        <Grid container direction="column">
            <MyHead
                description="فیلتر فروشگاه براساس نظرهای شما"
                title="فروشگاها"
                keywords="test"
            />
            <Grid container item justifyContent="flex-end">
                <Grid item p={1}>
                    <SortShopsSelect handleChangeSort={setSortType}/>
                </Grid>
            </Grid>
            <Grid container item direction={{sm: "column", md: "row"}}>
                <Grid item container direction="column" md={3} sm={12} component="aside">
                    <CategoriesBox shopType={type}/>
                    <PriceRangeButtonGroup handleChange={setPriceRange} activeRange={priceRange}/>
                    <FilterShopBox
                        setIsFreeExpress={setIsFreeExpress}
                        isFreeExpress={isFreeExpress}
                        haveCoupon={haveCoupon}
                        setHaveCoupon={setHaveCoupon}
                    />
                </Grid>
                <Grid item container md={9} sm={12} component="main">
                    {filterShops.map((shop) => (
                        <Grid item key={shop._id} sm={12} md={6} lg={4} p={2}>
                            <ShopCard shop={shop}/>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Shops;
