---
title: November
order: 11
hidden: false
---

## 2021-11-30

With a run down to the Year end, we have extensively focused this last quarter on improving the service of the API. With deliberate focus on improving the performance of the exisiting endpoints. In November, we improved on the overall response time of the Class A endpoints by reducing wait time to milli-seconds. We have also improved the `Block-Height` response, making it far easier for our API users to return data at particular `Blocks` faster than before.
### ADDED
- EVMOS Testnet is now fully indexed! EVMOS is an application-agnostic Cosmos chain that will be interoperable with the Ethereum mainnet, EVM-compatible environments, and other BFT chains via IBC, making it easy for users and developers to interact seamlessly between chains. EVMOS aims to be the EVM Hub of Cosmos, making it easy for smart contracts to deploy and communicate within the Cosmos ecosystem. Covalent API users can query ALL Class A endpoint and return EVMOS chain data by setting Testnet chainID: 9000. `<multichain>`

- Users in Great Britain will be excited that we have added support for GBP. `<no-code>`

- `starting-block` and `ending-block` has been added to the `Transfer_v2` endpoint. This enables developers to retreive transactions data from a particular **Block** range without having to query the entire chain. `<data-accessibility>`

- As part of the overall efforts to index Ronin Chain - which has successfully passed the community votes - we have added Katana to the Covalent list of supported DEXes. Katana is the Ronin decentralized exchange. Katana allows anyone to easily swap between the various assets within the Axie Infinity ecosystem. With the official launch of Ronin Chain on Covalent, users will be able to access transactions, log events, and activities on the Katana DEX. `<data-accessibility>`


### UPDATED
- We made important fixes to the `Block-Height` parameters, fixing the `starting-block` > `ending-block` params during requests to endpoints that require the arguments. Further optimizing the experience for developers who are making calls to get events that occur within a given block range. `<data-accessibility>`

- We have updated support for  AAVE on Avalanche C-Chain. The Avalanche is accessible at `ChainID: 43114` `<no-code>`

- We updated the token pricing for Arbitrum. `<no-code>`

- WMATIC has be added to the stablecoin tokens for Matic Mainnet. Matic is available at `ChainID: 137` on the Mainnet `<no-code>`

- We created a new service to index ERC20 Prices on Axie. `<data-accessibility>`


### BUG FIXES

- Fix NFT endpoint not working with Axie. [Issue-1179](https://github.com/covalenthq/scout/issues/1179)

- Fix missing WETH from `Balances_v2` response [Issue-1286](https://github.com/covalenthq/scout/issues/1286)

- Fix wrong volume response in `XY=K` SpookySwap #987 [Issue-987](https://github.com/covalenthq/scout/issues/987)

- Parameter starting block is required for `GET Log Events By Topic Hash`. [Issue-1166](https://github.com/covalenthq/scout/issues/1166)
