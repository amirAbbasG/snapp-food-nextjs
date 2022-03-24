import Image from "next/image";

import {makeStyles} from "@mui/styles";

import {getShopTypeByIdApi} from "../src/services/shopServices";
import styles from "../styles/Home.module.css";
import {MyHead, RestaurantCategoriesBox, ShopsShowCasesBox} from "../src/components";
import {getMeal} from "../src/utils/mealCalculator";
import {getTopRatedShops, getDiscountedShops, getShopsWithCoupon, getShopByCategory} from "../src/services/shopServices"


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
    const {data: {discountedShops}} = await getDiscountedShops(7)
    const {data: {topRatedShops}} = await getTopRatedShops(7)
    const {data: {shopsWithCoupon}} = await getShopsWithCoupon(7)
    const {data: {shopType}} = await getShopTypeByIdApi("616c684f4307800a96a20261")
    const {data: {shops}} = await getShopByCategory("رستوران", 7)

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
                data={restaurants}
                title={` ${getMeal()} در اسنپ فود`}
            />
            <ShopsShowCasesBox
                data={discountedShops}
                title="دارای تخفیف"
            />
            <ShopsShowCasesBox
                data={topRatedShops}
                title="دارای کوپن"
            />
            <ShopsShowCasesBox
                data={shopsWithCoupon}
                title="بهترین ها در اسنپ فود"
            />

        </div>
    );
}
