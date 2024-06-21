# Smart Escrow P2P: 🌐🔒 for P2P Marketplaces 🤝🛒

Smart Escrow P2P is a feature designed to bring security and trust to peer-to-peer (P2P) marketplaces. Leveraging the power of blockchain and smart contracts, this project offers a decentralized escrow service that ensures safe transactions between buyers and sellers of second-hand goods.

## Project Overview:
Smart Escrow P2P is not a complete app, but a robust feature that can be integrated into existing or new applications. It provides a framework for creating secure, trustless transactions using cryptocurrency, making it ideal for marketplaces where users buy and sell second-hand items.

## Why Use Crypto Escrow for P2P Marketplaces?

Emerging markets face several challenges in the context of peer-to-peer (P2P) marketplaces:

1. **Reducing Scam Risks in Transactions**: 
   - Traditional P2P transactions often require physical meetups, which can pose safety risks.
   - Crypto escrow mitigates the risk of scams by holding the funds in escrow until all conditions of the transaction are met. This ensures that the buyer receives the goods and the seller gets paid, enhancing the safety and trust between parties.

2. **Unstable Local Currency**: 
   - Fluctuating exchange rates can affect the value of transactions and create uncertainty.
   - Using cryptocurrency can provide a stable and universal medium of exchange, mitigating the risks associated with unstable local currencies.

3. **High Fees for Credit Cards**: 
   - Credit card transactions can incur high fees, which can be a significant burden in markets with low transaction volumes or high sensitivity to costs.
   - Cryptocurrency transactions generally have lower fees compared to traditional banking and credit card systems, making it a cost-effective solution.

4. **Increasing Crypto Adoption**:
   - More and more people in emerging markets are starting to use cryptocurrency, driven by the need for a reliable and stable financial system.
   - Crypto escrow leverages this growing trend, offering a familiar and trusted method for securing transactions.

By leveraging the benefits of crypto escrow, P2P marketplaces in emerging markets can overcome these challenges, providing a more secure, stable, and cost-effective platform for users.


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


2. Set up your Dynamic account and configure your project to use Dynamic. Refer to the [Dynamic documentation](https://docs.dynamic.xyz) for detailed instructions.

3. On a third terminal, start your NextJS app:

```
yarn start
```

## Important Files

- **Smart Contract**: `EscrowContract.sol` in `packages/hardhat/contracts`
- **Dynamic Configuration**: `ScaffoldEthAppWithProviders.tsx`
- **Frontend Components**:
  - `ItemComponent.tsx`
  - `app/deal/page.tsx`
  - `app/status/page.tsx`
  - `app/item/page.tsx`

## Developer's Role in Integrating This Product into Your App

Your role as a developer is to integrate the smart contract into your app. Here's a breakdown of responsibilities:

- **Buyer Address**: Provided by Dynamic wallet.
- **Seller Address**: Must be set up through your back-end.
- **Arbiter**: Provided as your customer service personnel.
- **Platform Wallet**: This is your platform wallet and you can set up a commission if desired.
- **Tracking ID**: Must be provided through your back-end.

## Deployment Notes

Deployment is not necessary for every instance, as each contract gets deployed when there is a pair of buyer and seller. This choice is made for isolation, security, and simplicity. However, it's entirely possible to create a monolithic smart contract that handles everything. Fees are not high when you are on Layer 2 (L2) chains like Optimism or Arbitrum, which is recommended for lowering gas fees.

This setup ensures a seamless, secure, and efficient experience for users, whether they are familiar with cryptocurrency or new to the ecosystem. The use of Dynamic Wallets simplifies onboarding and enhances accessibility, making it easier for users to participate in decentralized transactions.


### Based on 🙌[Scaffold-ETH 2](https://scaffoldeth.io)🙌
### Built for 🌎[ETH Global](https://ethglobal.com)🌏
