import type { EASProof } from './types'

export function createProof(digest: string, verifier?: string): EASProof {
  return {
    algorithm: 'sha256',
    digest,
    timestamp: new Date().toISOString(),
    verifier,
  }
}
