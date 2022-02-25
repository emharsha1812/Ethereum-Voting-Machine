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

## Polygon

Repeat all the above steps similarily as done before 
 ```shell
   ganache-cli
   ```
1. Now copy one of the private keys given by ganache-cli to .secrets file present in root folder

1. Now we need to create a new network i.e. Mumbai faucet 
1. Next, click on Networks and then Add Network:
1. Here, we will add the following configurations for the Mumbai test network as listed here:
Network Name: Mumbai TestNet
New RPC URL: https://rpc-mumbai.maticvigil.com
Chain ID: 80001
Currency Symbol: Matic
1. Save this, then you should be able to switch to and use the new network!

Finally, you will need some testnet Matic tokens in order to interact with the applications.
To get these, you can visit the [Matic Faucet](https://faucet.polygon.technology/), inputting the address of the wallets that you would like to request the tokens.
1. Now we have some test Matic in our accounts (typically 0.5 Matic)

1. Run this command in root of the project directory:
```shell
$ truffle compile
$ truffle migrate --reset --network matic
```
Contract will be deployed on Matic's Mumbai Testnet

1. finally run 
```shell
$ npm run dev
```
