export interface SolanaWalletPanelState {
  connectionStatus: 'unavailable' | 'planned'
  walletAddress: null
  balance: null
  recentTransactions: []
}

export function getSolanaWalletPanelState(): SolanaWalletPanelState {
  return {
    connectionStatus: 'planned',
    walletAddress: null,
    balance: null,
    recentTransactions: [],
  }
}
