const trustedExplorerHosts = new Set(['solscan.io', 'explorer.solana.com'])
const trustedPumpfunHosts = new Set(['pump.fun', 'www.pump.fun'])

export function isSafeHttpsUrl(value: string): boolean {
  if (!value) return false

  try {
    const url = new URL(value)
    return url.protocol === 'https:'
  } catch {
    return false
  }
}

function isTrustedHttpsUrl(value: string, allowedHosts: Set<string>): boolean {
  if (!isSafeHttpsUrl(value)) return false

  const url = new URL(value)
  return allowedHosts.has(url.hostname)
}

export function isTrustedPumpfunUrl(value: string): boolean {
  return isTrustedHttpsUrl(value, trustedPumpfunHosts)
}

export function isTrustedExplorerUrl(value: string): boolean {
  return isTrustedHttpsUrl(value, trustedExplorerHosts)
}

export function getTrustedPumpfunUrl(value: string): string | null {
  return isTrustedPumpfunUrl(value) ? value : null
}
