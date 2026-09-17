export interface WhitepaperSection {
  title: string
  body: string[]
}

export const whitepaperSections: WhitepaperSection[] = [
  {
    title: 'Vision',
    body: [
      'EurekaCore is a premium Web3 operating layer designed to bring wallets, staking, swaps, bridges, tokenized assets, and verified AI tooling into one coherent experience.',
      'The goal is simple: one wallet surface, support for many chains, and user-controlled access to digital and tokenized real-world value.',
    ],
  },
  {
    title: 'ERK Token',
    body: [
      'ERK is the EUREKA ecosystem token surface represented in this client. The dashboard highlights contract data, wallet actions, governance utility, staking direction, marketplace payments, AI rewards, and ecosystem fee usage.',
      'The founder wallet displayed in the launch experience is 0x5D0435779b10234fD4941cc15fae8C7C86117E91.',
    ],
  },
  {
    title: 'Multichain Wallet',
    body: [
      'The wallet experience is designed around Bitcoin, Ethereum, BNB, Solana, XRP, Stellar, Polygon, Base, Arbitrum, Avalanche, Optimism, Tron, Litecoin, and Dogecoin.',
      'Execution remains user-controlled. The interface avoids hidden signing flows and only exposes actions that require explicit wallet confirmation.',
    ],
  },
  {
    title: 'Marketplace',
    body: [
      'Eureka Marketplace supports digital art, AI models, photography, handmade items, domains, and data assets in a single premium storefront.',
      'Each listing is represented with ownership context, pricing, chain metadata, and a clear route for future settlement logic.',
    ],
  },
  {
    title: 'EurekaCore AI',
    body: [
      'EurekaCore AI converts verified knowledge into utility through Tinan, token generation guidance, asset verification, data tokenization, and smart contract builder workflows.',
      'The AI layer is positioned as a natural-intelligence ecosystem rather than an autonomous trading or signing agent.',
    ],
  },
  {
    title: 'Roadmap',
    body: [
      '2026: Q1 Website Launch, Q2 ERK Token, Q3 Marketplace, Q4 EurekaCore AI.',
      '2027: Mobile App, DAO Governance, Global Tokenization Network.',
    ],
  },
  {
    title: 'Risk and Verification',
    body: [
      'This client prefers verified configuration, explicit wallet approval, and read-only contract access wherever possible.',
      'Unavailable data remains labeled as pending rather than fabricated, especially for holders, liquidity, or unverified external integrations.',
    ],
  },
]
