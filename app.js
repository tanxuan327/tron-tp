import { WalletConnectWallet, WalletConnectChainID } from "@tronweb3/walletconnect-tron";

const PROJECT_ID = "ccc8763c8152c6f2d51151b5cc8acf7a";

const wallet = new WalletConnectWallet({
  network: WalletConnectChainID.Mainnet,
  options: {
    projectId: PROJECT_ID,
    metadata: {
      name: "My DApp",
      description: "TRON WalletConnect",
      url: "https://你的网址",
      icons: ["https://你的logo.png"],
    },
  },
});

wallet.on("display_uri", (uri) => {
  console.log("请扫码连接钱包:", uri);
  // TODO: 这里你可以用二维码库生成二维码显示
});

async function btnConnect() {
  try {
    const result = await wallet.connect();
    console.log("钱包地址:", result.address);
  } catch (e) {
    console.error("连接失败:", e);
  }
}

connectWallet();
