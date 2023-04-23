function sortObject(obj) {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}
module.exports = {
  get: (req, res) => {
    var vnp_Params = req.query;

    var secureHash = vnp_Params["vnp_SecureHash"];

    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];

    vnp_Params = sortObject(vnp_Params);

    var config = require("config");
    var tmnCode = config.get("vnp_TmnCode");
    var secretKey = config.get("vnp_HashSecret");

    var querystring = require("qs");
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var crypto = require("crypto");
    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");

    if (secureHash === signed) {
      //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
      res.render("success", { code: vnp_Params["vnp_ResponseCode"] });
    } else {
      res.render("success", { code: "97" });
    }
  },
  payment: async (req, res) => {
    const qs = require("qs");
    const moment = require("moment");
    const ipAddr =
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;
    const config = require("../../configs/configsPayment.json");
    const tmnCode = process.env.VNP_TMN_CODE || config.vnp_TmnCode;
    const secretKey = process.env.VNP_HASH_SECRET || config.vnp_HashSecret;
    let vnpUrl = process.env.VNP_URL || config.vnp_Url;
    let returnUrl = process.env.VNP_RETURN_URL || config.vnp_ReturnUrl;
    const date = new Date();
    const createDate = moment(date).format("YYYYMMDDHHmmss");
    const orderId = moment(date).format("HHmmss");
    const body = qs.parse(req.body);
    const { amount, bankCode, orderInfo, orderType, locale = "vn" } = body;
    console.log(req.body);
    const currCode = "VND";
    const vnp_Params = {
      vnp_Version: "2.1.0",
      vnp_Command: "pay",
      vnp_TmnCode: tmnCode,
      vnp_Locale: locale,
      vnp_CurrCode: currCode,
      vnp_TxnRef: orderId,
      vnp_OrderInfo: orderInfo,
      vnp_OrderType: orderType,
      vnp_Amount: amount * 100,
      vnp_ReturnUrl: returnUrl,
      vnp_IpAddr: ipAddr,
      vnp_CreateDate: createDate,
    };
    if (bankCode !== null && bankCode !== "") {
      vnp_Params["vnp_BankCode"] = bankCode;
    }
    const sortedParams = sortObject(vnp_Params);
    const signData = Object.keys(sortedParams)
      .map((key) => `${key}=${sortedParams[key]}`)
      .join("&");
    const crypto = require("crypto");
    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(signData).digest("hex");
    vnp_Params["vnp_SecureHash"] = signed;
    const queryString = Object.keys(vnp_Params)
      .map((key) => `${key}=${vnp_Params[key]}`)
      .join("&");
    vnpUrl += "?" + queryString;

    res.send({ successUrl: vnpUrl });
  },
};
