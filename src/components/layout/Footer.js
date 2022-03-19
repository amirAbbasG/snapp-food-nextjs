import { Grid, Typography, Stack } from "@mui/material";
import { makeStyles, styled } from "@mui/styles";
import { SocialMediaButton, SnappFoodLogo } from "../";
import Link from "next/link";
import { socialMedias, links } from "../../utils/values";

const Footer = () => {
  const { root, logoBox, socialsMediaBox, linkBox, img } = useStyles();
  const FooterText = styled(Typography)({
    marginBottom: "1rem",
    color: "gray",
  });

  return (
    <Stack direction={{ xs: "column", md: "row" }} className={root}>
      <Grid container className={logoBox}>
        <SnappFoodLogo />
        <Grid item className={socialsMediaBox}>
          <Typography variant="h6" fontWeight="bold" color="primary">
            اسنپ فود
          </Typography>
          <FooterText>تجربه سفارش غذا، از زودفود تا اسنپ‌فود</FooterText>
          <Grid>
            {socialMedias.map((item, index) => (
              <SocialMediaButton name={item} href="#" key={index} />
            ))}
          </Grid>
        </Grid>
      </Grid>

      <Grid
        container
        display="grid"
        gridTemplateColumns="repeat(2, 1fr)"
        className={linkBox}
      >
        {links.map((item, index) => (
          <Link href="#" key={index}>
            <a>
              <FooterText>{item}</FooterText>
            </a>
          </Link>
        ))}
      </Grid>

      <img src="/images/enamad.png" alt="enamad logo" className={img} />
    </Stack>
  );
};

export default Footer;

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
    padding: "1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  img: {
    width: "6rem",
    height: "6rem",
  },
  socialsMediaBox: {
    direction: "column",
  },
  linkBox: {
    [theme.breakpoints.down("md")]: {
      marginBottom: "2rem",
      textAlign: "center",
    },
  },
  logoBox: {
    [theme.breakpoints.down("md")]: {
      justifyContent: "space-around",
      marginBottom: "2rem",
    },
  },
}));
