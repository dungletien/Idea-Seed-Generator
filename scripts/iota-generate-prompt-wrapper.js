const fs = require('fs');
const path = require('path');

function generatePrompt() {
  const timestamp = new Date().toISOString().replace(/[-:.]/g, '').slice(0, 15);
  const promptDir = path.join(process.cwd(), 'prompts');
  const promptFile = path.join(promptDir, `prompt_${timestamp}.md`);

  const content = `# Idea Seed Generator - Development Prompt

Generated: ${new Date().toISOString()}

## Project Overview
This is a decentralized application (dApp) built on IOTA blockchain that allows users to:
- Propose new ideas
- Support existing ideas to help them grow
- Track growth levels based on community support

## Smart Contract Structure
- Module: \`idea_seed\`
- Functions:
  - \`propose_idea\`: Create a new idea
  - \`support_idea\`: Add support to an existing idea
  
## Frontend Components
- WalletConnect: Handles wallet connection
- IdeaSeedIntegration: Main UI for proposing and supporting ideas
- useContract: Custom hook for contract interactions

## Next Steps
1. Install dependencies: \`npm install\`
2. Deploy contract: \`npm run iota-deploy\`
3. Update package ID in \`lib/config.ts\`
4. Run development server: \`npm run dev\`

## Development Notes
- Built with Next.js 16, React 19
- Uses IOTA dApp Kit for blockchain interactions
- Radix UI for component library
- TypeScript for type safety
`;

  if (!fs.existsSync(promptDir)) {
    fs.mkdirSync(promptDir, { recursive: true });
  }

  fs.writeFileSync(promptFile, content);
  console.log(`✅ Prompt generated: ${promptFile}`);
}

generatePrompt();
