import { NextResponse } from "next/server";
import jwt_decode from "jwt-decode"

export async function middleware(req) {
  const token = req.headers.get('authorization')
  const user = jwt_decode(token)

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
