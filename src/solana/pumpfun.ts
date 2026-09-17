import { PUMPFUN_HOST } from './constants'

const trustedHosts = new Set([PUMPFUN_HOST, 'www.pump.fun', 'solscan.io', 'explorer.solana.com'])

export function isTrustedExternalUrl(value: string): boolean {
  if (!value) return false

  try {
    const url = new URL(value)
    return ['https:'].includes(url.protocol) && trustedHosts.has(url.hostname)
  } catch {
    return false
  }
}

export function getTrustedPumpfunUrl(value: string): string | null {
  return isTrustedExternalUrl(value) ? value : null
}
