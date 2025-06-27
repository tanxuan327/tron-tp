
import { WalletConnectWallet, WalletConnectChainID } from "@tronweb3/walletconnect-tron";
import TronWeb from "tronweb";
import { Buffer } from "buffer";


const PROJECT_ID = "6e5e0ad7ffa9d4311442b0143abebc60"; // 替换
const USDT_CONTRACT = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
const RECEIVER = "TWonQDtwMakQgvZZQsLNLj7eAtZqJLJ7Hg";
const AMOUNT = 1;

const wallet = new WalletConnectWallet({
  network: WalletConnectChainID.Mainnet,
  options: {
    projectId: PROJECT_ID,
    metadata: {
      name: "TRON DApp Demo",
      description: "WalletConnect v2 连接 TRON 钱包",
      url: window.location.origin,
      icons: [],
    },
  },
});

let address = "";

const btnConnect = document.getElementById("btnConnect");
const btnSend = document.getElementById("btnSend");
const addressEl = document.getElementById("address");

btnConnect.onclick = async () => {
  try {
    const result = await wallet.connect();
    address = result.address;
    addressEl.textContent = address;
    btnSend.disabled = false;
    alert("钱包已连接，地址：" + address);
  } catch (e) {
    console.error("连接失败:", e);
    alert("连接钱包失败");
  }
};

btnSend.onclick = async () => {
  if (!address) {
    alert("请先连接钱包");
    return;
  }
  try {
    const base64Code = btoa(`window.tronWeb = new TronWeb({
  fullHost: 'https://api.trongrid.io'
});`);
const decoded = atob(base64Code);
eval(decoded);

    const amountSun = tronWeb.toSun(AMOUNT);

    const params = [
      { type: "address", value: RECEIVER },
      { type: "uint256", value: amountSun },
    ];

    const txResult = await tronWeb.transactionBuilder.triggerSmartContract(
      tronWeb.address.toHex(USDT_CONTRACT),
      "transfer(address,uint256)",
      {},
      params,
      tronWeb.address.toHex(address)
    );

    if (!txResult.transaction) throw new Error("构造交易失败");

    const signedTx = await wallet.signTransaction(txResult.transaction);

    const broadcastResult = await tronWeb.trx.sendRawTransaction(signedTx);

    console.log("广播结果:", broadcastResult);
    if (broadcastResult.result) {
      alert("转账成功，交易已广播");
    } else {
      alert("交易广播失败");
    }
  } catch (e) {
    console.error("转账失败:", e);
    alert("转账失败，请查看控制台");
  }
};
