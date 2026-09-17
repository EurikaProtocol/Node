import { TINANAI_SOLANA_CONFIG, TINANAI_VERIFICATION_PENDING_MESSAGE } from '../config/tinanai-solana'
import { isSafeHttpsUrl } from './pumpfun'

export interface SolanaMetadataStatus {
  metadataUri: string | null
  verified: boolean
  message: string
}

export function getSolanaMetadataStatus(): SolanaMetadataStatus {
  const metadataUri = isSafeHttpsUrl(TINANAI_SOLANA_CONFIG.metadataUri)
    ? TINANAI_SOLANA_CONFIG.metadataUri
    : null

  return {
    metadataUri,
    verified: false,
    message: metadataUri
      ? 'Metadata URI configured, but verification is still pending.'
      : TINANAI_VERIFICATION_PENDING_MESSAGE,
  }
}
