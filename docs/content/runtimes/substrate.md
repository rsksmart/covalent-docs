---
title: Substrate Runtime
order: 6
hidden: false
featuredImage: ./images/Substrate.png
description: Support for Substrate-based parachains
---

![Substrate banner](./images/Substrate.png)

# The Substrate Runtime

## Introduction

[Substrate](https://substrate.dev/) is a modular framework that enables you to create purpose-built blockchains by composing custom or pre-built components.

The Substrate runtime provides **API compatibility** with the [Ethereum runtime](/runtimes/ethereum). Ethereum smart contracts can be deployed to Substrate-runtime blockchains; and Substrate-runtime blockchains support Ethereum's JSON-RPC APIs.

## Major Implementations

The following well-known blockchains are built on the Substrate runtime:

* The [Polkadot](https://polkadot.network/) and [Kusama](https://kusama.network/) relay chains

* All of [Moonbeam](/network-partners/moonbeam)'s blockchains, including:
  * [Moonbeam "Moonbase Alpha" Testnet](/chains/moonbeam-moonbase-alpha)
  * [Moonriver](/chains/moonriver)

## Supported Covalent API Endpoints

<Aside>

All [**Class A**](https://www.covalenthq.com/docs/api/#tag--Class-A) endpoints are supported for Substrate-based blockchains. You can query the blockchain via the unified API by changing the `chainId`.

</Aside>

<Definitions>

- `api.covalenthq.com/v1/{chainId}/address/{address}/balances_v2/`

  - Get token balances for `address`. Return a list of all ERC20 and NFT token balances including ERC721 and ERC1155 along with their current spot prices.

- `api.covalenthq.com/v1/{chainId}/address/{address}/transactions_v2/`

  - Retrieve all transactions for `address` including their decoded log events. This endpoint does a deep-crawl of the blockchain to retrieve all kinds of transactions that references the address.

- `api.covalenthq.com/v1/{chainId}/address/{address}/transfers_v2/`

  - Get ERC20 token transfers for `address` along with historical token prices.

- `api.covalenthq.com/v1/{chainId}/tokens/{contract_address}/token_holders/`

  - Return a paginated list of token holders `contract_address` as of any historical block height.

- `api.covalenthq.com/v1/{chainId}/events/address/{contract_address}/`

  - Return a paginated list of decoded log events emitted by a particular smart contract.

- `api.covalenthq.com/v1/{chainId}/events/topics/{topic}/`
  - Return a paginated list of decoded log events with one or more topic hashes separated by a comma.

</Definitions>

<a target="_blank" class="Button Button-is-docs-primary" href="https://www.covalenthq.com/docs/api/">Go to Covalent's API Reference</a>
