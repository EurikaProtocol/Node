import type { EASAsset, EASProof } from './types'

export function attachProof(asset: EASAsset, proof: EASProof): EASAsset {
  return { ...asset, proof }
}

export function hasVerifiableProof(asset: EASAsset): boolean {
  if (!asset.proof?.digest || !asset.proof.timestamp) {
    return false
  }

  return !Number.isNaN(Date.parse(asset.proof.timestamp))
}
