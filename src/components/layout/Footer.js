import Image from "next/image";

import { Grid, Typography, Stack } from "@mui/material";
import { useTheme } from "@mui/styles";
import {styled} from "@mui/system";

import {Link} from "../";
import { SocialMediaButton, SnappFoodLogo } from "../";
import { socialMedias, links } from "../../utils/values";

const Footer = () => {

  const theme = useTheme()

  const styles =  {
    root: {
      backgroundColor: theme.palette.secondary.main,
      padding: "1rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
      flex: 1
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
  };
  const { root, logoBox, socialsMediaBox, linkBox } = styles;

  const FooterText = styled(Typography)({
    marginBottom: "1rem",
    color: "gray",
  });

  return (
    <Stack direction={{ xs: "column", md: "row" }} sx={root}>
      <Grid container sx={logoBox}>
        <SnappFoodLogo />
        <Grid item sx={socialsMediaBox}>
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
        sx={linkBox}
      >
        {links.map((item, index) => (
          <Link href="#" key={index}>
              <FooterText>{item}</FooterText>
          </Link>
        ))}
      </Grid>

      <Image src="/images/enamad.png" alt="enamad logo" width={300} height={300} />
    </Stack>
  );
};

export default Footer;


