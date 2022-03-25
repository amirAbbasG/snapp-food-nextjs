import Image from "next/image";

import {makeStyles} from "@mui/styles";


import styles from "../styles/Home.module.css";
import {MyHead, RestaurantCategoriesBox, ShopsShowCasesBox} from "../src/components";
import {getMeal} from "../src/utils/mealCalculator";
import {getTopRatedShopsApi, getDiscountedShopsApi, getShopsWithCouponApi, getShopByCategoryApi, getShopTypeByNameApi} from "../src/services/shopServices"


// export async function getStaticProps() {
//     const {data: {shopType}} = await getShopTypeByIdApi("616c684f4307800a96a20261")
//     const restaurantCategories = shopType.categories || []
//     return {
//         props: {
//             restaurantCategories
//         }
//     }
// }

export async function getServerSideProps() {
    const {data: {discountedShops}} = await getDiscountedShopsApi(7)
    const {data: {topRatedShops}} = await getTopRatedShopsApi(7)
    const {data: {shopsWithCoupon}} = await getShopsWithCouponApi(7)
    const {data: {shops}} = await getShopByCategoryApi("رستوران", 7)
    const {data: {shopType}} = await getShopTypeByNameApi("رستوران")


    return {
        props: {
            discountedShops,
            topRatedShops,
            shopsWithCoupon,
            restaurants: shops || [],
            restaurantCategories : shopType.categories || [],
        }
    }
}


export default function Home({restaurantCategories, discountedShops, topRatedShops, shopsWithCoupon, restaurants}) {


    return (
        <div className={styles.container}>
            <MyHead
                description="سفارش انواع غذا به سریع ترین زمان ارسال"
                title="صفحه اصلی"
                keywords="test"
            />

            <RestaurantCategoriesBox categories={restaurantCategories}/>
            <ShopsShowCasesBox
                url="/shops?filter=category&category=رستوران"
                data={restaurants}
                title={` ${getMeal()} در اسنپ فود`}
            />
            <ShopsShowCasesBox
                url="/shops?filter=discounted"
                data={discountedShops}
                title="دارای تخفیف"
            />
            <ShopsShowCasesBox
                url="/shops?filter=coupon"
                data={shopsWithCoupon}
                title="دارای کوپن"
            />
            <ShopsShowCasesBox
                url="/shops?filter=topRated"
                data={topRatedShops}
                title="بهترین ها در اسنپ فود"
            />

        </div>
    );
}
