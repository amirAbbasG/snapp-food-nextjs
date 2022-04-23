import { createContext } from "react";

export const globalContext = createContext({
  isXl: false,
  isLg: false,
  isMd: false,
  isSm: false,
  isXs: false,
  openAuth: false,
  setOpenAuth: () => {},
});


