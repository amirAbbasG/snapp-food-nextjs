import React, { useContext } from "react";
import {
  Menu,
  MenuItem,
  MenuList,
  ListItemText,
  ListItemIcon,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PersonOutline, Logout } from "@mui/icons-material";
import { accountContext } from "../../Contexts";
import { useSelector } from "react-redux";

const ProfileMenu = ({ onClose, anchorEl }) => {
  const open = Boolean(anchorEl);
  const { exitAccount } = useContext(accountContext);
  const navigate = useNavigate();

  const account = useSelector((state) => state.account);

  return (
    <Menu anchorEl={anchorEl} onClose={onClose} open={open}>
      <MenuList>
        <MenuItem onClick={() => navigate("profile")}>
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
