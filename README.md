# Smart Escrow P2P: 🌐🔒 for P2P Marketplaces 🤝🛒

Smart Escrow P2P is a feature designed to bring security and trust to peer-to-peer (P2P) marketplaces. Leveraging the power of blockchain and smart contracts, this project offers a decentralized escrow service that ensures safe transactions between buyers and sellers of second-hand goods.

## Project Overview:
Smart Escrow P2P is not a complete app, but a robust feature that can be integrated into existing or new applications. It provides a framework for creating secure, trustless transactions using cryptocurrency, making it ideal for marketplaces where users buy and sell second-hand items.

## Key Features:
- 🌐🔒 **Decentralized Escrow:**  Ensures funds are only released when both parties fulfill the terms of the transaction, reducing fraud and increasing trust.
- 👩‍⚖️ **Dispute Resolution:** In case of a dispute, a third-party arbiter (defined by the developer implementing this feature, typically the platform itself) can intervene to resolve the issue fairly and efficiently.
- 💼 **Dynamic Wallets:**  Simplifies user onboarding by allowing the creation and management of wallets dynamically. This feature is especially beneficial for users who are not very familiar with cryptocurrency, as it provides a seamless and user-friendly experience without the need for complex wallet setups.
- 🛠️ **Open Source:**  While not a traditional open source library, Smart Escrow P2P is open for developers to build upon, customize, and integrate into their own applications.
- 📱 **Mobile Optimization:** The front-end is optimized for mobile devices, ensuring seamless access and usability on the go.
- 🖥️ **Example Front-End:**  Includes a demo front-end to illustrate how the escrow functionality can be integrated and utilized in a real-world scenario.

## [Dynamic Wallet](https://www.dynamic.xyz/): Enhancing User Onboarding
One of the standout features of Smart Escrow P2P is the use of Dynamic Wallets. This technology simplifies the process of creating and managing cryptocurrency wallets, making it more accessible to users who may not be familiar with crypto. By automating wallet setup and management, users can easily onboard and participate in secure transactions without needing extensive knowledge of blockchain technology. This feature significantly lowers the barrier to entry, fostering greater adoption and usability in P2P marketplaces.

⚙️ Built using Solidity, Dynamic wallet, NextJS, RainbowKit, Hardhat, Wagmi, Viem, and Typescript.

### Based on 🙌[Scaffold-ETH 2](https://scaffoldeth.io)🙌
### Built for 🌎[ETH Global](https://ethglobal.com)🌏


## Quickstart

Before you begin, you need to install the following tools:

- [Node (>= v18.17)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

To get started with Escrow, follow the steps below:

1. Install dependencies if it was skipped in CLI:

```
yarn install
```

2. Run a local network in the first terminal:

```
yarn chain
```

This command starts a local Ethereum network using Hardhat. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `packages/hardhat/hardhat.config.ts`.

3. On a second terminal, deploy the test contract:

```
yarn deploy
```

This command deploys a test smart contract to the local network. The contract is located in `packages/hardhat/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/hardhat/deploy` to deploy the contract to the network. You can also customize the deploy script.

4. On a third terminal, start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the `Debug Contracts` page. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.

Run smart contract test with `yarn hardhat:test`

- Edit your smart contract `EscrowContract.sol` in `packages/hardhat/contracts`
- Edit your frontend homepage at `packages/nextjs/app/page.tsx`. For guidance on [routing](https://nextjs.org/docs/app/building-your-application/routing/defining-routes) and configuring [pages/layouts](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts) checkout the Next.js documentation.
- Edit your deployment scripts in `packages/hardhat/deploy`

## Roles and Functionality

The Smart Escrow P2P system supports three primary roles: buyer, seller, and arbiter. Each role has specific permissions and capabilities within the application.

### Roles:

#### Buyer 🛍️
- Buy item
- Request cancellation of a transaction
- Open a dispute

#### Seller 🏷️
- Request or confirm cancellation of a transaction
- Open a dispute

#### Arbiter 👩‍⚖️
- Close disputes
- Refund the buyer or release funds to the seller (only if a dispute is opened)

### Pages:
- **Home Page**: Users select their role (buyer, seller, arbiter).
- **Status Page**: Displays the status of all items and transactions.
- **Item Page**: Allows buyer to view and purchase item.
- **Deal Page**: Shows the status of a specific item, allowing users to interact based on their role.

### Platform Fee:
The platform may optionally take a percentage of each transaction as a fee. This can be configured by the platform administrators.

### Recommended Deployment:
It is advised to use the escrow feature on Layer 2 (L2) chains like Optimism, Arbitrum, etc., to reduce gas fees and improve transaction efficiency.

This setup ensures a seamless, secure, and efficient experience for users, whether they are familiar with cryptocurrency or new to the ecosystem. The use of Dynamic Wallets simplifies onboarding and enhances accessibility, making it easier for users to participate in decentralized transactions.
