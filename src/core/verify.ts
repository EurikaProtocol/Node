import type { EASAsset, EASProof } from './types'

export function attachProof(asset: EASAsset, proof: EASProof): EASAsset {
  return { ...asset, proof }
}

export function hasVerifiableProof(asset: EASAsset): boolean {
  return Boolean(asset.proof?.digest && asset.proof.timestamp)
}
