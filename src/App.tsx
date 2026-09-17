import { NavLink, Route, Routes } from 'react-router-dom'
import './index.css'
import { GlassCard, InfoList, StatusPill } from './components/ui'
import { whitepaperSections } from './content/whitepaper'
import { TINANAI_SOLANA_CONFIG, TINANAI_VERIFICATION_PENDING_MESSAGE } from './config/tinanai-solana'
import { EUREKA_TOKEN } from './config/token'
import { createAsset } from './core/asset'
import { recordDeviceEvent } from './core/device'
import { createIdentity } from './core/identity'
import { createLicenseTerms } from './core/license'
import { createMarketplaceListing } from './core/marketplace'
import { grantPermission } from './core/permissions'
import { createProof } from './core/proof'
import { attachProof, hasVerifiableProof } from './core/verify'
import { getSolanaConnectionInfo } from './solana/connection'
import { getSolanaMetadataStatus } from './solana/metadata'
import { getTrustedPumpfunUrl, isTrustedExplorerUrl } from './solana/pumpfun'
import { getTinanAiTokenStatus } from './solana/token'
import { getSolanaWalletPanelState } from './solana/wallet'

const navItems = [
  ['/', 'Home'],
  ['/dashboard', 'Dashboard'],
  ['/wallet', 'Wallet'],
  ['/tinan-ai', 'TinanAI'],
  ['/marketplace', 'Marketplace'],
  ['/whitepaper', 'Whitepaper'],
  ['/staking', 'Staking'],
  ['/swap', 'Swap'],
  ['/explorer', 'Explorer'],
  ['/settings', 'Settings'],
  ['/tinan-ai-token', 'TinanAI Token'],
  ['/pumpfun', 'Pump.fun'],
] as const

const sampleAsset = grantPermission(
  attachProof(
    createAsset({
      id: 'eureka-asset-demo',
      kind: 'data',
      owner: EUREKA_TOKEN.contract,
      metadataUri: 'ipfs://placeholder',
      attributes: [{ key: 'category', value: 'dataset', visibility: 'public' }],
    }),
    createProof('0x8f51db5c1b5f8b67e8d640887395f4dbaf8dcb920f7531e44a8f647a7a3c9ef9', 'Protocol verifier'),
  ),
  { subject: 'licensed-ai', capability: 'use', expiresAt: '2027-01-01T00:00:00Z' },
)

const sampleIdentity = createIdentity('eureka-id:demo', [
  { type: 'reputation', issuer: 'EUREKA ID', disclosed: true },
  { type: 'license-holder', issuer: 'EUREKA Marketplace', disclosed: false },
])

const sampleListing = createMarketplaceListing(sampleAsset)
const sampleDeviceEvent = recordDeviceEvent('solar-array-01', 'power-generation')
const sampleLicense = createLicenseTerms({ usage: 'Analytics access', commercialUse: true })
const solanaConnection = getSolanaConnectionInfo()
const solanaMetadata = getSolanaMetadataStatus()
const tinanAiToken = getTinanAiTokenStatus()
const solanaWallet = getSolanaWalletPanelState()
const pumpfunUrl = getTrustedPumpfunUrl(TINANAI_SOLANA_CONFIG.pumpfunTokenUrl)

function App() {
  return (
    <div className="app-shell">
      <header className="site-header glass-card">
        <div>
          <img className="brand-logo" src="/eureka-logo.svg" alt="EUREKA logo" />
          <div>
            <p className="eyebrow">Universal Tokenization Network</p>
            <h1>EUREKA Protocol</h1>
            <p className="subtitle">If it can be verified, it can be tokenized.</p>
          </div>
        </div>
        <nav aria-label="Primary navigation">
          {navItems.map(([to, label]) => (
            <NavLink key={to} to={to} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              {label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/wallet" element={<WalletPage />} />
          <Route path="/tinan-ai" element={<TinanAiPage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/whitepaper" element={<WhitepaperPage />} />
          <Route path="/staking" element={<StakingPage />} />
          <Route path="/swap" element={<SwapPage />} />
          <Route path="/explorer" element={<ExplorerPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/tinan-ai-token" element={<TinanAiTokenPage />} />
          <Route path="/pumpfun" element={<PumpfunPage />} />
        </Routes>
      </main>

      <footer className="site-footer glass-card">
        <p>EKA is the EUREKA network utility token. TinanAI on Solana is a separate token experience.</p>
      </footer>
    </div>
  )
}

function PageIntro({ title, description, badge }: { title: string; description: string; badge?: string }) {
  return (
    <GlassCard eyebrow={badge} title={title}>
      <p>{description}</p>
    </GlassCard>
  )
}

function HomePage() {
  return (
    <div className="page-grid hero-grid">
      <PageIntro
        title="Proof, ownership, permissions, and programmable value"
        badge="Production-safe static client"
        description="This frontend presents the highest-priority verifiable EUREKA requirements with typed protocol modules, Cloudflare Pages compatibility, and safe placeholders where live chain integrations still require verified infrastructure."
      />
      <GlassCard title="EKA token source of truth" eyebrow="Ethereum mainnet">
        <InfoList
          items={[
            { label: 'Name', value: EUREKA_TOKEN.name },
            { label: 'Symbol', value: EUREKA_TOKEN.symbol },
            { label: 'Decimals', value: EUREKA_TOKEN.decimals },
            { label: 'Chain ID', value: EUREKA_TOKEN.chainId },
            { label: 'Contract', value: <code>{EUREKA_TOKEN.contract}</code> },
          ]}
        />
      </GlassCard>
      <GlassCard title="Protocol priorities" eyebrow="Aligned with draft prompt">
        <ul className="bullet-list">
          <li>Keep EKA and the TinanAI Solana token clearly separated.</li>
          <li>Expose typed EUREKA Asset Standard primitives for proofs, permissions, identity, and licensing.</li>
          <li>Never fabricate wallet balances, transaction history, liquidity, or market data.</li>
        </ul>
      </GlassCard>
    </div>
  )
}

function DashboardPage() {
  return (
    <div className="page-grid">
      <PageIntro title="Dashboard" badge="Operational overview" description="A high-level snapshot of protocol-ready primitives and currently verified static configuration." />
      <GlassCard title="Asset standard demo">
        <InfoList
          items={[
            { label: 'Asset ID', value: sampleAsset.id },
            { label: 'Kind', value: sampleAsset.kind },
            { label: 'Owner reference', value: <code>{sampleAsset.owner}</code> },
            { label: 'Proof status', value: hasVerifiableProof(sampleAsset) ? 'Verifiable proof attached' : 'Proof unavailable' },
            { label: 'Marketplace state', value: sampleListing.status },
          ]}
        />
      </GlassCard>
      <GlassCard title="Identity and licensing">
        <InfoList
          items={[
            { label: 'Identity ID', value: sampleIdentity.id },
            { label: 'Claims', value: sampleIdentity.claims.length },
            { label: 'License usage', value: sampleLicense.usage },
            { label: 'Commercial use', value: sampleLicense.commercialUse ? 'Enabled' : 'Disabled' },
            { label: 'Device proof event', value: `${sampleDeviceEvent.deviceId} / ${sampleDeviceEvent.eventType}` },
          ]}
        />
      </GlassCard>
    </div>
  )
}

function WalletPage() {
  return (
    <div className="page-grid">
      <PageIntro title="Wallet" badge="Informational only" description="EVM and Solana panels are intentionally non-custodial and non-signing. No seed phrases, private keys, or auto-transaction flows are requested in this build." />
      <GlassCard title="EVM wallet panel">
        <InfoList
          items={[
            { label: 'Connection', value: 'Unavailable in static build' },
            { label: 'EKA support', value: `${EUREKA_TOKEN.symbol} on chain ${EUREKA_TOKEN.chainId}` },
            { label: 'Live balance', value: 'Unavailable' },
            { label: 'Transfers', value: 'Planned with explicit authorization only' },
          ]}
        />
      </GlassCard>
      <GlassCard title="Solana wallet panel">
        <InfoList
          items={[
            { label: 'Network', value: solanaConnection.network },
            { label: 'Connection status', value: solanaWallet.connectionStatus },
            { label: 'Wallet address', value: 'Unavailable' },
            { label: 'Balance', value: 'Unavailable' },
            { label: 'Recent transactions', value: 'Unavailable' },
          ]}
        />
      </GlassCard>
    </div>
  )
}

function TinanAiPage() {
  return (
    <div className="page-grid">
      <PageIntro title="TinanAI" badge="AI operating layer" description="The current client outlines the TinanAI product surface—document analysis, tokenization assistance, wallet guidance, and developer workflows—without pretending to execute unverified AI or chain actions." />
      <GlassCard title="Assistant capabilities">
        <ul className="bullet-list">
          <li>Document analysis and asset intake: coming soon.</li>
          <li>Tokenization guidance with EUREKA Asset Standard primitives.</li>
          <li>Wallet assistant with clear safety boundaries and no signing.</li>
          <li>TinanAI Solana token guidance kept separate from EKA.</li>
        </ul>
      </GlassCard>
    </div>
  )
}

function MarketplacePage() {
  return (
    <div className="page-grid">
      <PageIntro title="Marketplace" badge="Draft listing flows" description="Marketplace listings are represented as typed protocol objects. No fake order books, prices, or transaction history are shown until verified backends or APIs exist." />
      <GlassCard title="Listing preview">
        <InfoList
          items={[
            { label: 'Listing asset', value: sampleListing.asset.id },
            { label: 'Price', value: sampleListing.priceLabel },
            { label: 'Status', value: sampleListing.status },
            { label: 'Permission count', value: sampleListing.asset.permissions.length },
          ]}
        />
      </GlassCard>
    </div>
  )
}

function WhitepaperPage() {
  return (
    <div className="page-grid whitepaper-grid">
      <PageIntro title="Whitepaper" badge="Draft v1.0 content" description="This page renders the supplied draft in readable sections. No official PDF is linked because no verified PDF asset exists in the repository." />
      <GlassCard title="Official PDF status">
        <p>Official PDF: <strong>Unavailable</strong>. A verified PDF can be linked here once it exists and is published by the project.</p>
      </GlassCard>
      {whitepaperSections.map((section) => (
        <GlassCard key={section.title} title={section.title}>
          {section.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </GlassCard>
      ))}
    </div>
  )
}

function StakingPage() {
  return (
    <div className="page-grid">
      <PageIntro title="Staking" badge="Coming soon" description="No staking contract or verified live program is connected in this frontend. The page exists to explain the planned capability without claiming it is active." />
      <GlassCard title="Current status">
        <StatusPill label="Unavailable" tone="warn" />
        <p>Staking flows will remain disabled until a verified contract, audited configuration, and explicit wallet authorization flow are available.</p>
      </GlassCard>
    </div>
  )
}

function SwapPage() {
  return (
    <div className="page-grid">
      <PageIntro title="Swap" badge="Coming soon" description="No swap execution or live liquidity routing is implemented. This avoids implying that EKA or the TinanAI Solana token are currently tradable through this client." />
      <GlassCard title="Safety notice">
        <p>Live token balances, liquidity, quotes, and swap execution are unavailable in this production-safe static build.</p>
      </GlassCard>
    </div>
  )
}

function ExplorerPage() {
  return (
    <div className="page-grid">
      <PageIntro title="Explorer" badge="Verification-first" description="The explorer focuses on proof-bearing asset concepts and only links to trusted external explorers when a valid verified URL is available." />
      <GlassCard title="Exploration status">
        <InfoList
          items={[
            { label: 'Asset proof', value: hasVerifiableProof(sampleAsset) ? 'Available for demo asset' : 'Unavailable' },
            { label: 'Metadata URI', value: sampleAsset.metadataUri ?? 'Unavailable' },
            { label: 'Solana metadata', value: solanaMetadata.verified ? 'Verified URI configured' : solanaMetadata.message },
          ]}
        />
      </GlassCard>
    </div>
  )
}

function SettingsPage() {
  const rpcLabel = solanaConnection.rpcUrl ?? 'Using safe default network selection without a custom RPC URL'

  return (
    <div className="page-grid">
      <PageIntro title="Settings" badge="Environment-aware" description="Deployment-sensitive values are read from environment variables with safe defaults. No secret or backend configuration is required for this static deployment." />
      <GlassCard title="Runtime configuration">
        <InfoList
          items={[
            { label: 'Solana network', value: solanaConnection.network },
            { label: 'RPC URL', value: rpcLabel },
            { label: 'Metadata URI trusted', value: isTrustedExplorerUrl(TINANAI_SOLANA_CONFIG.metadataUri) ? 'Yes' : 'No' },
          ]}
        />
      </GlassCard>
    </div>
  )
}

function TinanAiTokenPage() {
  return (
    <div className="page-grid">
      <PageIntro title="TinanAI Solana Token" badge="Separate from EKA" description="The TinanAI token page is intentionally distinct from the EKA network token. It never reuses the EKA contract address or claims unverified Solana launch data." />
      <GlassCard title="Verification status">
        <InfoList
          items={[
            { label: 'Network', value: solanaConnection.network },
            { label: 'Mint', value: tinanAiToken.mint ?? 'Verification pending' },
            { label: 'Metadata', value: solanaMetadata.metadataUri ?? 'Verification pending' },
            { label: 'Status', value: tinanAiToken.message },
          ]}
        />
      </GlassCard>
      <GlassCard title="Important distinction">
        <p>EKA is the EUREKA Protocol native utility token on Ethereum. TinanAI on Solana is a separate token context and does not replace EKA.</p>
      </GlassCard>
    </div>
  )
}

function PumpfunPage() {
  return (
    <div className="page-grid">
      <PageIntro title="Pump.fun" badge="Trusted host validation" description="Only trusted external hosts are accepted for Pump.fun and explorer links. If a verified URL is not configured, the interface shows a verification-pending state instead of inventing one." />
      <GlassCard title="Launch link">
        {pumpfunUrl ? (
          <p>
            <a href={pumpfunUrl} target="_blank" rel="noreferrer">Open verified Pump.fun token page</a>
          </p>
        ) : (
          <p>{TINANAI_VERIFICATION_PENDING_MESSAGE}</p>
        )}
      </GlassCard>
    </div>
  )
}

export default App
