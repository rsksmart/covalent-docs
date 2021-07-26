---
title: Supported Blockchain Runtimes
order: 3
---

# What are Blockchain Runtimes?

There are many blockchains deployed and operating across the Internet (and [we support quite a lot of them!](/chains).) But there are far fewer distinct _blockchain runtimes_ that these chains rely on.

A **blockchain runtime** is a design for blockchain software, involving a unique peer protocol and consensus model. Many different blockchains, with seemingly-different feature sets, are built on the same blockchain runtimes. And even more blockchains are built on very-closely-related runtimes, different by only a few tweaks. (For our purposes here, we'll group these very-closely-related runtimes together, and treat them as a single runtime.)

When working with the Covalent API, it helps to understand blockchains in terms of the runtime they use. All blockchains sharing a runtime will behave the same way, offer the same basic features and data, and expose the same APIs.

For network partners, if you're interested in [getting your blockchain indexed by Covalent](/network-partners#indexing-process), you should know that the majority of the challenge in blockchain integration is in supporting new runtimes. New blockchains relying on runtimes we already support — or which are API-compatible with already-supported runtimes — can benefit from integration work Covalent has already done, greatly expediting the indexing process for your chain.

## Runtimes by Example

**Ethereum** and **Bitcoin** are examples of blockchain runtimes. Using the Ethereum runtime as an example, let's define our terms.

An *Ethereum-based* blockchain is one whose node operators run client-node software that implements the [Ethereum runtime](/runtimes/ethereum).

A piece of software *implements the Ethereum runtime* if node operators connecting to the blockchain must rely on client-node software designed originally for use with Ethereum's mainnet and official testnets. These include **go-ethereum**, **OpenEthereum**, **Hyperledger Besu**, and **Erigon**. Any lightly-patched derivative forks of these pieces of software are also included — for example, Binance's [bsc](https://github.com/binance-chain/bsc) software, which is a lightly-patched fork of go-ethereum.

Examples of "Ethereum-based" blockchains therefore include:

* the Ethereum mainnet
* all Ethereum official testnets (Görli, Kovan, Rinkeby, Ropsten)
* the Ethereum Classic mainnet, and its testnets
* Binance Smart Chain
* many, but not all, of the chains [listed on Chainlist](https://chainlist.org/)

## API Compatibility

A blockchain can be said to be **API-compatible** with a given runtime, if API clients coded to talk to that runtime are able to connect and interact usefully with the blockchain.

Blockchains that are based on a particular runtime, are automatically "compatible" with client software expecting that runtime, unless the blockchain intentionally makes changes to break compatibility.

Blockchains can still be compatible with a runtime *without* being built on that runtime. Some runtimes offer a _compatibility layer_ for another runtime, allowing clients expecting that other runtime to interact with them, despite the runtime not "thinking like" (having the domain model of) the other runtime.

Again, to use Ethereum as an example — examples of runtimes that offer a *compatibility layer* for the Ethereum runtime's API include:

* [Avalanche](/runtimes/avalanche)
* [Moonbeam](/runtimes/moonbeam)
* [RSK](/runtimes/rsk)

There are also heavily-diverged forks that were originally Ethereum-based, but where most of the Ethereum "guts" have been replaced. These are better thought of as being Ethereum-API-compatible rather than Ethereum-based. These include:

* [Fantom](/runtimes/fantom) (with Fantom's [go-opera](https://github.com/Fantom-foundation/go-opera) being a heavy fork of go-ethereum)
* Polygon's bor sidechain (where [bor](https://github.com/maticnetwork/bor) is a heavy fork of go-ethereum)

[Chainlist](https://chainlist.org/) is precisely a list of blockchains which are API-compatible with the Ethereum runtime. Many are Ethereum-based; but some are not.

# Supported Blockchain Runtimes

We currently support the following blockchain runtimes:

* [Ethereum Runtime](/runtimes/ethereum), supporting:
  * [Ethereum Mainnet](/chains/eth-mainnet)
  * [Ethereum Kovan Testnet](/chains/eth-kovan)
  * [Binance Smart Chain Mainnet](/chains/bsc-mainnet)
  * [Binance Smart Chain Testnet](/chains/bsc-testnet)

* [Matic Runtime](/runtimes/matic), supporting:
  * [Polygon PoS Mainnet](/chains/matic-mainnet)
  * [Polygon "Mumbai" Testnet](/chains/matic-mumbai)

* [Fantom Runtime](/runtimes/fantom), supporting:
  * [Fantom Opera Mainnet](/chains/fantom-mainnet)
  * [Fantom Opera Testnet](/chains/fantom-testnet)

* [Avalanche Runtime](/runtimes/avalanche), supporting:
  * [Avalanche Mainnet](/chains/avalanche-mainnet)
  * [Avalanche Fuji Testnet](/chains/avalanche-testnet)

* [Moonbeam Runtime](/runtimes/moonbeam), supporting:
  * [Moonbeam "Moonbase Alpha" Testnet](/chains/moonbeam-moonbase-alpha)
  * [Moonriver](/chains/moonriver)

* [Palm Runtime](/runtimes/palm), supporting:
  * [Palm Mainnet](/chains/palm-mainnet)
  * [Palm Testnet](/chains/palm-testnet)

* [RSK Runtime](/runtimes/rsk), supporting:
  * [RSK Mainnet](/chains/rsk-mainnet)
  * [RSK Testnet](/chains/rsk-testnet)

* [Arbitrum Runtime](/runtimes/arbitrum), supporting:
  * [Arbitrum Mainnet](/chains/arbitrum-mainnet)
  * [Arbitrum Testnet](/chains/arbitrum-testnet)
