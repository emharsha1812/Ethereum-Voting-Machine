# EVM (Ethereum Voting Machine)

This README file directs you how to install this project and the various dependencies on your local system and run this project locally. Before proceeding to clone, amke sure you have [node@16.14.0](https://nodejs.org/en/) and greater installed in your local system. 

## Cloning and dependencies

Clone this repository in your local system by running the following command in your preferable terminal.
```bash
git clone https://github.com/emharsha1812/Election-blockchain-class.git 
```
After cloning the repository, move into the directory by the following command 
```bash
cd Election-blockchain-class  
```
Install the various dependencies required for the project to work by running
```bash
npm install  
```
Install truffle and ganache-cli

   > truffle `v5.2.4`  
   > ganache-cli `v6.12.2`

   ```bash
   npm install -g truffle
   npm install -g ganache-cli
   ```
## Deploy contratcs and run locally

 Install metamask browser extension
Download and install metamask from [here](https://metamask.io/download "Go to official metamask download page.").
Before proceeding further, it is advisable to split 3 terminals to avoid confusion.
 Run local Ethereum blockchain on first terminal

   ```shell
   ganache-cli
   ```
    > Note: Do not close `ganache-cli` (the blockchain network needs to be running all the time)
 Configure metamask on the browser with following details

   New RPC URL: `http://localhost:8545`  
   Chain ID: `1337`
 Import accounts using private keys from ganache-cli to the metamask extension on the browser

## Run client side 

Deploy smart contract to the (local) blockchain

   ```bash
   # on the Election-blockchain-class directory
   truffle migrate
   ```

> Note: Use `truffle migrate --reset` for re-deployments

1. Launch the development server (fronted)

   ```bash
   npm run dev
   ```
> Note: If you face text visibility errors on client side, try changing your browser to dark mode.
