
import {Grid, Typography, Card} from "@mui/material";
import {KeyboardArrowLeft} from "@mui/icons-material";
import {useTheme} from "@mui/system";

import {Link} from "../";



const CategoryCard = ({category}) => {

    const {breakpoints} = useTheme()
    const styles = {
        root: {
            width: "11rem",
            height: "6rem",
            borderRadius: "10px",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-start",
            cursor: "pointer",
            [breakpoints.down("sm")] : {
                width: "13rem",
                height: "7rem"
            }

        },
        titleGrid: {
            backgroundColor: "#FFFFFF",
            width: "57%",
            borderTopLeftRadius: "10px",
            alignItems: "center",
            paddingRight: "3px",
            transition: "width 0.40s",

            justifyContent: "space-between",
            "&:hover": {
                width: "100%",
                borderTopLeftRadius: 0,
            },
        },
        title: {
            margin: "3px 8px 3px 0",
        },
    }


    const {root, title, titleGrid} = styles

    return (
        <Link href={`/shops?filter=category&category=${category}`}>
                <Card
                    elevation={2}
                    sx={{
                        ...root, backgroundImage: `url(/images/categories/${category.replace(
                            " ",
                            "-"
                        )}.jpg)`,
                    }}
                    component="article"
                >
                    <Grid container spacing={2}
                          sx={titleGrid}

                    >
                        <Typography
                            sx={title}
                            component="h6"
                        >{category}</Typography>
                        <KeyboardArrowLeft color="primary"/>
                    </Grid>
                </Card>
        </Link>
    );
};

export default CategoryCard;


