import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from 'react'
import { Link, NavLink, Route, Routes } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BrowserProvider, Contract, JsonRpcProvider, formatEther, formatUnits, isAddress, parseUnits } from 'ethers'
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
import { getTrustedPumpfunUrl, isSafeHttpsUrl } from './solana/pumpfun'
import { getTinanAiTokenStatus } from './solana/token'
import { getSolanaWalletPanelState } from './solana/wallet'

const erc20Abi = [
  'function totalSupply() view returns (uint256)',
  'function balanceOf(address) view returns (uint256)',
  'function transfer(address to, uint256 amount) returns (bool)',
  'function approve(address spender, uint256 amount) returns (bool)',
] as const

const navItems = [
  ['/', 'Home'],
  ['/dashboard', 'Dashboard'],
  ['/wallet', 'Wallet'],
  ['/erk-token', 'ERK Token'],
  ['/marketplace', 'Marketplace'],
  ['/eurekacore-ai', 'EurekaCore AI'],
  ['/roadmap', 'Roadmap'],
  ['/whitepaper', 'Whitepaper'],
  ['/explorer', 'Explorer'],
  ['/swap', 'Swap'],
  ['/staking', 'Staking'],
] as const

const heroStats = [
  { label: '24/7 Global Access', value: 'Always on' },
  { label: 'Multi-chain', value: '14 chains' },
  { label: 'Low Fees', value: 'Route aware' },
  { label: 'User Controlled', value: 'Wallet first' },
]

const ecosystemCards = [
  {
    title: 'Multi-Chain Wallet',
    path: '/wallet',
    description: 'One control surface for connection, swaps, bridges, send, receive, portfolio, and history across the supported chain set.',
  },
  {
    title: 'Eureka Marketplace',
    path: '/marketplace',
    description: 'A premium storefront for digital art, AI models, domains, data assets, handmade items, and tokenized real-world inventory.',
  },
  {
    title: 'EurekaCore AI',
    path: '/eurekacore-ai',
    description: 'Tinan-powered modules for verification, token generation, data tokenization, and smart contract builder guidance.',
  },
  {
    title: 'ERK Token',
    path: '/erk-token',
    description: 'Governance, staking, marketplace payments, AI rewards, and ecosystem fees anchored to an ERC-20 dashboard.',
  },
] as const

const supportedChains = [
  'Bitcoin',
  'Ethereum',
  'BNB',
  'Solana',
  'XRP',
  'Stellar',
  'Polygon',
  'Base',
  'Arbitrum',
  'Avalanche',
  'Optimism',
  'Tron',
  'Litecoin',
  'Dogecoin',
] as const

const walletFunctions = ['Connect Wallet', 'Swap', 'Bridge', 'Send', 'Receive', 'Portfolio', 'Transaction History'] as const

const tokenUtilities = ['Governance', 'Staking', 'Marketplace payments', 'AI rewards', 'Ecosystem fees'] as const

const aiModules = [
  { title: 'AI Assistant Tinan', detail: 'Conversational operator surface for launch guidance, discovery, and support workflows.' },
  { title: 'Token Generator', detail: 'Structured token design inputs, launch checklists, and deployment preparation.' },
  { title: 'Asset Verification', detail: 'Proof-oriented flows for validating origin, metadata, and ownership context.' },
  { title: 'Data Tokenization', detail: 'Transforms verified knowledge into utility-aware marketplace assets.' },
  { title: 'Smart Contract Builder', detail: 'Guided assembly for future ERC-20, marketplace, and governance modules.' },
] as const

const marketplaceCategories = [
  { title: 'Digital Art', price: '3.20 ETH', chain: 'Ethereum', owner: 'Studio Atlas' },
  { title: 'AI Models', price: '12,000 ERK', chain: 'Base', owner: 'Tinan Labs' },
  { title: 'Photography', price: '0.88 ETH', chain: 'Polygon', owner: 'Nova Lens' },
  { title: 'Handmade Items', price: '420 USDC', chain: 'Arbitrum', owner: 'Craft Node' },
  { title: 'Domains', price: '2.10 ETH', chain: 'Ethereum', owner: 'Name Forge' },
  { title: 'Data Assets', price: '6,500 ERK', chain: 'Avalanche', owner: 'Signal Vault' },
] as const

const roadmap = [
  {
    year: '2026',
    entries: ['Q1 Website Launch', 'Q2 ERK Token', 'Q3 Marketplace', 'Q4 EurekaCore AI'],
  },
  {
    year: '2027',
    entries: ['Mobile App', 'DAO Governance', 'Global Tokenization Network'],
  },
] as const

const socialLinks = [
  { label: 'X', href: undefined },
  { label: 'Discord', href: undefined },
  { label: 'Telegram', href: undefined },
  { label: 'GitHub', href: 'https://github.com/EurikaProtocol/Node' },
] as const

const sampleAsset = grantPermission(
  attachProof(
    createAsset({
      id: 'eurekacore-rwa-001',
      kind: 'data',
      owner: EUREKA_TOKEN.founderWallet,
      metadataUri: 'ipfs://eurekacore-preview',
      attributes: [{ key: 'category', value: 'tokenized-knowledge', visibility: 'public' }],
    }),
    createProof('0x8f51db5c1b5f8b67e8d640887395f4dbaf8dcb920f7531e44a8f647a7a3c9ef9', 'Eureka verification node'),
  ),
  { subject: 'premium-access', capability: 'use', expiresAt: '2027-01-01T00:00:00Z' },
)

const sampleIdentity = createIdentity('eurekacore-id:founder-preview', [
  { type: 'reputation', issuer: 'EurekaCore', disclosed: true },
  { type: 'marketplace-creator', issuer: 'Eureka Marketplace', disclosed: true },
])

const sampleListing = createMarketplaceListing(sampleAsset)
const sampleDeviceEvent = recordDeviceEvent('orbit-node-01', 'network-health')
const sampleLicense = createLicenseTerms({ usage: 'Verified marketplace access', commercialUse: true })
const solanaConnection = getSolanaConnectionInfo()
const solanaMetadata = getSolanaMetadataStatus()
const tinanAiToken = getTinanAiTokenStatus()
const solanaWallet = getSolanaWalletPanelState()
const pumpfunUrl = getTrustedPumpfunUrl(TINANAI_SOLANA_CONFIG.pumpfunTokenUrl)

interface EvmWindow {
  request: (args: { method: string; params?: unknown[] | Record<string, unknown> }) => Promise<unknown>
}

declare global {
  interface Window {
    ethereum?: EvmWindow
  }
}

interface TokenMetricsState {
  totalSupply: string | null
  holders: string | null
  contract: string
  explorerUrl: string
  status: string
}

interface WalletState {
  address: string | null
  chainId: number | null
  networkName: string | null
  ethBalance: string | null
  tokenBalance: string | null
  status: string
}

function createReadOnlyProvider() {
  return new JsonRpcProvider(EUREKA_TOKEN.rpcUrl)
}

function truncateMiddle(value: string, lead = 6, tail = 4) {
  if (value.length <= lead + tail + 3) return value
  return `${value.slice(0, lead)}...${value.slice(-tail)}`
}

function formatChainId(chainId: number | null) {
  return chainId === null ? 'Unavailable' : chainId.toString()
}

function OrbitSelector() {
  return (
    <motion.div
      className="orbit-shell"
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <motion.div
        className="orbit-ring"
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
      >
        {supportedChains.map((chain, index) => {
          const angle = (index / supportedChains.length) * Math.PI * 2
          const x = Math.cos(angle) * 42
          const y = Math.sin(angle) * 42
          const style = {
            left: `calc(50% + ${x}%)`,
            top: `calc(50% + ${y}%)`,
          } satisfies CSSProperties

          return (
            <motion.div
              key={chain}
              className="orbit-node"
              style={style}
              whileHover={{ scale: 1.1 }}
            >
              <span>{chain}</span>
            </motion.div>
          )
        })}
      </motion.div>
      <motion.div className="orbit-core" animate={{ boxShadow: ['0 0 30px rgba(0, 217, 255, 0.3)', '0 0 60px rgba(24, 255, 255, 0.65)', '0 0 30px rgba(0, 217, 255, 0.3)'] }} transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}>
        <img className="orbit-logo" src="/eureka-logo.svg" alt="EUREKA logo" />
        <strong>EUREKA</strong>
        <span>One Wallet • All Chains</span>
      </motion.div>
    </motion.div>
  )
}

function ParticlesBackdrop() {
  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, index) => ({
        id: index,
        left: `${(index * 11) % 100}%`,
        top: `${(index * 17) % 100}%`,
        delay: `${(index % 6) * 0.7}s`,
        duration: `${8 + (index % 5) * 2}s`,
      })),
    [],
  )

  return (
    <div className="particles" aria-hidden="true">
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="particle"
          style={{ left: particle.left, top: particle.top, animationDelay: particle.delay, animationDuration: particle.duration }}
        />
      ))}
    </div>
  )
}

function ActionLink({ href, children, disabled }: { href?: string; children: ReactNode; disabled?: boolean }) {
  if (!href || disabled) {
    return <span className="button-link button-link--disabled">{children}</span>
  }

  return (
    <a className="button-link" href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  )
}

function Button({ children, onClick, disabled, tone = 'primary', type = 'button' }: { children: ReactNode; onClick?: () => void; disabled?: boolean; tone?: 'primary' | 'secondary'; type?: 'button' | 'submit' }) {
  return (
    <button type={type} className={`button-link ${tone === 'secondary' ? 'button-link--secondary' : ''}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}

function PageIntro({ title, description, badge, actions }: { title: string; description: string; badge?: string; actions?: ReactNode }) {
  return (
    <GlassCard eyebrow={badge} title={title}>
      <p>{description}</p>
      {actions ? <div className="action-row">{actions}</div> : null}
    </GlassCard>
  )
}

function StatGrid({ items }: { items: ReadonlyArray<{ label: string; value: string }> }) {
  return (
    <div className="stat-grid">
      {items.map((item) => (
        <GlassCard key={item.label}>
          <p className="eyebrow">{item.label}</p>
          <p className="stat-value">{item.value}</p>
        </GlassCard>
      ))}
    </div>
  )
}

function EcosystemCard({ title, path, description }: { title: string; path: string; description: string }) {
  return (
    <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.2 }}>
      <GlassCard title={title} eyebrow="Ecosystem module">
        <p>{description}</p>
        <div className="action-row">
          <Link className="button-link" to={path}>
            Open page
          </Link>
        </div>
      </GlassCard>
    </motion.div>
  )
}

function useTokenMetrics() {
  const [metrics, setMetrics] = useState<TokenMetricsState>({
    totalSupply: null,
    holders: null,
    contract: EUREKA_TOKEN.contract,
    explorerUrl: EUREKA_TOKEN.explorerUrl,
    status: 'Loading token contract data…',
  })

  useEffect(() => {
    let active = true

    async function load() {
      if (!isAddress(EUREKA_TOKEN.contract)) {
        if (active) {
          setMetrics((current) => ({ ...current, status: 'Contract address is unavailable or invalid.' }))
        }
        return
      }

      try {
        const provider = createReadOnlyProvider()
        const contract = new Contract(EUREKA_TOKEN.contract, erc20Abi, provider)
        const totalSupply = await contract.totalSupply()

        if (active) {
          setMetrics({
            totalSupply: formatUnits(totalSupply, EUREKA_TOKEN.decimals),
            holders: null,
            contract: EUREKA_TOKEN.contract,
            explorerUrl: EUREKA_TOKEN.explorerUrl,
            status: 'Live ERC-20 supply loaded from a read-only provider.',
          })
        }
      } catch {
        if (active) {
          setMetrics((current) => ({
            ...current,
            status: 'Live contract data is temporarily unavailable. Read-only retry required.',
          }))
        }
      }
    }

    void load()

    return () => {
      active = false
    }
  }, [])

  return metrics
}

function useEvmWallet() {
  const [wallet, setWallet] = useState<WalletState>({
    address: null,
    chainId: null,
    networkName: null,
    ethBalance: null,
    tokenBalance: null,
    status: 'Connect MetaMask to read wallet balances and unlock token actions.',
  })

  async function loadFromProvider(provider: BrowserProvider, account: string) {
    const [network, ethBalanceRaw, tokenBalanceRaw] = await Promise.all([
      provider.getNetwork(),
      provider.getBalance(account),
      new Contract(EUREKA_TOKEN.contract, erc20Abi, provider).balanceOf(account),
    ])

    setWallet({
      address: account,
      chainId: Number(network.chainId),
      networkName: network.name,
      ethBalance: Number(formatEther(ethBalanceRaw)).toFixed(4),
      tokenBalance: Number(formatUnits(tokenBalanceRaw, EUREKA_TOKEN.decimals)).toFixed(4),
      status: 'Wallet connected. All writes still require wallet confirmation.',
    })
  }

  async function connect() {
    if (!window.ethereum) {
      setWallet((current) => ({ ...current, status: 'MetaMask or another injected EVM wallet was not detected.' }))
      return
    }

    const provider = new BrowserProvider(window.ethereum)
    const accounts = (await provider.send('eth_requestAccounts', [])) as string[]
    const [account] = accounts

    if (!account) {
      setWallet((current) => ({ ...current, status: 'No wallet account was returned by the provider.' }))
      return
    }

    await loadFromProvider(provider, account)
  }

  async function disconnect() {
    setWallet({
      address: null,
      chainId: null,
      networkName: null,
      ethBalance: null,
      tokenBalance: null,
      status: 'Disconnected. Reconnect to refresh wallet data.',
    })
  }

  async function transfer(recipient: string, amount: string) {
    if (!window.ethereum || !wallet.address) {
      setWallet((current) => ({ ...current, status: 'Connect a wallet before transferring ERK.' }))
      return
    }

    if (!isAddress(recipient)) {
      setWallet((current) => ({ ...current, status: 'Recipient address is invalid.' }))
      return
    }

    if (!amount || Number(amount) <= 0) {
      setWallet((current) => ({ ...current, status: 'Enter a valid transfer amount.' }))
      return
    }

    const provider = new BrowserProvider(window.ethereum)
    const signer = await provider.getSigner()
    const contract = new Contract(EUREKA_TOKEN.contract, erc20Abi, signer)
    const tx = await contract.transfer(recipient, parseUnits(amount, EUREKA_TOKEN.decimals))
    setWallet((current) => ({ ...current, status: `Transfer submitted: ${truncateMiddle(tx.hash, 10, 8)}` }))
    await loadFromProvider(provider, wallet.address)
  }

  async function approve(spender: string, amount: string) {
    if (!window.ethereum || !wallet.address) {
      setWallet((current) => ({ ...current, status: 'Connect a wallet before approving ERK.' }))
      return
    }

    if (!isAddress(spender)) {
      setWallet((current) => ({ ...current, status: 'Spender address is invalid.' }))
      return
    }

    if (!amount || Number(amount) <= 0) {
      setWallet((current) => ({ ...current, status: 'Enter a valid approval amount.' }))
      return
    }

    const provider = new BrowserProvider(window.ethereum)
    const signer = await provider.getSigner()
    const contract = new Contract(EUREKA_TOKEN.contract, erc20Abi, signer)
    const tx = await contract.approve(spender, parseUnits(amount, EUREKA_TOKEN.decimals))
    setWallet((current) => ({ ...current, status: `Approval submitted: ${truncateMiddle(tx.hash, 10, 8)}` }))
    await loadFromProvider(provider, wallet.address)
  }

  async function addTokenToMetaMask() {
    if (!window.ethereum?.request || !isAddress(EUREKA_TOKEN.contract)) {
      setWallet((current) => ({ ...current, status: 'Injected wallet support is required to add ERK to MetaMask.' }))
      return
    }

    const result = await window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: EUREKA_TOKEN.contract,
          symbol: EUREKA_TOKEN.symbol,
          decimals: EUREKA_TOKEN.decimals,
        },
      },
    })

    setWallet((current) => ({
      ...current,
      status: result ? 'ERK token prompt opened in the wallet.' : 'The wallet declined the add-token request.',
    }))
  }

  return { wallet, connect, disconnect, transfer, approve, addTokenToMetaMask }
}

function TokenActionForm({ title, buttonLabel, onSubmit }: { title: string; buttonLabel: string; onSubmit: (address: string, amount: string) => Promise<void> }) {
  const [address, setAddress] = useState('')
  const [amount, setAmount] = useState('')

  return (
    <GlassCard title={title}>
      <form
        className="form-grid"
        onSubmit={(event) => {
          event.preventDefault()
          void onSubmit(address, amount)
        }}
      >
        <label>
          <span>Address</span>
          <input value={address} onChange={(event) => setAddress(event.target.value)} placeholder="0x..." />
        </label>
        <label>
          <span>Amount</span>
          <input value={amount} onChange={(event) => setAmount(event.target.value)} placeholder="0.0" inputMode="decimal" />
        </label>
        <Button type="submit">{buttonLabel}</Button>
      </form>
    </GlassCard>
  )
}

function App() {
  return (
    <div className="app-shell">
      <ParticlesBackdrop />
      <header className="site-header glass-card">
        <div className="brand-lockup">
          <img className="brand-logo" src="/eureka-logo.svg" alt="EUREKA logo" />
          <div>
            <p className="eyebrow">The Final Block of Blockchain</p>
            <h1>EurekaCore</h1>
            <p className="subtitle">One Wallet. All Chains. Infinite Possibilities.</p>
          </div>
        </div>
        <nav aria-label="Primary navigation">
          {navItems.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
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
          <Route path="/erk-token" element={<ErkTokenPage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/eurekacore-ai" element={<EurekaCoreAiPage />} />
          <Route path="/whitepaper" element={<WhitepaperPage />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="/explorer" element={<ExplorerPage />} />
          <Route path="/swap" element={<SwapPage />} />
          <Route path="/staking" element={<StakingPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <footer className="site-footer glass-card">
        <div>
          <p className="footer-tagline">Powered by Eureka. Build. Connect. Own.</p>
          <p className="subtitle">ERK is presented alongside a distinct Solana-based Tinan module surface. User approval is required for all wallet writes.</p>
        </div>
        <div className="social-row" aria-label="Social links">
          {socialLinks.map((link) =>
            link.href ? (
              <a key={link.label} className="social-link" href={link.href} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            ) : (
              <span key={link.label} className="social-link social-link--disabled">
                {link.label}
              </span>
            ),
          )}
        </div>
      </footer>
    </div>
  )
}

function HomePage() {
  const { connect } = useEvmWallet()

  return (
    <div className="page-stack">
      <section className="hero-section glass-card">
        <div className="hero-copy">
          <p className="eyebrow">Premium multichain ecosystem</p>
          <h2 className="hero-title">The Final Block of Blockchain</h2>
          <p className="hero-subtitle">
            One app. Every chain. Eureka unifies wallets, swaps, bridges, staking and tokenized real-world assets.
          </p>
          <div className="action-row">
            <Link className="button-link" to="/dashboard">
              Explore Eureka
            </Link>
            <Button tone="secondary" onClick={() => void connect()}>
              Connect Wallet
            </Button>
          </div>
        </div>
        <OrbitSelector />
      </section>

      <StatGrid items={heroStats} />

      <section className="page-grid">
        {ecosystemCards.map((card) => (
          <EcosystemCard key={card.title} {...card} />
        ))}
      </section>
    </div>
  )
}

function DashboardPage() {
  return (
    <div className="page-grid">
      <PageIntro
        title="Ecosystem dashboard"
        badge="Launch control"
        description="A premium overview of the current EurekaCore launch surface, tokenized asset demos, identity primitives, and the AI-and-marketplace roadmap."
      />
      <GlassCard title="Protocol snapshot">
        <InfoList
          items={[
            { label: 'Founder wallet', value: <code>{EUREKA_TOKEN.founderWallet}</code> },
            { label: 'Asset proof status', value: hasVerifiableProof(sampleAsset) ? 'Verified demo proof attached' : 'Unavailable' },
            { label: 'Identity ID', value: sampleIdentity.id },
            { label: 'Device signal', value: `${sampleDeviceEvent.deviceId} / ${sampleDeviceEvent.eventType}` },
          ]}
        />
      </GlassCard>
      <GlassCard title="Marketplace and licensing">
        <InfoList
          items={[
            { label: 'Listing asset', value: sampleListing.asset.id },
            { label: 'Preview price', value: sampleListing.priceLabel },
            { label: 'Listing status', value: sampleListing.status },
            { label: 'License usage', value: sampleLicense.usage },
          ]}
        />
      </GlassCard>
      <GlassCard title="Operational priorities">
        <ul className="bullet-list">
          <li>Keep the ERK Ethereum token surface distinct from Tinan-related Solana configuration.</li>
          <li>Never invent liquidity, holders, balances, or transaction history when verified data is unavailable.</li>
          <li>Require explicit wallet confirmation for transfer and approval flows.</li>
        </ul>
      </GlassCard>
    </div>
  )
}

function WalletPage() {
  const { wallet, connect, disconnect, addTokenToMetaMask } = useEvmWallet()

  return (
    <div className="page-grid">
      <PageIntro
        title="Multi-chain wallet"
        badge="Unified access"
        description="A premium launcher for connection, swaps, bridges, send, receive, portfolio, and history views across the supported chain set."
        actions={
          <>
            <Button onClick={() => void connect()}>Connect Wallet</Button>
            <Button tone="secondary" onClick={() => void disconnect()}>
              Disconnect
            </Button>
            <Button tone="secondary" onClick={() => void addTokenToMetaMask()} disabled={!wallet.address}>
              Add ERK to MetaMask
            </Button>
          </>
        }
      />
      <GlassCard title="EVM wallet status" eyebrow="Ethereum ERC-20">
        <InfoList
          items={[
            { label: 'Connection', value: wallet.address ? 'Connected' : 'Not connected' },
            { label: 'Address', value: wallet.address ? <code>{wallet.address}</code> : 'Unavailable' },
            { label: 'Network', value: wallet.networkName ?? 'Unavailable' },
            { label: 'Chain ID', value: formatChainId(wallet.chainId) },
            { label: 'ETH balance', value: wallet.ethBalance ? `${wallet.ethBalance} ETH` : 'Unavailable' },
            { label: 'ERK balance', value: wallet.tokenBalance ? `${wallet.tokenBalance} ${EUREKA_TOKEN.symbol}` : 'Unavailable' },
          ]}
        />
        <p className="surface-note">{wallet.status}</p>
      </GlassCard>
      <GlassCard title="Wallet functions" eyebrow="Preview modules">
        <div className="pill-row">
          {walletFunctions.map((item) => (
            <span key={item} className="feature-pill">
              {item}
            </span>
          ))}
        </div>
      </GlassCard>
      <GlassCard title="Supported chain matrix" eyebrow="Visual integrations">
        <div className="chain-grid">
          {supportedChains.map((chain) => (
            <div key={chain} className="chain-chip">
              {chain}
            </div>
          ))}
        </div>
      </GlassCard>
      <GlassCard title="Solana companion panel" eyebrow={solanaConnection.network}>
        <InfoList
          items={[
            { label: 'Connection status', value: solanaWallet.connectionStatus },
            { label: 'Wallet address', value: solanaWallet.walletAddress ?? 'Unavailable' },
            { label: 'Recent transactions', value: solanaWallet.recentTransactions.length || 'Unavailable' },
            { label: 'Launch status', value: tinanAiToken.message },
          ]}
        />
        <p className="surface-note">{TINANAI_VERIFICATION_PENDING_MESSAGE}</p>
      </GlassCard>
    </div>
  )
}

function ErkTokenPage() {
  const metrics = useTokenMetrics()
  const { wallet, connect, transfer, approve, addTokenToMetaMask } = useEvmWallet()

  return (
    <div className="page-grid token-grid">
      <PageIntro
        title="ERK token dashboard"
        badge="Ethereum ERC-20"
        description="Read ERC-20 contract data, connect a wallet, transfer tokens, approve spenders, and add ERK to MetaMask from a single premium dashboard."
        actions={
          <>
            <Button onClick={() => void connect()}>Connect Wallet</Button>
            <Button tone="secondary" onClick={() => void addTokenToMetaMask()} disabled={!wallet.address}>
              Add Token to MetaMask
            </Button>
          </>
        }
      />
      <GlassCard title="Token overview">
        <InfoList
          items={[
            { label: 'Name', value: EUREKA_TOKEN.name },
            { label: 'Symbol', value: EUREKA_TOKEN.symbol },
            { label: 'Network', value: 'Ethereum ERC-20' },
            { label: 'Founder wallet', value: <code>{EUREKA_TOKEN.founderWallet}</code> },
            { label: 'Contract', value: <code>{metrics.contract}</code> },
          ]}
        />
        <div className="action-row">
          <ActionLink href={metrics.explorerUrl}>Explorer</ActionLink>
          <ActionLink href={undefined} disabled>
            Buy button pending verified route
          </ActionLink>
          <a className="button-link button-link--secondary" href={EUREKA_TOKEN.whitepaperDownloadUrl} download>
            Whitepaper download
          </a>
        </div>
      </GlassCard>
      <GlassCard title="Live contract metrics">
        <InfoList
          items={[
            { label: 'Live supply', value: metrics.totalSupply ? `${metrics.totalSupply} ${EUREKA_TOKEN.symbol}` : 'Unavailable' },
            { label: 'Holders', value: metrics.holders ?? 'Unavailable until verified source is configured' },
            { label: 'Wallet balance', value: wallet.tokenBalance ? `${wallet.tokenBalance} ${EUREKA_TOKEN.symbol}` : 'Connect wallet to load' },
            { label: 'Status', value: metrics.status },
          ]}
        />
      </GlassCard>
      <GlassCard title="Token utility">
        <div className="pill-row">
          {tokenUtilities.map((item) => (
            <span key={item} className="feature-pill">
              {item}
            </span>
          ))}
        </div>
      </GlassCard>
      <TokenActionForm title="Transfer ERK" buttonLabel="Transfer" onSubmit={transfer} />
      <TokenActionForm title="Approve spender" buttonLabel="Approve" onSubmit={approve} />
    </div>
  )
}

function MarketplacePage() {
  return (
    <div className="page-grid marketplace-grid">
      <PageIntro
        title="Eureka Marketplace"
        badge="NFT + RWA preview"
        description="A premium marketplace surface for digital art, AI models, photography, handmade items, domains, and data assets."
      />
      {marketplaceCategories.map((item) => (
        <GlassCard key={item.title} title={item.title} eyebrow={item.chain}>
          <div className="marketplace-art" aria-hidden="true" />
          <InfoList
            items={[
              { label: 'Price', value: item.price },
              { label: 'Chain', value: item.chain },
              { label: 'Owner', value: item.owner },
            ]}
          />
          <div className="action-row">
            <Button tone="secondary">Buy</Button>
          </div>
        </GlassCard>
      ))}
    </div>
  )
}

function EurekaCoreAiPage() {
  return (
    <div className="page-grid">
      <PageIntro
        title="EurekaCore AI"
        badge="Natural intelligence"
        description="Natural Intelligence powered ecosystem that converts valuable verified knowledge into utility."
        actions={
          <>
            <Button>Launch AI</Button>
            <Button tone="secondary">Create Token</Button>
          </>
        }
      />
      {aiModules.map((module) => (
        <GlassCard key={module.title} title={module.title}>
          <p>{module.detail}</p>
        </GlassCard>
      ))}
    </div>
  )
}

function RoadmapPage() {
  return (
    <div className="page-grid">
      <PageIntro title="Roadmap" badge="2026 → 2027" description="Website, token, marketplace, AI, mobile, governance, and tokenization-network milestones aligned to the EurekaCore launch brief." />
      {roadmap.map((block) => (
        <GlassCard key={block.year} title={block.year}>
          <ul className="bullet-list">
            {block.entries.map((entry) => (
              <li key={entry}>{entry}</li>
            ))}
          </ul>
        </GlassCard>
      ))}
    </div>
  )
}

function WhitepaperPage() {
  return (
    <div className="page-grid whitepaper-grid">
      <PageIntro
        title="Whitepaper"
        badge="Launch draft"
        description="Read the launch brief online or download the repository whitepaper draft for distribution and review."
        actions={
          <a className="button-link" href={EUREKA_TOKEN.whitepaperDownloadUrl} download>
            Download whitepaper
          </a>
        }
      />
      <GlassCard title="Version and distribution">
        <InfoList
          items={[
            { label: 'Version', value: 'EUREKACORE LAUNCH PROMPT v1.0' },
            { label: 'Read online', value: 'Available below' },
            { label: 'Download', value: 'Markdown export included in /public' },
          ]}
        />
      </GlassCard>
      {whitepaperSections.map((section) => (
        <GlassCard key={section.title} title={section.title}>
          {section.body.map((paragraph, index) => (
            <p key={`${section.title}-${index}`}>{paragraph}</p>
          ))}
        </GlassCard>
      ))}
    </div>
  )
}

function ExplorerPage() {
  return (
    <div className="page-grid">
      <PageIntro title="Explorer" badge="Asset lookup" description="A future-ready asset explorer for proof-bearing EurekaCore inventory across EVM and Solana-adjacent views." />
      <GlassCard title="Explorer preview">
        <InfoList
          items={[
            { label: 'Asset ID', value: sampleAsset.id },
            { label: 'Owner', value: <code>{sampleAsset.owner}</code> },
            { label: 'Verification', value: hasVerifiableProof(sampleAsset) ? 'Proof available' : 'Unavailable' },
            { label: 'Timestamp', value: sampleAsset.createdAt },
            { label: 'License', value: sampleLicense.usage },
            { label: 'Metadata URI', value: sampleAsset.metadataUri ?? 'Unavailable' },
          ]}
        />
      </GlassCard>
      <GlassCard title="Chain filters">
        <div className="pill-row">
          {['EUREKA / EVM', 'Ethereum', 'Solana', 'Tinan module'].map((item) => (
            <span key={item} className="feature-pill">
              {item}
            </span>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}

function SwapPage() {
  return (
    <div className="page-grid">
      <PageIntro title="Swap" badge="Routing preview" description="A modular swap interface prepared for future EVM and Solana routing without implying interchangeability between ERK and Tinan surfaces." />
      <GlassCard title="Swap controls">
        <form className="form-grid">
          <label>
            <span>From</span>
            <input placeholder="ERK" />
          </label>
          <label>
            <span>To</span>
            <input placeholder="ETH / USDC / future route" />
          </label>
          <label>
            <span>Amount</span>
            <input placeholder="0.0" inputMode="decimal" />
          </label>
          <label>
            <span>Slippage</span>
            <input placeholder="0.50%" />
          </label>
          <label>
            <span>Price impact</span>
            <input placeholder="Calculated after integration" disabled />
          </label>
          <Button tone="secondary" disabled>
            Swap
          </Button>
        </form>
      </GlassCard>
    </div>
  )
}

function StakingPage() {
  return (
    <div className="page-grid">
      <PageIntro title="Staking" badge="Planned module" description="Stake, unstake, and rewards surfaces are laid out for future verified contracts while remaining disabled until audited infrastructure is available." />
      <GlassCard title="Staking status">
        <StatusPill label="Coming soon" tone="warn" />
        <InfoList
          items={[
            { label: 'Stake ERK', value: 'Planned' },
            { label: 'Unstake', value: 'Planned' },
            { label: 'Rewards', value: 'Pending verified contract' },
            { label: 'APR', value: 'Placeholder only' },
            { label: 'Validator status', value: 'Unavailable' },
          ]}
        />
      </GlassCard>
    </div>
  )
}

function NotFoundPage() {
  return (
    <div className="page-grid">
      <PageIntro title="Page not found" badge="404" description="The requested route is not part of the current EurekaCore experience." />
      <GlassCard title="Available sections">
        <p>Use the shared navigation to return to Home, Dashboard, Wallet, ERK Token, Marketplace, EurekaCore AI, Roadmap, Whitepaper, Explorer, Swap, or Staking.</p>
      </GlassCard>
      <GlassCard title="Verification reminders">
        <ul className="bullet-list">
          <li>Metadata URI configured: {isSafeHttpsUrl(TINANAI_SOLANA_CONFIG.metadataUri) ? 'Yes, pending verification' : 'No'}</li>
          <li>Solana metadata: {solanaMetadata.metadataUri ?? solanaMetadata.message}</li>
          <li>Trusted Pump.fun URL: {pumpfunUrl ?? TINANAI_VERIFICATION_PENDING_MESSAGE}</li>
        </ul>
      </GlassCard>
    </div>
  )
}

export default App
