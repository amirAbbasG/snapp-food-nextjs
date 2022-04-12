import cookie from "cookie"
import AES from 'crypto-js/aes';

export const setTokenCookie = (token, res) => {
    const maxAge = 5 * 24 * 60 * 60

    const setCookie = cookie.serialize("token", token, {
        httpOnly: true,
        maxAge,
        expires: new Date(Date.now() + maxAge * 1000),
        path: "/",
        secure: process.env.NODE_ENV === "production",
        encode: value => AES.encrypt(value, process.env.CRYPTO_ENCRYPT_KEY).toString()
    })
    res.setHeader("Set-Cookie", setCookie)
}


export const removeCookie = (res) => {
    const val = cookie.serialize("token", "", {
        maxAge: -1,
        path: "/",
    });

    res.setHeader("Set-Cookie", val);
};
