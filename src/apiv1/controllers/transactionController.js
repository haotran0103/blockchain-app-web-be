const express = require("express");
const Web3 = require("web3");
const router = express.Router();
const db = require("../../configs/configsDatabase");
// Khởi tạo đối tượng Web3 với mạng Binance Smart Chain testnet
const web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545");

// Địa chỉ ví của người dùng
const userAddress = "0x504459ea734539D93aE09897e1dfEf983c43de76";

// Mã thông báo (token) cần giao dịch
const tokenAddress = "0x63822ee5acD4E49f193a73345fD13f05f6118Aec";

const recipientAddress = "0xbf437fCd5B4875d32eF2e10E0F1Ff8AB1b309e38";
// ABI (Application Binary Interface) của mã thông báo
const tokenABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "balances",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

// Tạo đối tượng hợp đồng thông báo

const tokenContract = new web3.eth.Contract(tokenABI, tokenAddress);
module.exports = {
  // Chức năng giao dịch thông báo
  post: async (req, res) => {
    try {
      const { amount, toAddress, fromAddress } = req.body;
      console.log(amount, toAddress, fromAddress);
      // Kiểm tra số dư tài khoản người dùng
      const balance = await tokenContract.methods.balanceOf(userAddress).call();
      if (balance < amount) {
        return res.status(400).json({ message: "Not enough balance" });
      }

      // Tạo đối tượng giao dịch
      const transaction = tokenContract.methods.transfer(
        recipientAddress,
        amount
      );

      // Lấy thông tin gasPrice và gasLimit
      const gasPrice = await web3.eth.getGasPrice();
      const gasLimit = await transaction.estimateGas({ from: userAddress });

      // Tạo đối tượng giao dịch đã ký
      const signedTransaction = await web3.eth.accounts.signTransaction(
        {
          to: tokenAddress,
          data: transaction.encodeABI(),
          gas: gasLimit,
          gasPrice: gasPrice,
          from: userAddress,
        },
        "private_key"
      );

      // Gửi giao dịch đã ký đến mạng
      const transactionHash = await web3.eth.sendSignedTransaction(
        signedTransaction.rawTransaction
      );
      console.log(transactionHash);
      // Trả về mã hash của giao dịch
      return res.json({ result: { sendToken: transactionHash } });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
  save: async (req, res) => {
    const insertQuery = `INSERT INTO giaodich (maGD, maVi, idProject, amount) 
                         VALUES ('','${req.body.fromAddress}','${req.body.projectID}','${req.body.amount}')`;
    console.log(insertQuery);
    db.query(insertQuery, (err, response) => {
      if (err) throw err;
      res.json({ message: "Insert success!" });
    });
  },
};
