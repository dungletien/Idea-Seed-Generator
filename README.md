# 💡 Idea Seed Generator

A decentralized application (dApp) built on the IOTA blockchain that enables users to propose innovative ideas and receive community support to help them grow.

## 🌟 Features

- **Propose Ideas**: Users can submit new ideas with title, description, and category
- **Support System**: Community members can "water" ideas to help them grow
- **Growth Tracking**: Ideas have growth levels based on the support they receive
- **Blockchain-Backed**: All ideas and support are recorded on the IOTA blockchain
- **Wallet Integration**: Secure wallet connection for authenticated interactions

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ installed
- IOTA wallet (e.g., IOTA Wallet browser extension)
- IOTA CLI for contract deployment

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

4. **Connect your IOTA wallet**:
   - Install IOTA Wallet extension in your browser
   - Click "Connect Wallet" button
   - Follow the prompts to connect

5. **(Optional) Deploy your own smart contract**:
   ```bash
   npm run iota-deploy
   ```
   Then update the package ID in `lib/config.ts`

## 📁 Project Structure

```
iota_project/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── IdeaSeedIntegration.tsx  # Main dApp interface
│   ├── Provider.tsx       # Context providers
│   └── Wallet-connect.tsx # Wallet connection
├── contract/              # Smart contract
│   └── idea_seed/
│       ├── sources/
│       │   └── idea_seed.move  # Move smart contract
│       └── Move.toml      # Contract configuration
├── hooks/                 # Custom React hooks
│   └── useContract.ts     # Contract interaction logic
├── lib/                   # Utilities
│   └── config.ts          # Network configuration
└── scripts/               # Deployment scripts
    ├── iota-deploy-wrapper.js
    └── iota-generate-prompt-wrapper.js
```

## 🎯 How It Works

1. **Connect Wallet**: Users connect their IOTA wallet to interact with the dApp

2. **Propose an Idea**: 
   - Fill in the idea title, category, and description
   - Submit to create a new idea on the blockchain
   - The idea is stored as an NFT-like object

3. **Support Ideas**:
   - Browse existing ideas from the community
   - Click "Water This Idea" to add support
   - Each support increases the idea's growth level

4. **Track Growth**:
   - Ideas gain growth levels (1 level per 10 supports)
   - See which ideas are gaining traction
   - Community-driven idea validation

## 🔧 Smart Contract

The Move smart contract (`idea_seed.move`) includes:

- **Idea Struct**: Stores idea data (title, description, category, proposer, support count, growth level)
- **propose_idea**: Creates a new idea and transfers ownership to the proposer
- **support_idea**: Increments support count and recalculates growth level
- **get_idea_info**: Retrieves all idea information
- **has_reached_milestone**: Checks if an idea has reached a specific growth level

## 🛠️ Technologies Used

- **Frontend**: Next.js 16, React 19, TypeScript
- **Blockchain**: IOTA, Move language
- **UI Library**: Radix UI, Tailwind CSS
- **State Management**: TanStack Query
- **Wallet Integration**: IOTA dApp Kit

## 📝 Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run iota-deploy` - Deploy smart contract
- `npm run generate-prompt` - Generate development prompt


## 📄 License

MIT License - feel free to use this project as a template for your own IOTA dApps!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For questions or issues, please open an issue on GitHub or contact the maintainers.

## Contract address
- 0x47b416f0aa7901e561086213c055ebf86075e0985f0da60a480924b08083a68e
---

**Built with ❤️ on IOTA blockchain**
