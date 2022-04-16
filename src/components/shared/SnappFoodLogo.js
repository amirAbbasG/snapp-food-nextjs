import Image from "next/image"

import {Link} from "../";
import {Box} from "@mui/system";

const SnappFoodLogo = ({className}) => {
    return (
        <Link href="/"

        >
            <Box sx={{
                marginLeft: "1rem",
                transition: "transform 0.24s ease-in-out",
                "&:hover": {
                    transform: "scale(1.14)"
                },
            }}>
                <Image

                    height={70}
                    width={70}
                    className={className}
                    src="/images/logo-name.png"
                    alt="snapp food logo"
                />
            </Box>
        </Link>
    );
};

export default SnappFoodLogo;
