export type AssetKind =
  | 'data'
  | 'action'
  | 'device'
  | 'identity'
  | 'license'
  | 'permission'
  | 'proof'

export interface EASAttribute {
  key: string
  value: string
  visibility: 'public' | 'private' | 'restricted'
}

export interface EASProof {
  algorithm: 'sha256' | 'keccak256' | 'custom'
  digest: string
  timestamp: string
  verifier?: string
}

export interface EASPermission {
  subject: string
  capability: 'view' | 'use' | 'license' | 'transfer' | 'revoke'
  expiresAt?: string
}

export interface EASIdentityClaim {
  type: string
  issuer: string
  disclosed: boolean
}

export interface EASLicenseTerms {
  usage: string
  commercialUse: boolean
  transferAllowed: boolean
}

export interface EASAsset {
  id: string
  kind: AssetKind
  owner: string
  metadataUri?: string
  attributes: EASAttribute[]
  proof?: EASProof
  permissions: EASPermission[]
  createdAt: string
}
