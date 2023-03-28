import Kavenegar from "kavenegar"
import NodeCache from "node-cache";
const myCache = new NodeCache( { stdTTL: 120, checkperiod: 121 } );
const api = Kavenegar.KavenegarApi({
    //تو کاوه نگار به صورت انلاین ثبت نام کن و کد رو تو صفحه حساب کاربری بگیر
    apikey: process.env.KAVENEGAR_API_KEY
});



const sendCode = (userNumber, callback) => {
    // const number = Math.floor(Math.random()*90000 + 10000)
    const number = 11111

    myCache.set(userNumber, number)
    api.Send({
            message: ` کد فعال سازی : ${number}`,
        // تو صفحه حساب کاربری شماره پیشفرض رایگان رو انتخاب کن و ان را در sender جایگذاری کن
            sender: "10008663",
            receptor: userNumber
        },
        callback)
}


const isValidCode = (code, userNumber) => {
    const cashedCode = myCache.get(userNumber)
    if (code == cashedCode){
        return true
    }else {
        return false
    }
}
module.exports = {sendCode, isValidCode}
