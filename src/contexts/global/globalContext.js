import { createContext } from "react";

const globalContext = createContext({
  backClickHandler: () => {},
  chekNet: () => {},
  errorToast: () => {},
  successToast: () => {},
  isLg: false,
  isMd: false,
  isSm: false,
  isXs: false,
  openAuth: false,
  setOpenAuth: () => {},
});

export default globalContext;
