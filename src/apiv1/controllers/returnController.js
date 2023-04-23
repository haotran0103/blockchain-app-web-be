module.exports = {
  post: async (req, res) => {
    const data = req.query;
    const vnp_SecureHash = data.vnp_SecureHash;
    delete data.vnp_SecureHashType;
    delete data.vnp_SecureHash;
    const signData = querystring.stringify(data, { encode: false });
    const secureHash = sha256(process.env.VNP_HASH_SECRET + signData);
    if (vnp_SecureHash === secureHash) {
      // Thanh toán thành công
      // Thực hiện xử lý dữ liệu trả về tại đây
      res.send("Thanh toán thành công!");
    } else {
      // Thanh toán thất bại
      res.send("Thanh toán thất bại!");
    }
  },
};
