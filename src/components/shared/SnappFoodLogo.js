import Link from "next/link";

const SnappFoodLogo = ({ className }) => {
  return (
    <Link href="/">
      <a>
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
      </a>
    </Link>
  );
};

export default SnappFoodLogo;
