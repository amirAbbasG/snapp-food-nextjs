import Image from "next/image";

import { Grid, Typography, Stack } from "@mui/material";
import {styled, useTheme} from "@mui/system";

import {Link} from "../";
import { SocialMediaButton, SnappFoodLogo } from "../";
import { socialMedias, links } from "../../utils/values";

const Footer = () => {

  const {breakpoints} = useTheme()

  const styles =  {
    root: {
      backgroundColor: "secondary.main",
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
      [breakpoints.down("md")]: {
        marginBottom: "2rem",
        textAlign: "center",
      },
    },

    logoBox: {
      [breakpoints.down("md")]: {
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
    <Stack direction={{ xs: "column", md: "row" }} sx={root} component="footer">
      <Grid container sx={logoBox}>
        <SnappFoodLogo />
        <Grid item sx={socialsMediaBox} component="nav">
          <Typography variant="h6" fontWeight="bold" color="primary">
            اسنپ فود
          </Typography>
          <FooterText>تجربه سفارش غذا، از زودفود تا اسنپ‌فود</FooterText>
          <Grid>
            {socialMedias.map((item) => (
              <SocialMediaButton name={item} href="#" key={item} />
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


