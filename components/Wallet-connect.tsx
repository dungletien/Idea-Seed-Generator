"use client";

import {
  useCurrentAccount,
  useConnectWallet,
  useDisconnectWallet,
  useSwitchAccount,
  useIotaClientQuery,
} from "@iota/dapp-kit";
import { Button, Container, Flex, Heading, Text } from "@radix-ui/themes";

export function WalletConnect() {
  const currentAccount = useCurrentAccount();
  const { mutate: connect } = useConnectWallet();
  const { mutate: disconnect } = useDisconnectWallet();
  const { mutate: switchAccount } = useSwitchAccount();

  // Get account balance
  const { data: balance } = useIotaClientQuery(
    "getBalance",
    {
      owner: currentAccount?.address || "",
    },
    {
      enabled: !!currentAccount,
    }
  );

  return (
    <div
      style={{
        background: "var(--accent-3)",
        borderBottom: "1px solid var(--gray-6)",
        padding: "1rem 0",
      }}
    >
      <Container>
        <Flex justify="between" align="center">
          <Heading size="5">💡 Idea Seed Generator</Heading>
          <Flex align="center" gap="3">
            {currentAccount ? (
              <>
                <div>
                  <Text size="2" style={{ display: "block" }}>
                    {currentAccount.address.slice(0, 6)}...
                    {currentAccount.address.slice(-4)}
                  </Text>
                  {balance && (
                    <Text size="1" style={{ color: "var(--gray-11)" }}>
                      {(Number(balance.totalBalance) / 1_000_000_000).toFixed(
                        4
                      )}{" "}
                      IOTA
                    </Text>
                  )}
                </div>
                <Button onClick={() => disconnect()} variant="soft">
                  Disconnect
                </Button>
              </>
            ) : (
              <Button onClick={() => connect()}>Connect Wallet</Button>
            )}
          </Flex>
        </Flex>
      </Container>
    </div>
  );
}
