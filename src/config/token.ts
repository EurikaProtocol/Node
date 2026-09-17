export const EUREKA_TOKEN = {
  name: 'EUREKA',
  symbol: 'EKA',
  decimals: 18,
  chainId: 1,
  contract: '0x4042973c0863cca0d73f028ca98465f44f0e6f97',
} as const

export type EurekaTokenConfig = typeof EUREKA_TOKEN
