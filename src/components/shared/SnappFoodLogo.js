import Link from "next/link";
import Image from "next/image"

const SnappFoodLogo = ({ className }) => {
  return (
    <Link href="/"
    >
      <a style={{
          marginLeft: "1rem",
      }}>
        <Image

          height={70}
          width={70}
          className={className}
          src="/images/logo-name.png"
          alt="snapp food logo"
        />
      </a>
    </Link>
  );
};

export default SnappFoodLogo;
