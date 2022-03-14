import React from "react";
import { IconButton, Card } from "@mui/material";
import { YouTube, Instagram, Twitter, Telegram } from "@mui/icons-material";

const SocialMediaButton = ({ name, href }) => {
  return (
    <IconButton href={href}>
      <Card
        elevation={2}
        style={{
          borderRadius: "50%",
          width: "2.5rem",
          height: "2.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {
          {
            instagram: <Instagram fontSize="small" />,
            telegram: <Telegram fontSize="small" />,
            youtube: <YouTube fontSize="small" />,
            twiter: <Twitter fontSize="small" />,
          }[name]
        }
      </Card>
    </IconButton>
  );
};

export default SocialMediaButton;
