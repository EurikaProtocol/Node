const allowedNetworks = ['devnet', 'testnet', 'mainnet-beta'] as const

type SolanaNetwork = (typeof allowedNetworks)[number]

const envNetwork = import.meta.env.VITE_SOLANA_NETWORK
const network = allowedNetworks.includes(envNetwork as SolanaNetwork)
  ? (envNetwork as SolanaNetwork)
  : 'devnet'

export const TINANAI_SOLANA_CONFIG = {
  network,
  rpcUrl: import.meta.env.VITE_SOLANA_RPC_URL?.trim() ?? '',
  mint: import.meta.env.VITE_TINANAI_SOLANA_MINT?.trim() ?? '',
  pumpfunTokenUrl: import.meta.env.VITE_PUMPFUN_TOKEN_URL?.trim() ?? '',
  metadataUri: import.meta.env.VITE_TINANAI_METADATA_URI?.trim() ?? '',
} as const

export const TINANAI_VERIFICATION_PENDING_MESSAGE =
  'Official TinanAI Solana token launch details will be published here after verification.'

export type TinanAiSolanaConfig = typeof TINANAI_SOLANA_CONFIG
export type { SolanaNetwork }
