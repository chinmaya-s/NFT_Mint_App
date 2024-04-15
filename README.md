## Introduction

This is an NFT project which utilizes a ERC721 contract to mint upto 5 NFT per user. A user can mint NFT for themselves or someone else.

You can use a browser wallet such as metamask to mint NFTs using this app.

## Installation and setup

Install requisite node modules:

```bash
npm i
```

Build the app:

```bash
npm run build
```

Run local server:

```bash
npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to use the app.

Use the 'Connect Wallet' button to connect your browser wallet with the app. Once the wallet is connected, it will display the current balance and minted quantity for the linked account.

Use the 'Mint' button to mint a new NFT. If no input address is provided, the NFT will be minted to your own account.

Note: 
- Each NFT costs 0.1 ETH to mint.
- The contract is deployed on Sepolia Testnet
- You can view the collection on [Opensea](https://testnets.opensea.io/collection/arknights-at-1)
- Currently metadata of only 3 NFTs is available 

