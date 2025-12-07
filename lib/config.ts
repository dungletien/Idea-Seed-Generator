/**
 * Network Configuration
 * 
 * Configure your IOTA networks and package IDs here
 */

import { getFullnodeUrl } from "@iota/iota-sdk/client";
import { createNetworkConfig } from "@iota/dapp-kit";

// Package IDs - These will be automatically filled when you run `npm run iota-deploy`
export const DEVNET_PACKAGE_ID = "";
export const TESTNET_PACKAGE_ID = "";
export const MAINNET_PACKAGE_ID = "";

// Network configuration
const { networkConfig, useNetworkVariable, useNetworkVariables } = createNetworkConfig({
  devnet: {
    url: getFullnodeUrl("devnet"),
    variables: {
      packageId: DEVNET_PACKAGE_ID,
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
  },
  mainnet: {
    url: getFullnodeUrl("mainnet"),
    variables: {
      packageId: MAINNET_PACKAGE_ID,
    },
  },
});

export { useNetworkVariable, useNetworkVariables, networkConfig };
