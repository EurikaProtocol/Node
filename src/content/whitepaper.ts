export interface WhitepaperSection {
  title: string
  body: string[]
}

export const whitepaperSections: WhitepaperSection[] = [
  {
    title: 'Vision',
    body: [
      'EUREKA Chain is a decentralized infrastructure for proving, owning, tokenizing and exchanging digital value.',
      'Rather than limiting tokenization to currencies or NFTs, EUREKA introduces a universal asset layer where any verifiable object, dataset, event, permission or achievement can receive a programmable on-chain representation.',
    ],
  },
  {
    title: 'Mission',
    body: [
      'To create an open blockchain protocol where people, machines and applications can verify, own and exchange digital value without surrendering control of their data.',
    ],
  },
  {
    title: 'The Core Idea',
    body: [
      'Today’s internet creates enormous value but very little ownership. Photos, documents, AI outputs, IoT data, work products and analytics are usually stored inside centralized platforms.',
      'EUREKA separates proof from content. The blockchain stores proofs and programmable rights—not necessarily the underlying private content.',
    ],
  },
  {
    title: 'EUREKA Tokenization Engine (ETE)',
    body: [
      'Create — Select a digital or physical object.',
      'Verify — Validate origin, timestamp and integrity.',
      'Tokenize — Generate a unique EUREKA Asset.',
      'Value — Attach utility, licensing or market value.',
      'Use / Trade — Share, license, transfer or sell.',
    ],
  },
  {
    title: 'Proof Layers',
    body: [
      'Proof-of-Data secures evidence that a dataset existed at a specific moment and remains unchanged.',
      'Proof-of-Action captures verifiable completed work such as learning, sport, or on-chain activity.',
      'Proof-of-Device tracks trusted events from solar plants, IoT devices, vehicles and sensors.',
      'Proof-of-Identity enables zero-knowledge verification of credentials without exposing private information.',
    ],
  },
  {
    title: 'Personal Data Vault',
    body: [
      'Users retain ownership of their files while the blockchain records only ownership, permissions, integrity proofs, timestamps, and transferable rights.',
    ],
  },
  {
    title: 'Permission Layer',
    body: [
      'Every EUREKA Asset can define programmable permissions. This enables time-limited, usage-limited and licensed digital assets.',
    ],
  },
  {
    title: 'EUREKA Asset Standard (EAS)',
    body: [
      'EAS is the universal protocol for representing different asset categories with shared proof, permission and identity primitives.',
    ],
  },
  {
    title: 'EUREKA Identity',
    body: [
      'EUREKA ID represents verified credentials, reputation, achievements, licenses, owned assets and zero-knowledge proofs.',
      'The goal is to prove facts without exposing sensitive information.',
    ],
  },
  {
    title: 'AI Data Economy',
    body: [
      'EUREKA enables permissioned AI access. A user can license a verified dataset, allow computation, and receive compensation without surrendering underlying ownership.',
      'This is Data-to-Earn, based on verified utility rather than advertising.',
    ],
  },
  {
    title: 'Native Token (EKA)',
    body: [
      'EKA is the network utility token that powers the protocol.',
      'EUREKA Assets are user-created tokenized objects and remain distinct from the EKA utility token.',
    ],
  },
  {
    title: 'Network Architecture',
    body: [
      'Applications interact with EUREKA through a unified SDK while assets remain interoperable across multiple chains.',
    ],
  },
]
