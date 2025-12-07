const { execSync } = require('child_process');

try {
  console.log('🚀 Deploying IOTA smart contract...');
  execSync('iota client publish --gas-budget 100000000', { 
    stdio: 'inherit',
    cwd: process.cwd() + '/contract/idea_seed'
  });
  console.log('✅ Contract deployed successfully!');
} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
}
