import { TINANAI_SOLANA_CONFIG, TINANAI_VERIFICATION_PENDING_MESSAGE } from '../config/tinanai-solana'

const base58Pattern = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/

export interface TinanAiTokenStatus {
  mint: string | null
  verified: boolean
  message: string
}

export function getTinanAiTokenStatus(): TinanAiTokenStatus {
  const mint = TINANAI_SOLANA_CONFIG.mint || null
  const verified = mint !== null && base58Pattern.test(mint)

  return {
    mint: verified ? mint : null,
    verified,
    message: verified ? 'Mint published by environment configuration.' : TINANAI_VERIFICATION_PENDING_MESSAGE,
  }
}
