import CryptoJS from "crypto-js";
import jwt_decode from "jwt-decode"

export const getUser = (req) => {
    const { token } = req.cookies;
    if (!token) {
        return null
    }
    const decryptedToken = CryptoJS.AES.decrypt(
        token,
        process.env.CRYPTO_ENCRYPT_KEY
    ).toString(CryptoJS.enc.Utf8);

    if (!decryptedToken){
        return null
    }

    const user = jwt_decode(decryptedToken)

    return user
}
