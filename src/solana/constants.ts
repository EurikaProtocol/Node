import { TINANAI_SOLANA_CONFIG, TINANAI_VERIFICATION_PENDING_MESSAGE } from '../config/tinanai-solana'

export const SOLANA_EXPLORER_HOSTS = ['explorer.solana.com', 'solscan.io'] as const
export const PUMPFUN_HOST = 'pump.fun' as const
export const DEFAULT_SOLANA_NETWORK = TINANAI_SOLANA_CONFIG.network
export const SOLANA_STATUS_MESSAGE = TINANAI_VERIFICATION_PENDING_MESSAGE
