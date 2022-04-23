import { useState } from "react";
import { globalContext } from "./globalContext";
import { useTheme } from "@mui/system";
import { useMediaQuery } from "@mui/material";

const GlobalContextProvider = ({ children }) => {
  const { breakpoints } = useTheme();
  const isXl = useMediaQuery(breakpoints.up("xl"));
  const isLg = useMediaQuery(breakpoints.between("lg", "xl"));
  const isMd = useMediaQuery(breakpoints.between("md", "lg"));
  const isSm = useMediaQuery(breakpoints.between("sm", "md"));
  const isXs = useMediaQuery(breakpoints.down("sm"));
  const [openAuth, setOpenAuth] = useState(false);

  return (
    <globalContext.Provider
      value={{
        isXl,
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

export default GlobalContextProvider;
