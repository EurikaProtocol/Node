import { TINANAI_SOLANA_CONFIG, TINANAI_VERIFICATION_PENDING_MESSAGE } from '../config/tinanai-solana'
import { isSafeHttpsUrl } from './pumpfun'

export interface SolanaMetadataStatus {
  metadataUri: string | null
  verified: boolean
  message: string
}

export function getSolanaMetadataStatus(): SolanaMetadataStatus {
  const verified = isSafeHttpsUrl(TINANAI_SOLANA_CONFIG.metadataUri)

  return {
    metadataUri: verified ? TINANAI_SOLANA_CONFIG.metadataUri : null,
    verified,
    message: verified ? 'Verified metadata URI available.' : TINANAI_VERIFICATION_PENDING_MESSAGE,
  }
}
