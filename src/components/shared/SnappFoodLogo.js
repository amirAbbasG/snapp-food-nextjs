import React from "react";
import { Link } from "react-router-dom";

const SnappFoodLogo = ({ className }) => {
  return (
    <Link to="/">
      <img
        style={{
          width: "4.4rem",
          height: "4.4rem",
          marginLeft: "1rem",
        }}
        className={className}
        src="/images/logo-name.png"
        alt="snapp food logo"
      />
    </Link>
  );
};

export default SnappFoodLogo;
