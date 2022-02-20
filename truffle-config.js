const path = require('path')
const HDWalletProvider = require('@truffle/hdwallet-provider')
const fs = require('fs')
const mnemonic = fs.readFileSync('.secret').toString().trim()
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, 'client/src/contracts'),
  networks: {
    development: {
      network_id: '*',
      host: 'localhost',
      // port: 7545, // for ganache gui
      port: 8545, // for ganache-cli
      gas: 6721975,
      gasPrice: 20000000000,
    },
    matic: {
      provider: () =>
        new HDWalletProvider(mnemonic, `https://rpc-mumbai.maticvigil.com`),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
  },
}
