import type { EASAsset, EASAttribute, AssetKind } from './types'

export interface CreateAssetInput {
  id: string
  kind: AssetKind
  owner: string
  metadataUri?: string
  attributes?: EASAttribute[]
}

export function createAsset(input: CreateAssetInput): EASAsset {
  return {
    id: input.id,
    kind: input.kind,
    owner: input.owner,
    metadataUri: input.metadataUri,
    attributes: input.attributes ?? [],
    permissions: [],
    createdAt: new Date().toISOString(),
  }
}
