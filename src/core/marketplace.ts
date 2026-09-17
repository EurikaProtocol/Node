import type { EASAsset } from './types'

export interface MarketplaceListing {
  asset: EASAsset
  priceLabel: string
  status: 'draft' | 'listed' | 'sold' | 'unavailable'
}

export function createMarketplaceListing(asset: EASAsset, priceLabel = 'Negotiated off-chain'): MarketplaceListing {
  return {
    asset,
    priceLabel,
    status: 'draft',
  }
}
