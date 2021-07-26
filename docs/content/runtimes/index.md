---
title: Blockchain Runtimes
order: 31
---

# Blockchain Runtimes

## What are Blockchain Runtimes?

There are many blockchains deployed and operating across the Internet—and [we support quite a lot of them!](/chains) But there are far fewer distinct _blockchain runtimes_ that these chains rely on.

A **blockchain runtime** is a design for blockchain software, involving a unique peer protocol and consensus model. Many different blockchains, with seemingly-different feature sets, are built on the same runtime. And even more blockchains are built on very-closely-related runtimes, different by only a few tweaks. (For our purposes here, we'll group these very-closely-related runtimes together, and treat them as a single runtime.)

When working with the Covalent API, it helps to understand blockchains in terms of the runtime they use. All blockchains sharing a runtime will behave the same way, offer the same basic features and data, and expose the same APIs. Because of this, our level of support for blockchains that use the same runtime will be about the same.

For network partners, if you're interested in [getting your blockchain indexed by Covalent](/network-partners#indexing-process), you should know that the majority of the challenge in blockchain integration is in supporting new runtimes. New blockchains relying on runtimes we already support — or which are API-compatible with already-supported runtimes — can benefit from integration work Covalent has already done, greatly expediting the indexing process for your chain.

## Runtimes by Example

**Ethereum**, **Bitcoin**, the **Cosmos SDK** and **Substrate** are all examples of blockchain runtimes.

Using the Ethereum runtime as an example, let's define some useful terms.

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

Blockchains that are based on a particular runtime, are automatically API-compatible with all client software written to talk to that runtime, unless the blockchain intentionally makes changes to break compatibility.

[Chainlist](https://chainlist.org/) is precisely a list of the blockchains which are API-compatible with the Ethereum runtime.

### Compatibility Layers

Blockchains can still be API-compatible with a runtime *without* being built on that runtime. Some runtimes offer an _API compatibility layer_ for another runtime, allowing clients expecting that other runtime's API to interact with them through that API, despite the runtime not "thinking like" (having the domain model of) the other runtime.

Again, to use Ethereum as an example — examples of runtimes that offer an *API compatibility layer* for the Ethereum runtime's API include:

* [Avalanche](/runtimes/avalanche)
* [Substrate](/runtimes/substrate)
* [RSK](/runtimes/rsk)

### Heavy Forks

There also exist runtimes that began as forks of another runtime, but where so much of the internals have been changed that blockchains using the fork can no longer really be said to be "based on" the parent runtime. These descendant runtimes are still usually API-compatible with their upstream runtime; that API-compatibility being one of the primary reasons for using the upstream project as a starting place.

In the case of the Ethereum runtime, these "heavy" runtime forks include:

* [Fantom](/runtimes/fantom), where Fantom's [go-opera](https://github.com/Fantom-foundation/go-opera) is descended from go-ethereum
* [Matic](/runtimes/matic), where the software [bor](https://github.com/maticnetwork/bor) used in Matic sidechains is descended from go-ethereum

## Supported Blockchain Runtimes

We currently support the following blockchain runtimes.

### The [**Ethereum Runtime**](/runtimes/ethereum)

Ethereum-runtime chains we support:

* [Ethereum Mainnet](/chains/eth-mainnet)
* [Ethereum Kovan Testnet](/chains/eth-kovan)
* [Binance Smart Chain Mainnet](/chains/bsc-mainnet)
* [Binance Smart Chain Testnet](/chains/bsc-testnet)

### The [**Matic (Polygon) Runtime**](/runtimes/matic)

Matic-runtime chains we support:

* [Polygon PoS Mainnet](/chains/matic-mainnet)
* [Polygon "Mumbai" Testnet](/chains/matic-mumbai)

### The [**Fantom Runtime**](/runtimes/fantom)

Fantom-runtime chains we support:

* [Fantom Opera Mainnet](/chains/fantom-mainnet)
* [Fantom Opera Testnet](/chains/fantom-testnet)

### The [**Avalanche Runtime**](/runtimes/avalanche)

Avalanche-runtime chains we support:

* [Avalanche Mainnet](/chains/avalanche-mainnet)
* [Avalanche Fuji Testnet](/chains/avalanche-testnet)

### The [**Substrate Runtime**](/runtimes/substrate)

Substrate-runtime chains we support:

* [Moonbeam "Moonbase Alpha" Testnet](/chains/moonbeam-moonbase-alpha)
* [Moonriver Mainnet](/chains/moonriver)

### The [**Palm Runtime**](/runtimes/palm)

Palm-runtime chains we support:

* [Palm Mainnet](/chains/palm-mainnet)
* [Palm Testnet](/chains/palm-testnet)

### The [**RSK Runtime**](/runtimes/rsk)

RSK-runtime chains we support:

* [RSK Mainnet](/chains/rsk-mainnet)
* [RSK Testnet](/chains/rsk-testnet)

### The [**Arbitrum Runtime**](/runtimes/arbitrum)

Arbitrum-runtime chains we support:

* [Arbitrum Mainnet](/chains/arbitrum-mainnet)
* [Arbitrum Testnet](/chains/arbitrum-testnet)

## Upcoming Blockchain Runtimes

We are always hard at work integrating support for new blockchain runtimes into the Covalent API.

Runtime integrations planned to launch in the near future include:

* [Elrond](https://elrond.com/)
* [Near](https://near.org/)
* [StarkWare](https://starkware.co/)

See also, [our upcoming support for individual blockchains](/chains#upcoming-blockchains).
