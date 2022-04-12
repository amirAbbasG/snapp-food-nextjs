import {createContext} from 'react';

export const accountContext = createContext({
  action: '',
  setAction: () => {},
  handleUserAuthSubmit: () => {},
  isLoadingButton: false,
  setIsLoadingButton: () => {},
  editProfile: () => {},
  addAddress: () => {},
  exitAccount: () => {},
  forgotPassword: () => {},
  changeAuthenticatedUserPassword: () => {},
});


