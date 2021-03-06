import React from "react";
import { MoralisProvider } from "react-moralis";
import Moralis from "moralis/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { enableViaWalletConnect } from "./Moralis/enableViaWalletConnect";
import WalletConnectProvider, {
  WalletConnectProviderProps,
} from "./WalletConnect";
import { Platform } from "react-native";
import Qrcode from "./Qrcode";
import { expo } from "../app.json";

interface ProvidersProps {
  readonly children: JSX.Element;
}

const { scheme } = expo;

/**
 * Initialization of Moralis
 */
// const appId = "XbJwVDaAb6PmtJwqB71j9KD0bW2Wv1Go1CNBmXv2";
// const serverUrl = "https://pam4gp2widew.moralis.io:2053/server";
// const appId = "HogjGn14S5WRXK0MadjlfJIQ8MZjp6fPnkfuvwew";
// const serverUrl = "https://hxhhxa4va5cs.usemoralis.com:2053/server";
const appId = "xYBnSyYrWFqQJD93kro1zScUih8OWiOKyFPPvYsX";
const serverUrl = "https://dnydgszkkoqd.usemoralis.com:2053/server";
const environment = "native";
// Initialize Moralis with AsyncStorage to support react-native storage
Moralis.setAsyncStorage(AsyncStorage);
// Replace the enable function to use the react-native WalletConnect
// @ts-ignore
Moralis.enable = enableViaWalletConnect;

const walletConnectOptions: WalletConnectProviderProps = {
  redirectUrl: Platform.OS === "web" ? window.location.origin : `${scheme}://`,
  storageOptions: {
    // @ts-ignore
    asyncStorage: AsyncStorage,
  },
  qrcodeModalOptions: {
    mobileLinks: [
      "rainbow",
      "metamask",
      "argent",
      "trust",
      "imtoken",
      "pillar",
    ],
  },
  // Uncomment to show a QR-code to connect a wallet
  // renderQrcodeModal: Qrcode,
};

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <WalletConnectProvider {...walletConnectOptions}>
      <MoralisProvider
        appId={appId}
        serverUrl={serverUrl}
        environment={environment}>
        {children}
      </MoralisProvider>
    </WalletConnectProvider>
  );
};
