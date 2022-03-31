
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { MyHead, ShopCard } from "../../src/components";

const FavoriteShops = () => {
    const account = useSelector((state) => state.account);

    return (
        <>
            <MyHead
                description="رستوران ها و فروشگاهای مورد علاقه خود را ذخیر و مشاهده کنید"
                title="فروشگاهای موردعلاقه"
                keywords="test"
            />
            {!isEmpty(account) && (
                <Grid container p={5} rowSpacing={3} justifyContent="space-between">
                    {account.favoriteShop && account.favoriteShop.map((shop) => (
                        <Grid
                            item
                            xs={12}
                            md={6}
                            key={shop._id}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <ShopCard shop={shop} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </>
    );
};

export default FavoriteShops;
