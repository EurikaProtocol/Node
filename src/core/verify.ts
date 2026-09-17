import type { EASAsset, EASProof } from './types'

export function attachProof(asset: EASAsset, proof: EASProof): EASAsset {
  return { ...asset, proof }
}

export function hasVerifiableProof(asset: EASAsset): boolean {
  if (!asset.proof?.digest) {
    return false
  }

  const { timestamp } = asset.proof
  if (timestamp === undefined || timestamp.trim() === '') {
    return false
  }

  return !Number.isNaN(Date.parse(timestamp))
}
