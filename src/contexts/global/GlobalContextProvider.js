import { memo, useState } from "react";
import { globalContext } from "./globalContext";
import { useTheme } from "@mui/styles";
import { useMediaQuery } from "@mui/material";

const GlobalContextProvider = ({ children }) => {
  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const [openAuth, setOpenAuth] = useState(false);


  return (
    <globalContext.Provider
      value={{
        isLg,
        isMd,
        isSm,
        isXs,
        openAuth,
        setOpenAuth,
      }}
    >
      {children}
    </globalContext.Provider>
  );
};

export default memo(GlobalContextProvider);
