import type { EASLicenseTerms } from './types'

export function createLicenseTerms(partial?: Partial<EASLicenseTerms>): EASLicenseTerms {
  return {
    usage: partial?.usage ?? 'Verification only',
    commercialUse: partial?.commercialUse ?? false,
    transferAllowed: partial?.transferAllowed ?? false,
  }
}
