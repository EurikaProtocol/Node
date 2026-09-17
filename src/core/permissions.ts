import type { EASAsset, EASPermission } from './types'

export function grantPermission(asset: EASAsset, permission: EASPermission): EASAsset {
  return {
    ...asset,
    permissions: [...asset.permissions, permission],
  }
}
