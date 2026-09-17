import { TINANAI_SOLANA_CONFIG, TINANAI_VERIFICATION_PENDING_MESSAGE } from '../config/tinanai-solana'

const base58Pattern = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/

export interface TinanAiTokenStatus {
  mint: string | null
  verified: boolean
  formatValid: boolean
  message: string
}

export function getTinanAiTokenStatus(): TinanAiTokenStatus {
  const mint = TINANAI_SOLANA_CONFIG.mint || null
  const formatValid = mint !== null && base58Pattern.test(mint)

  return {
    mint: formatValid ? mint : null,
    verified: false,
    formatValid,
    message: formatValid
      ? 'Mint configured, but verification is still pending.'
      : TINANAI_VERIFICATION_PENDING_MESSAGE,
  }
}
