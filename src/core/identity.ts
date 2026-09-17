import type { EASIdentityClaim } from './types'

export interface EurekaIdentity {
  id: string
  walletAddress?: string
  claims: EASIdentityClaim[]
  reputationScore?: number
}

export function createIdentity(id: string, claims: EASIdentityClaim[] = []): EurekaIdentity {
  return { id, claims }
}
