import {useContext} from "react";

import { useRouter } from "next/router";

import {
  Menu,
  MenuItem,
  MenuList,
  ListItemText,
  ListItemIcon,
  Stack,
} from "@mui/material";
import { PersonOutline, Logout } from "@mui/icons-material";
import {useSelector} from "react-redux";

import {accountContext} from "../../contexts/account/accountContext";

const ProfileMenu = ({ onClose, anchorEl }) => {
  const open = Boolean(anchorEl);
  const { exitAccount } = useContext(accountContext);
  const router = useRouter();

  const account = useSelector((state) => state.account);

  return (
    <Menu anchorEl={anchorEl} onClose={onClose} open={open}>
      <MenuList>
        <MenuItem onClick={() => router.push("/profile")}>
          <ListItemIcon>
            <PersonOutline />
          </ListItemIcon>
          <Stack>
            <ListItemText>{account.fullName}</ListItemText>
            <ListItemText style={{ color: "#00B862" }}>
              مشاهده حساب کاربری
            </ListItemText>
          </Stack>
        </MenuItem>
        <MenuItem
          onClick={() => {
            exitAccount();
            onClose();
          }}
        >
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText>خروج</ListItemText>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ProfileMenu;
