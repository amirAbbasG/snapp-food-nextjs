import Image from "next/image"

import {Link} from "../";

const SnappFoodLogo = ({ className }) => {
  return (
    <Link href="/"

    >
      <div style={{
          marginLeft: "1rem",
      }}>
        <Image

          height={70}
          width={70}
          className={className}
          src="/images/logo-name.png"
          alt="snapp food logo"
        />
      </div>
    </Link>
  );
};

export default SnappFoodLogo;
