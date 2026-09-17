import { TINANAI_SOLANA_CONFIG, type SolanaNetwork } from '../config/tinanai-solana'

export interface SolanaConnectionInfo {
  network: SolanaNetwork
  rpcUrl: string | null
  usingDefaultEndpoint: boolean
}

export function getSolanaConnectionInfo(): SolanaConnectionInfo {
  return {
    network: TINANAI_SOLANA_CONFIG.network,
    rpcUrl: TINANAI_SOLANA_CONFIG.rpcUrl || null,
    usingDefaultEndpoint: TINANAI_SOLANA_CONFIG.rpcUrl.length === 0,
  }
}
