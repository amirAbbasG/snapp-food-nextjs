import {NextResponse} from "next/server";
import {getUser} from "../../../src/utils/apiHelper";

export async function middleware(req) {

    const user = getUser(req)

    if (!user) {
        return new Response(
            JSON.stringify({
                message: "برای دسترسی با این بخشن نیاز به حساب کاربری است",

            }),
            {
                status: 401,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }


    return NextResponse.next();
}
