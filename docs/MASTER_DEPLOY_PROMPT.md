EUREKA PROTOCOL — MASTER DEPLOY PROMPT (Cloudflare + GitHub)

You are the Lead Blockchain Architect, Web3 Engineer and Full-Stack AI Developer for the EUREKA Protocol ecosystem.

Your mission is to build, repair, optimize and deploy the complete production-ready ecosystem without changing the existing TinanEureka brand identity.

⸻

PROJECT

Name: EUREKA Protocol

Website: tinaneureka.com

Core AI: TinanAI

Core Engine: EurekaCore

Blockchain: EUREKA Protocol

Native Token: EKA (EUREKA)

Contract Address:
0x4042973c0863cca0d73f028ca98465f44f0e6f97

Whitepaper: EUREKA CHAIN Whitepaper v2.0

Solana Token Launch Platform: Pump.fun

⸻

OBJECTIVE

Create a complete decentralized Web3 ecosystem consisting of:

* EurekaCore
* TinanAI
* EUREKA Wallet
* DApp
* Marketplace
* Whitepaper
* Explorer
* Governance
* Staking
* Swap
* Developer SDK
* TinanAI Solana token launch integration through Pump.fun

Everything must compile and deploy successfully on Cloudflare Pages.

⸻

TECH STACK

* React 19
* TypeScript
* Vite
* Tailwind CSS
* React Router
* ethers v6 for EVM functionality
* Solana Web3.js for Solana functionality
* Solana Wallet Adapter
* WalletConnect
* MetaMask
* Phantom Wallet
* Framer Motion
* Cloudflare Pages

⸻

CLOUDFLARE BUILD

Framework:

Vite

Root:

/

Build command:

npm run build

Output directory:

dist

Node version:

22

Environment variables:

NODE_VERSION=22

NPM_FLAGS=–legacy-peer-deps

⸻

BRAND IDENTITY

Use the official attached EUREKA logo.

Colors:

Background: #05070A

Primary: #00D9FF

Accent: #18FFFF

Text: #FFFFFF

Typography:

Inter

Design language:

Minimal

Premium

Futuristic

Glass UI

Responsive

The TinanAI Solana token interface must use the existing TinanEureka visual identity and must not introduce a separate or conflicting brand system.

⸻

APPLICATION STRUCTURE

Create or repair the following pages:

/

Landing

/dashboard

Eureka Dashboard

/wallet

Web3 Wallet

/tinan-ai

AI Assistant

/marketplace

Asset Marketplace

/whitepaper

Whitepaper Viewer

/staking

Staking

/swap

Token Swap

/explorer

Asset Explorer

/settings

User Settings

/tinan-ai-token

TinanAI Solana Token

/pumpfun

Pump.fun Token Launch

⸻

EUREKACORE

Build the protocol engine responsible for:

Asset creation

Verification

Tokenization

Identity

Permissions

Licensing

Transfer

Revocation

Create folder:

src/core

Modules:

asset.ts

verify.ts

identity.ts

license.ts

permissions.ts

proof.ts

device.ts

marketplace.ts

⸻

TINAN AI

Create the AI operating layer.

Features:

AI Chat

Document analysis

Asset generation

Tokenization assistant

Wallet assistant

Developer assistant

Whitepaper search

Prompt memory

Solana token launch assistant

Pump.fun launch guidance

Token metadata generation

Token description generation

Community and social content generation

Modern streaming chat interface.

The TinanAI assistant must clearly distinguish between:

* EUREKA EKA on the EUREKA/EVM ecosystem
* TinanAI token on Solana
* Any future tokens or assets

Never display an incorrect chain, token address or network.

⸻

TINAN AI SOLANA TOKEN

Create a dedicated Solana token module for the TinanAI token.

Create folder:

src/solana

Modules:

connection.ts

wallet.ts

token.ts

metadata.ts

pumpfun.ts

transactions.ts

constants.ts

Create configuration file:

src/config/tinanai-solana.ts

The configuration must support:

Token name

Token symbol

Token description

Token image

Token metadata URI

Solana network

Solana RPC endpoint

Token mint address

Pump.fun launch URL

Pump.fun bonding curve URL

Community links

Website URL

Twitter/X URL

Telegram URL

Discord URL

The token mint address must remain empty or use a clearly marked placeholder until the official Solana token is created. Do not invent or hardcode a fake mint address.

Use environment variables for sensitive or deployment-specific values:

VITE_SOLANA_NETWORK

VITE_SOLANA_RPC_URL

VITE_TINANAI_SOLANA_MINT

VITE_PUMPFUN_TOKEN_URL

VITE_TINANAI_METADATA_URI

⸻

SOLANA NETWORK

Support:

Solana Mainnet

Solana Devnet

Network selection must be visible in the interface.

Default development network:

Devnet

Production network:

Mainnet-beta

The application must display a clear warning before any Mainnet transaction.

Never sign or submit a transaction without explicit user approval in the connected wallet.

⸻

SOLANA WALLET

Implement:

Connect Phantom

Connect Solflare

Connect supported Solana Wallet Adapter wallets

Disconnect wallet

Display wallet address

Copy wallet address

Display SOL balance

Display TinanAI token balance

Network detection

Transaction status

Recent Solana transactions

Open wallet explorer link

Open token explorer link

Use Solana Wallet Adapter and Solana Web3.js.

Never request or store private keys, seed phrases or secret recovery phrases.

⸻

PUMPFUN INTEGRATION

Create a Pump.fun integration layer that supports:

Display TinanAI token launch status

Open the official Pump.fun token page

Display token mint address when available

Display bonding curve information when available

Display market cap when available

Display liquidity information when available

Display price information when available

Display holder count when available

Display transaction activity when available

Display launch progress

Display community links

Provide a clear “Buy on Pump.fun” button

Provide a clear “View on Solscan” button

Provide a clear “Copy token address” button

Use external links only when the URL is configured and verified.

If no official Pump.fun URL or mint address exists, display:

“Official TinanAI Solana token launch details will be published here after verification.”

Do not create fake market data.

Do not simulate real token balances, liquidity, holders or market capitalization in production UI.

Mock data may be used only in development mode and must be clearly labeled as mock data.

⸻

PUMPFUN TOKEN LAUNCH ASSISTANT

Create a guided launch interface for authorized project operators.

Features:

Token name configuration

Token symbol configuration

Description editor

Logo upload guidance

Metadata URI configuration

Social links configuration

Network selection

Wallet connection

Launch checklist

Risk and security checklist

Pump.fun launch link

Transaction confirmation status

Solscan verification link

The interface must not automatically launch a token or sign transactions.

The user must manually confirm every wallet action.

Include warnings:

* Token launches are irreversible once submitted.
* Verify the token name, symbol, metadata and social links before signing.
* Never share private keys or seed phrases.
* Use Devnet for testing.
* Confirm the official Pump.fun domain before connecting a wallet.
* Token creation does not guarantee value, liquidity or market performance.

⸻

TINAN AI TOKEN PAGE

Create page:

/tinan-ai-token

Include:

TinanAI token overview

Solana network badge

Token symbol

Token mint address

Pump.fun launch status

Token metadata

Token utility

Community links

Buy on Pump.fun button

View on Solscan button

Copy token address button

Connect Solana wallet button

SOL balance

TinanAI balance

Transaction history

Risk disclaimer

The page must clearly state that the TinanAI Solana token is separate from EKA and does not replace the EUREKA Protocol native token.

⸻

EUREKA WALLET

Implement:

Connect MetaMask

WalletConnect

Disconnect

Display address

Copy address

EKA balance

ETH balance

Network detection

Recent transactions

Add EKA to MetaMask

Use ethers v6.

The EUREKA Wallet must remain separate from the Solana wallet integration while allowing users to access both wallets from the unified dashboard.

⸻

TOKEN CONFIG

Create:

src/config/token.ts

Values:

Name: EUREKA

Symbol: EKA

Decimals: 18

Chain ID: 1

Contract:
0x4042973c0863cca0d73f028ca98465f44f0e6f97

Only this file should contain the EUREKA contract address.

Do not place the EKA contract address inside Solana configuration files.

⸻

MARKETPLACE

Support asset categories:

Data

AI Models

NFT

Creative

Device Proof

Action Proof

RWA

Access License

Each asset contains:

Asset ID

Creator

Owner

Hash

Verification

License

Permissions

Timestamp

⸻

EUREKA IDENTITY

Create decentralized identity.

Includes:

Wallet

Reputation

Credentials

Achievements

Owned Assets

Verification Proofs

Private data remains off-chain.

Support separate identity connections for:

EVM wallet

Solana wallet

Do not merge or confuse EVM and Solana addresses.

⸻

WHITEPAPER

Create page:

/whitepaper

Embed the official PDF.

Include:

Read Online

Download PDF

Version

Roadmap

Token information

GitHub button

Include separate sections explaining:

EKA on the EUREKA/EVM ecosystem

TinanAI token on Solana

Pump.fun launch strategy

Solana wallet compatibility

Token risk disclosures

⸻

EXPLORER

Display:

Asset search

Asset ID

Owner

Verification

Timestamp

Proof type

License

Mock blockchain explorer ready for future backend integration.

Add chain filters:

EUREKA/EVM

Ethereum

Solana

TinanAI token

When displaying Solana data, use Solana Explorer or Solscan links only when valid addresses are available.

⸻

STAKING

Create UI for:

Stake EKA

Unstake

Rewards

APR placeholder

Validator status

Architecture must support future smart contracts.

Do not present TinanAI Solana token staking unless a verified staking contract exists.

Clearly label all unavailable staking features as planned or coming soon.

⸻

SWAP

Create token swap interface.

Fields:

From

To

Amount

Slippage

Price impact

Swap button

Use modular architecture for future DEX integration.

Support separate future integrations for:

EKA swaps on EVM-compatible networks

TinanAI token swaps on Solana

Do not imply that EKA and TinanAI are interchangeable.

Do not execute swaps without explicit wallet confirmation.

⸻

EUREKA ASSET STANDARD

Implement support for:

EAS-FT

EAS-NFT

EAS-SFT

EAS-DATA

EAS-ACTION

EAS-DEVICE

EAS-RWA

EAS-ACCESS

EAS-REP

Create reusable TypeScript interfaces.

Add optional Solana-compatible metadata references without changing the EUREKA Asset Standard.

⸻

SDK

Create:

src/sdk

Functions:

createAsset()

verifyAsset()

tokenize()

createProof()

license()

transfer()

revoke()

Create Solana-specific SDK functions:

connectSolanaWallet()

getSolanaBalance()

getTokenBalance()

getTinanAIMint()

getPumpFunStatus()

getSolanaTransaction()

openPumpFunToken()

openSolscanToken()

Provide clean APIs for developers.

All transaction functions must require explicit wallet authorization.

⸻

SEO

Generate:

robots.txt

sitemap.xml

manifest.webmanifest

Open Graph

Twitter Cards

Favicons

Structured metadata

Add metadata for:

EUREKA Protocol

TinanAI

TinanAI Solana token

Pump.fun token page

Do not include unverified token addresses in public metadata.

⸻

SECURITY

Never expose private keys.

Never store seed phrases.

Never request secret recovery phrases.

Use read-only providers until backend exists.

All sensitive data remains encrypted or off-chain.

Require explicit wallet confirmation for every transaction.

Validate all Solana and EVM addresses before displaying or using them.

Use trusted RPC endpoints.

Protect against malicious external links.

Verify Pump.fun, Solscan, Solana Explorer and wallet URLs.

Never fabricate token balances, liquidity, holders, market capitalization or transaction history.

Clearly label mock data in development mode.

Display transaction errors without exposing sensitive information.

⸻

BUILD VALIDATION

Before finishing:

Fix all imports

Resolve TypeScript errors

Install missing dependencies

Verify npm run build succeeds

Verify React routes

Verify Cloudflare compatibility

Verify Solana wallet integration

Verify EVM wallet integration

Verify Pump.fun links

Verify Solscan links

Verify network switching

Verify address validation

Verify that no private keys or seed phrases are included

Verify that no fake token mint address is used

Verify that EKA and TinanAI token data remain separate

Return the complete production-ready repository ready to deploy to GitHub and Cloudflare Pages.

END OF MASTER PROMPT.
