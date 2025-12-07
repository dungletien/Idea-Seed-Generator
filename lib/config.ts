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
    mainnet: {
      url: getFullnodeUrl("mainnet"),
      variables: {
        packageId: "YOUR_PACKAGE_ID_HERE", // Replace with your deployed package ID
      },
    },
  });

export { useNetworkVariable, useNetworkVariables, networkConfig };
