import { NextResponse } from "next/server";

import jwt from "@tsndr/cloudflare-worker-jwt";

export async function middleware(req) {
  const token = req.header("Authorization");

  if (!token) {
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
  const user = jwt.decode(token, process.env.JWT_SECRET);
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

  req.user = user;
  return NextResponse.next();
}
