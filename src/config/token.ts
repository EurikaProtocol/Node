export const EUREKA_TOKEN = {
  name: 'EUREKA',
  symbol: 'ERK',
  decimals: 18,
  chainId: 1,
  contract: '0x4042973c0863cca0d73f028ca98465f44f0e6f97',
  founderWallet: '0x5D0435779b10234fD4941cc15fae8C7C86117E91',
  rpcUrl: import.meta.env.VITE_EVM_RPC_URL?.trim() || 'https://ethereum-rpc.publicnode.com',
  explorerUrl: 'https://etherscan.io/token/0x4042973c0863cca0d73f028ca98465f44f0e6f97',
  whitepaperDownloadUrl: '/eurekacore-whitepaper.md',
} as const

export type EurekaTokenConfig = typeof EUREKA_TOKEN
