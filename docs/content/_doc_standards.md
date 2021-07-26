---
hidden: true
---

# Covalent Docs standards

## Terminology

* **The Covalent API**: singular to reflect a single product which can be used across multiple networks and contains multiple endpoints. 

  - Uses:
    - *The Covalent API offers...*
    - *The Covalent API contains multiple endpoints*
    - *Easy-to-use, unified Covalent API...*

* A **blockchain** (or "chain" for short) is a set of connected P2P peers, with a specific `chainID` binding them to each-other, and a unique on-chain state they agree upon. The blockchain isn't the architecture or the software, but rather the *online system itself*. It's a real, concrete thing, a running process people and machines are taking part in. The noun "blockchain" should be used only to refer to such a singular online system that people can interact with, the same way you'd use the noun "server" to refer to a singular online machine that people can interact with.

* A **blockchain network** (or "network" for short) is an abstract collection of blockchains, grouping together many chains (that may or may not "exist" / have any online nodes) for the purpose of talking about some property they share — which is usually the fact that they're operated by the same organization. The network operated by the Ethereum Foundation (which everyone just calls "Ethereum"), and the "Ethereum Classic" network, are examples of blockchain networks. Each network has its own mainnet, and its own collection of testnets. (Note that this is different than the concept of a *blockchain runtime*. Both the Ethereum Foundation's network, and the Ethereum Classic network, use the *Ethereum runtime*, but they're separate *networks*.)

* **Network providers** — orgs like Binance, Polygon, etc. — usually launch and operate a single *blockchain network*, which consists of one *mainnet* chain — the "point" of the network — and several additional *testnet* chains, used to validate the design of the mainnet chain, and to serve as a development platform for any distinctive technologies used in the mainnet chain. (Network providers that have no technological distinctiveness, won't have a need to run any of their own testnet chains.)

* Blockchain networks, unless they are given a more specific name by the network provider (e.g. "Binance Smart Chain"), should be labelled with the same name as the network operator themselves. E.g. we call the network operatedd by "Avalanche", "the Avalanche network", or just "Avalanche" for short.

* To distinguish specific blockchains from blockchain networks, the specific blockchain should be referred to by the name of the network, **plus** the suffixed word "Mainnet" or "Testnet." (Networks that only consist of a single chain are de-facto "Mainnet" networks.) Avalanche's mainnet chain is "Avalanche Mainnet".

* If a testnet chain has an explicit name, "Testnet" should still be added to the end of the name (if it isn't already), to aid in skimming. For example, rather than saying "Matic Mumbai", say "Matic Mumbai Testnet".
