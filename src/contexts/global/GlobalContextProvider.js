import React, { memo, useState } from "react";
import { globalContext } from "..";
import { useTheme } from "@mui/styles";
import { useMediaQuery } from "@mui/material";

const GlobalContextProvider = ({ children }) => {
  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const [openAuth, setOpenAuth] = useState(false);

  // //#region check is user connected to internet
  // const needNetAlert = () => {
  //   Alert.alert(
  //     'اتصال اینترنت',
  //     'برای ادامه کار نیاز به اتصال به اینترنت است',
  //     [
  //       {
  //         text: 'باشه',
  //         onPress: BackHandler.exitApp,
  //       },
  //     ],
  //     {cancelable: false},
  //   );
  // };
  //
  // const chekNet = async () => {
  //   const state = await NetInfo.fetch();
  //   if (!state.isConnected) {
  //     needNetAlert();
  //   }
  // };
  // //#endregion

  return (
    <globalContext.Provider
      value={{
        // chekNet,
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
