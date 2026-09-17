import { EUREKA_TOKEN } from '../config/token'
import { NotImplementedError, requireAuthorization, type AuthorizationRequest } from './shared'

export interface EvmBalanceSnapshot {
  account: string
  balance: null
  symbol: typeof EUREKA_TOKEN.symbol
  status: 'unavailable'
}

export interface EvmTransactionLookup {
  hash: string
  status: 'unavailable'
}

export function getEurekaTokenConfig() {
  return EUREKA_TOKEN
}

export async function connectEvmWallet(): Promise<never> {
  throw new NotImplementedError('Wallet connectivity is not enabled in this production-safe static build.')
}

export async function getEvmBalance(account: string): Promise<EvmBalanceSnapshot> {
  return { account, balance: null, symbol: EUREKA_TOKEN.symbol, status: 'unavailable' }
}

export async function getEvmTransaction(hash: string): Promise<EvmTransactionLookup> {
  return { hash, status: 'unavailable' }
}

export async function prepareEvmTransfer(request: AuthorizationRequest): Promise<never> {
  requireAuthorization(request)
  throw new NotImplementedError('EVM transfers require a verified wallet integration and are not implemented.')
}
