import { TINANAI_SOLANA_CONFIG } from '../config/tinanai-solana'
import { NotImplementedError, requireAuthorization, type AuthorizationRequest } from './shared'

export interface SolanaBalanceSnapshot {
  account: string
  balance: null
  symbol: 'TINANAI'
  status: 'unavailable'
}

export interface SolanaTransactionLookup {
  signature: string
  status: 'unavailable'
}

export function getTinanAiSolanaConfig() {
  return TINANAI_SOLANA_CONFIG
}

export async function connectSolanaWallet(): Promise<never> {
  throw new NotImplementedError('Solana wallet connectivity is not enabled in this production-safe static build.')
}

export async function getSolanaBalance(account: string): Promise<SolanaBalanceSnapshot> {
  return { account, balance: null, symbol: 'TINANAI', status: 'unavailable' }
}

export function getTinanAIMint(): string | null {
  return TINANAI_SOLANA_CONFIG.mint || null
}

export async function getSolanaTransaction(signature: string): Promise<SolanaTransactionLookup> {
  return { signature, status: 'unavailable' }
}

export async function prepareSolanaTransaction(request: AuthorizationRequest): Promise<never> {
  requireAuthorization(request)
  throw new NotImplementedError('Solana transactions require verified wallet support and are not implemented.')
}
