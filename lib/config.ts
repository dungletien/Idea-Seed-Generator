import { createNetworkConfig } from "@iota/dapp-kit";
import { getFullnodeUrl } from "@iota/iota-sdk/client";

const { networkConfig, useNetworkVariable, useNetworkVariables } =
  createNetworkConfig({
    testnet: {
      url: getFullnodeUrl("testnet"),
      variables: {
        packageId: "YOUR_PACKAGE_ID_HERE", // Replace with your deployed package ID
      },
    },
    devnet: {
      url: getFullnodeUrl("devnet"),
      variables: {
        packageId: "0x47b416f0aa7901e561086213c055ebf86075e0985f0da60a480924b08083a68e", // Replace with your deployed package ID
      },
    },
    mainnet: {
      url: getFullnodeUrl("mainnet"),
      variables: {
        packageId: "YOUR_PACKAGE_ID_HERE", // Replace with your deployed package ID
      },
    },
  });

export { useNetworkVariable, useNetworkVariables, networkConfig };
